import UserTable from "../components/UserTable";
import ExportPDFButton from '../components/ExportPDFButton';
import { FaEllipsisV } from "react-icons/fa";
import PieComponent from "../components/PieComponent"; 
import axios from "axios";
import { useEffect, useState } from "react";


export default function DashboardHome() {
  const [users, setUsers] = useState([]);
   useEffect(() => {
    axios
      .get("http://localhost:5000/api/users") // fetch user list
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* <Card title="Total Users" value="5" color="bg-green-500" /> */}
        <Card title="Total Users" value={users.length} color="bg-green-500" />
        <Card title="Files Uploaded" value="3" color="bg-blue-500" />
        <Card title="AI Insights" value="2" color="bg-purple-500" />
      </div>

      {/* Revenue Resources (Pie Chart Section) */}
      <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px] mb-10">
        <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
          <h2>Monthly Data</h2>
          <FaEllipsisV color="gray" className="cursor-pointer" />
        </div>
        <div className="pl-[35px]">
          <PieComponent />
        </div>
      </div>

      {/* User Table */}
      {/* <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Register Users</h2>
        <UserTable />
      </div> */}
    </>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-5 rounded-xl text-white shadow-md ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
