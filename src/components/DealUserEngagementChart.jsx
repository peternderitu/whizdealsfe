import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// const data = [{ name: 'Page A', uv: 100, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 400, pv: 2400, amt: 2400 }];

const DealUserEngagementChart = ({data}) => {
  return (
    <div>
      <LineChart width={600} height={300} data={data}>
        <Line type='monotone' dataKey='userId' stroke='#8884d8' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='deal_id' />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default DealUserEngagementChart;
