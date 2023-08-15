import React from 'react';
import { Line } from "react-chartjs-2"; // Import Bar component
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface TutorGraphProps {
  chartData:{
    _id: string;
    total: string;
  }[]
}

const TutorGraph:React.FC<TutorGraphProps> = ({chartData}) => {
   const lineData = {
    labels: [...chartData.map((obj) => obj._id)],
    datasets: [
      {
        label: "Revenue",
        data: [...chartData.map((obj) => obj.total)],
        borderColor: "#9C4DF4",
        borderWidth: 2,
        pointBackgroundColor: "#9C4DF4",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHitRadius: 10,
        pointHoverBorderColor: "#fff",
        pointHoverBackgroundColor: "#9C4DF4",
        pointHoverBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };
  return (
    <div className="flex w-full h-full bg-white">
      <div className="col-span-2 w-full h-full p-5 hidden lg:flex">
        <Line style={{ width: "100%" }} data={lineData} options={options} />
      </div>
      <div className=" w-full h-full p-5 flex lg:hidden">
        <Line style={{ width: "80%" }} data={lineData} options={options} />
      </div>
    </div>
  );
}

export default TutorGraph