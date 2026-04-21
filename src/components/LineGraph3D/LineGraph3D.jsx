import Plot from "react-plotly.js";
import { getPointColor } from "../../auxiliary/getPointColor";
import { buildHoverText3D } from "../../auxiliary/buildHoverText3D";

const LineGraph3D = ({ groupedData }) => {
  if (!groupedData || Object.keys(groupedData).length === 0) {
    return <p>No data available to display.</p>;
  }
  const traces = Object.keys(groupedData).map((trackNum) => {
    const trackData = groupedData[trackNum];

    return {
      x: trackData.map((row) => parseFloat(row.X)),
      y: trackData.map((row) => parseFloat(row.Y)),
      z: trackData.map((row) => parseFloat(row.Z)),
      mode: "lines+markers",
      type: "scatter3d",
      name: `Track ${trackNum}`,
      line: {
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        width: 2,
      },
      marker: {
        size: 5,
        color: trackData.map((row) => getPointColor(row)),
      },
      text: trackData.map((row) => buildHoverText3D(row, trackNum)),
      hoverinfo: "text",
    };
  });

  return (
    <Plot
      data={traces}
      layout={{
        scene: {
          xaxis: { title: "X (km)" },
          yaxis: { title: "Y (km)" },
          zaxis: { title: "Z (km)" },
        },
        autosize: true,
      }}
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export default LineGraph3D;
