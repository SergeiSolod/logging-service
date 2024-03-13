import { FC } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface MultitypeBarChartProps {
  data: any;
  title?: string;
}

const MultitypeBarChart: FC<MultitypeBarChartProps> = ({ data, title }) => {
  return (
    <Chart
      type="bar"
      data={data}
      options={{
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
      }}
    />
  );
};

export default MultitypeBarChart;
