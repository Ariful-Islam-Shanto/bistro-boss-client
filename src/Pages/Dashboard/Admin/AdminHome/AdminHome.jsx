import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaBowlFood, FaProductHunt, FaTruck, FaUsers, FaWallet } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid ,  PieChart, Pie, Sector, ResponsiveContainer, Legend} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();



  //? get the admin stats
  const { data: stats = [], loading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  //? get the order stats
  const { data: chartData = [], loading: orderStatsLoading } = useQuery({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/order-stats");
      return data;
    },
  });


  const pieChartData = chartData?.map(data => {
    return { name : data?.category, value : data.quantity}
})


  
  //? Shapes for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };


  //? shape for the pie chart
  const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};




  return (
    <div className="my-12 px-12 w-full space-y-12">

        <h1 className="text-4xl text-black font-bold"><span className="text-2xl font-medium">Welcome Back</span> {user?.displayName}</h1>
      <div className="stats flex items-center justify-center gap-4 w-full ">
        <div className="stat place-items-center bg-blue-500/70 text-white flex items-center justify-center rounded-lg">
         
            <FaWallet className="text-4xl "></FaWallet>
            <div>
            <div className="stat-value">{stats.revenue}</div>
            <div className="stat-title text-white "> Revenue</div>
          </div>
        </div>
        <div className="stat place-items-center bg-yellow-500/70 text-white flex items-center justify-center rounded-lg">
         
            <FaUsers className="text-4xl "></FaUsers>
            <div>
            <div className="stat-value">{stats.revenue}</div>
            <div className="stat-title text-white "> Revenue</div>
          </div>
        </div>
        {/* Products */}
        <div className="stat place-items-center bg-purple-500/70 text-white flex items-center justify-center rounded-lg">
         
            <FaBowlFood className="text-4xl "></FaBowlFood>
            <div>
            <div className="stat-value">{stats.menus}</div>
            <div className="stat-title text-white "> Products</div>
          </div>
        </div>
        {/* orders */}
        <div className="stat place-items-center bg-sky-500/70 text-white flex items-center justify-center rounded-lg">
         
            <FaTruck className="text-4xl "></FaTruck>
            <div>
            <div className="stat-value">{stats.orders}</div>
            <div className="stat-title text-white"> Orders</div>
          </div>
        </div>
      </div>

   
      <div className="flex items-center justify-between gap-10">
        {/* Bar Chart */}
      <div className="flex-1">
      <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
      </div>
       {/* Pie Chart */}
       <div className="flex-1">
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
        {/* Name of the filed in pie chart */}
        <Legend></Legend>
        </PieChart>
       </div>
      </div>
    </div>
  );
};

export default AdminHome;
