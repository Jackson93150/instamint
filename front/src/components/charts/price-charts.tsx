import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  price: number;
}

interface Props {
  data: ChartData[];
}

export const PriceCharts = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid className="opacity-20" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#009F42" fill="#16502d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
