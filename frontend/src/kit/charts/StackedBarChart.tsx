import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface StackedBarChartProps {
  data: any;
  title?: string;
}

const StackedBarChart: FC<StackedBarChartProps> = ({ data, title }) => {
  return (
    <Bar
      options={{
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }}
      data={data}
    />
  );
};

export default StackedBarChart;
