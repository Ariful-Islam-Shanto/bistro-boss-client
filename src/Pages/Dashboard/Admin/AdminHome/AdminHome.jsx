import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaBowlFood, FaProductHunt, FaTruck, FaUsers, FaWallet } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

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
  const { data: barChartData = [], loading: orderStatsLoading } = useQuery({
    queryKey: ["orderStats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/order-stats");
      return data;
    },
  });



  
  //? Shapes for the chart
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

  return (
    <div className="my-12 px-12 w-full space-y-6">

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

   
      <div className="flex">
        {/* Bar Chart */}
      <div className="flex-1">
      <BarChart
      width={500}
      height={300}
      data={barChartData}
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
        {barChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
      </div>
       {/* Pie Chart */}
       <div className="flex-1">

       </div>
      </div>
    </div>
  );
};

export default AdminHome;
