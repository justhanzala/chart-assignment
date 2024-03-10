import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./App.css";

function App() {
  const chartRef = useRef();

  useEffect(() => {
    const data = {
      // labels: ["12", "12", "4"],
      datasets: [
        {
          data: [12, 12, 4],
          backgroundColor: [
            "rgba(81,160,218,255)",
            "rgba(75,63,87,255)",
            "rgba(41,67,80,255)",
          ],
          hoverOffset: 4,
          borderRadius: 12,
          borderWidth: 0,
          borderJoinStyle: "bevel",
        },
      ],
    };

    const valuesOutsideChart = [12, 12, 4];

    const ctx = chartRef.current.getContext("2d");

    const donutChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        cutout: "80%",
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

    const chartArea = donutChart.chartArea;
    valuesOutsideChart.forEach((value, index) => {
      const angle = donutChart.getDatasetMeta(0).data[index].angle;
      const x =
        chartArea.left +
        chartArea.width / 2 +
        (Math.cos(angle) * chartArea.width) / 2;
      const y =
        chartArea.top +
        chartArea.height / 2 +
        (Math.sin(angle) * chartArea.height) / 2;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";

      const distance = 30;
      ctx.fillText(
        value,
        x + Math.cos(angle) * distance,
        y + Math.sin(angle) * distance
      );
    });

    return () => {
      donutChart.destroy();
    };
  }, []);

  return (
    <div className="App">
      <div className="box">
        <h2 className="title">Incident Severity</h2>
        <div className="chart">
          <canvas ref={chartRef} width="100%" height="100%" />
        </div>

        <div className="color-usage">
          <p className="text" style={{ color: "rgba(81,160,218,255)" }}>
            <span
              className="color"
              style={{ backgroundColor: "rgba(81,160,218,255)" }}
            />{" "}
            Severity 0-3
          </p>
          <p className="text" style={{ color: "rgba(75,63,87,255)" }}>
            <span
              className="color"
              style={{ backgroundColor: "rgba(75,63,87,255)" }}
            />{" "}
            Severity 4
          </p>
          <p className="text" style={{ color: "rgba(41,67,80,255)" }}>
            <span
              className="color"
              style={{ backgroundColor: "rgba(41,67,80,255)" }}
            />{" "}
            Severity 5
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
