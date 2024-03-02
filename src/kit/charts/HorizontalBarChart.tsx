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

interface HorizontalBarChartProps {
  data: any;
  title?: string;
}

const HorizontalBarChart: FC<HorizontalBarChartProps> = ({ data, title }) => {
  return (
    <Bar
      options={{
        indexAxis: "y" as const,
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right" as const,
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={data}
    />
  );
};

export default HorizontalBarChart;
