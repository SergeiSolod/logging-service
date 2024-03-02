import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CircleChartProps {
  data: any;
  title?: string;
}
const CircleChart: FC<CircleChartProps> = ({ data, title }) => {
  return (
    <Pie
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

export default CircleChart;
