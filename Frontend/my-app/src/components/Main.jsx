// import React from 'react';
import React, { PureComponent } from "react";
import { Flex, Progress } from 'antd';
import err from '../assets/err.png';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaChartLine,
  FaEllipsisV,
  FaFileUpload,
  FaUsers,
} from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";
import PieComponent from "./PieComponent";
import UserTable from "./UserTable";

const data = [
  {
    name: "Jan-Feb",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mar-Apr",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "May-Jun",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Jul-Aug",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Sep-Oct",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Nov-Dec",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  }
 
];

const Main = ({ used = 48.1, total = 100 }) => {
  const percentage = Math.min((used / total) * 100, 100);

  return (
    <div className="pt-[25px] px-[25px] bg-[#F8F9FC]">
      <div className="flex items-center justify-between">
        <h1 className="text-[#5a5c69] text-[28px] leading-[34px] font-normal cursor-pointer">
          Admin Dashboard
        </h1>
        <button className="bg-[#2E59D9] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[30px] cursor">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        {/* Card 1: Users */}
        <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              Registered Users
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              5
            </h1>
          </div>
          <FaUsers fontSize={28} />
        </div>

        {/* Card 2: Uploaded Files */}
        <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              Uploaded Files
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              3
            </h1>
          </div>
          <FaFileUpload fontSize={28} />
        </div>

        {/* Card 3: Charts */}
        <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              Charts Created
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              2
            </h1>
          </div>
          <FaChartLine fontSize={28} />
        </div>

        {/* Card 4: Storage */}
        <div className="h-[100px] rounded-[8px] bg-white border-l-4 border-[#4E73DF] flex flex-col justify-between py-[10px] px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69]">
                {used.toFixed(1)} GB
              </h1>
              <h2 className="text-[#6c757d] text-[13px]">of {total} GB Used</h2>
            </div>
            <MdSdStorage fontSize={28} />
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#ededed] mb-[20px]">
            <h2>Excel Overviews</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div>
            <LineChart
              width={1150}
              height={500}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        {/* <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2>Revenue Resources</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-[35px]">
            <PieComponent />
          </div>
        </div> */}
      </div>

      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className=" bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border=[#EDEDED] ">
            <h2 className="text-[#4E73DF] text-[16px] leading-[19px] font-bold ">Projects Overview</h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="px-[25px] space-y-[15px] py-[15px]">
            <div>
              <h2>Data Source Integration</h2>
              <Progress percent={30} size="small" status="active" strokeColor="#E74A3B" />
            </div>
            <div>
              <h2>Data Cleaning & Validation</h2>
              <Progress percent={50} size="small"  status="active" strokeColor="#F6C23E" />
            </div>
            <div>
              <h2>Pivot Table Reporting Setup</h2>
              <Progress percent={70} size="small" status="active" strokeColor="#4E73DF" />
            </div>
            <div>
              <h2>Dashboard Visualization Build</h2>
              <Progress percent={100} size="small" status="active" strokeColor="#36b9cc" />
            </div>
            <div>
              <h2>Account Setup</h2>
              <Progress percent={50} size="small" status="exception" strokeColor="#1CC88A" />
            </div>
            
          </div>
        </div>
        <div className="basis-[45%] border bg-white shadow-md cursor-pointer rounded-[4px]">
             <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] ">
              <h2 className="text-[#4E73DF] text-[16px] leading-[19px] font-bold ">Resources</h2>
              <FaEllipsisV color="gray" className="cursor-pointer"/>
             </div>
             <div className="pl-[35px] flex items-center justify-center h-[100%]">
              <div>
                <img src={err} className="h-[100px] 2-[100px]" alt="" />
                <p className="mt-[15px] font-semibold text-gray-500 ">No data available</p>
              </div>
             </div>
        </div>
      </div>
     
    </div>
  );
};

export default Main;
