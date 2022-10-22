import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { API_KEY } from "../helpers/variables";
import styles from "../Styles/Charts.module.scss";
const Charts = () => {
	const svgRef = useRef();
	const svgRefVC = useRef();
	const [data, setData] = useState();

	const fetchingList = async () => {
		await fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
		)
			.then((res) => res.json())
			.then((res) => {
				setData(res.results.slice(0, 10));
			});
	};

	useEffect(() => {
		!data && fetchingList();

		var margin = { top: 10, right: 30, bottom: 130, left: 40 },
			width = 450 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		data && displayChart(svgRef, width, height, margin, data);
		data && displayChart(svgRefVC, width, height, margin, data, true);
	}, [data]);

	return (
		<section className={styles.chartsContainer}>
			<div id="barChart">
				<svg ref={svgRef}></svg>
			</div>
			<div className={styles.chartsContainer__voteCount}>
				<svg ref={svgRefVC}></svg>
			</div>
		</section>
	);
};

export default Charts;

const displayChart = (svgRef, width, height, margin, data, isVC) => {
	const svg = d3
		.select(svgRef.current)
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const xScale = d3
		.scaleBand()
		.range([0, width])
		.domain(
			data.map(function (d) {
				return d.title;
			})
		)
		.padding(0.6);

	svg
		.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale))
		.attr("id", "x-axis")
		.selectAll("text")
		.attr("transform", "translate(-10,0)rotate(-45)")
		.style("text-anchor", "end");

	const voteCount = data.map((d) => {
		return d.vote_count;
	});

	let yScale;

	let yLabel = isVC ? "Vote Count" : "Rating Average";
	svg
		.append("text")
		.attr("class", "y label")
		.attr("text-anchor", "end")
		.attr("x", width)
		.attr("dy", ".75em")
		.attr("stroke", "white")
		.attr("font-size", "14px")
		.text("Top Rated movies");

	svg
		.append("text")
		.attr("text-anchor", "end")
		.attr("y", width + 20)
		.attr("x", -80)
		.attr("stroke", "white")
		.attr("transform", "rotate(-90)")
		.attr("font-size", "14px")
		.text(`${yLabel}`);

	if (isVC) {
		yScale = d3
			.scaleLinear()
			.domain([0, d3.max(voteCount)])
			.range([height, 0]);
	} else {
		yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);
	}

	svg.append("g").call(d3.axisLeft(yScale)).attr("id", "y-axis");

	svg
		.selectAll("mybar")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function (d) {
			return xScale(d.title);
		})
		.attr("width", xScale.bandwidth())
		.attr("fill", "#69b3a2")
		.attr("height", function (d) {
			return height - yScale(0);
		})
		.attr("y", function (d) {
			return yScale(0);
		});
	svg
		.selectAll("rect")
		.transition()
		.duration(800)
		.attr("y", function (d) {
			if (isVC) {
				return yScale(d.vote_count);
			} else {
				return yScale(d.vote_average);
			}
		})
		.attr("height", function (d) {
			if (isVC) {
				return height - yScale(d.vote_count);
			} else {
				return height - yScale(d.vote_average);
			}
		})
		.delay(function (d, i) {
			return i * 100;
		});

	const tooldiv = d3
		.select("#barChart")
		.append("div")
		.style("font-size", "12px")
		.style("visibility", "hidden");

	svg
		.selectAll("rect")
		.on("mouseenter", function () {
			tooldiv.style("visibility", "visible");

			d3.select(this)
				.transition()
				.duration(300)
				.attr("opacity", 0.6)
				.attr("x", (d) => xScale(d.title) - 5)
				.attr("width", xScale.bandwidth() + 10);
		})
		.on("mousemove", (e, d) => {
			tooldiv
				.style("visibility", "visible")
				.style("position", "absolute")
				.style("background", "white")
				.style("z-index", "5")
				.style(
					"box-shadow",
					" 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
				)
				.style("padding", "6px")
				.style("border-radius", "4px")
				.text(d.title)
				.append("div")
				.text("Rating: " + d.vote_average)
				.append("div")
				.text("Total Votes: " + d.vote_count);
			tooldiv.style("left", e.pageX + "px").style("top", e.pageY - 80 + "px");
		})
		.on("mouseleave", function (e, d) {
			d3.select(this)
				.transition()
				.duration(300)
				.attr("opacity", 1)
				.attr("x", (d) => xScale(d.title))
				.attr("width", xScale.bandwidth());
			tooldiv.style("visibility", "hidden");
		});
};
