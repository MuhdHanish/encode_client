import React from 'react';
import { Bar } from "react-chartjs-2"; // Import Bar component
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement);

interface TutorGraphProps {
  chartData:{
    _id: string;
    total: string;
  }[]
}

const TutorGraph:React.FC<TutorGraphProps> = ({chartData}) => {
  const barData = {
  labels: [...chartData.map((obj) => obj._id)],
  datasets: [
    {
      label: "Revenue",
      data: [...chartData.map((obj) => obj.total)],
      backgroundColor: "#9C4DF4",
      borderColor: "#9C4DF4",
      borderWidth: 0,
      barPercentage: 0.3,
      categoryPercentage: 0.8,
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
        <Bar style={{ width: "100%" }} data={barData} options={options} />
      </div>
      <div className=" w-full h-full p-5 flex lg:hidden">
        <Bar style={{ width: "80%" }} data={barData} options={options} />
      </div>
    </div>
  );
}

export default TutorGraph