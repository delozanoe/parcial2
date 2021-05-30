import React, { useEffect, useRef } from "react";
import * as d3 from "d3";



export const PieChart = (props) => {
  const pieChart = useRef();
  const rooms = props["props"];
  let data = rooms.map((room) => {
    return { "item":room.name ,"count": room["powerUsage"].value,"unit": room["powerUsage"].unit};
  });
  console.log(data)

  useEffect(() => {
    // Get positions for each data object
    const piedata = d3.pie().value((d) => d.count)(data);
    // Define arcs for graphing
    const arc = d3.arc().innerRadius(0).outerRadius(200);

    const colors = d3.scaleOrdinal([
      "#ffa822",
      "#134e6f",
      "#ff6150",
      "#1ac0c6",
      "#dee0e6",
    ]);

    // Add tooltip
    const tooldiv = d3
      .select("#tooldiv")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("text-anchor", "middle")
      .style("font-size", "24px");

    // Define the size and position of svg
    const svg = d3
      .select(pieChart.current)
      .attr("width", 600)
      .attr("height", 600)
      // .style('background-color','yellow')
      .append("g")
      .attr("transform", "translate(300,300)");

    // Draw pie
    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      .on("mouseover", (e, d) => {
        tooldiv
          .style("visibility", "visible")
          .text(`${d.data.item}: `+`${d.data.count}`+ ` ${d.data.unit}` );
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });
  });

  return (
    <div id="chartArea">
      <div id="tooldiv"></div>
      <svg ref={pieChart}></svg>
    </div>
  );
};
