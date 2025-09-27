"use client";
import React from "react";
import { TEChart } from "tw-elements-react";

export default function ChartLine({ options }) {
  return (
        <TEChart
        type="line"
        data={options}
        options={{
            plugins: {
            legend: {
                position: "top",
                labels: {
                color: "#992846",
                },
            },
            },
            scales: {
            x: {
                ticks: {
                color: "grey",
                },
            },
            y: {
                ticks: {
                color: "grey",
                },
            },
            },
        }}
        />
  );
}