import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import colorConfigs from '../../../../configs/colorConfigs';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'সর্বমোট রিপোর্ট সংখ্যা',
    },
  },
};


type Props={
  labels:string[],
  dataset:string;
  data:number[]
}
export function ChartJs({labels,dataset,data}:Props) {

  const dataArr = {
    labels,
    datasets: [
      {
        label: dataset,
        data: data,
        backgroundColor: colorConfigs.sidebar.bg,
      },

    ],
  };
  return <Bar options={options} data={dataArr} />;
}
