import React from "react";
import {
  FaTachometerAlt,
  FaChevronRight,
  FaRegSun,
  FaRegChartBar,
  FaChevronLeft,
  FaBolt,
  FaSignOutAlt,
  FaUpload,
  FaRegUser,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#4E73DF] h-screen px-[25px]">
      <div className="px-[15px] py-[30px] flex items-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
          Admin Panel
        </h1>
      </div>

      <Link to="/dashboard">
        <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
          <FaTachometerAlt color="white" />
          <p className="text-[14px] leading-[20px] font-bold text-white">
            Dashboard
          </p>
        </div>
      </Link>

      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">
          INTERFACE
        </p>

        <Link to="/upload">
          <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
            <div className="flex items-center gap-[10px]">
              <FaUpload color="white" />
              <p className="text-[14px] leading-[20px] font-normal text-white">
                Upload
              </p>
            </div>
            {/* <FaUpload color="white" /> */}
          </div>
        </Link>

        <Link to="/admindashboard/table" className="no-underline">
          <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-white/10 transition-all duration-150 rounded px-2">
            <div className="flex items-center gap-[10px]">
              <FaUser color="white" />
              <p className="text-[14px] leading-[20px] font-normal text-white">
                Manage Users
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Logout Section */}
      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">
          ACCOUNT
        </p>

        <div
          onClick={() => {
            localStorage.removeItem("token"); // or sessionStorage.clear() if needed
            window.location.href = "/login"; // or use useNavigate if inside a component
          }}
          className="flex items-center gap-[10px] py-[15px] cursor-pointer hover:bg-white/10 transition-all duration-150 px-2 rounded"
        >
          <FaSignOutAlt color="white" />
          <p className="text-[14px] leading-[20px] font-normal text-white">
            Logout
          </p>
        </div>
      </div>

      {/* Collapse button */}
      <div className="flex items-center justify-center pt-[15px]">
        <div className="h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer">
          <FaChevronLeft color="white" />
        </div>
      </div>

      {/* Upgrade section */}
      <div className="bg-[#395CBF] mt-[15px] flex items-center justify-center flex-col py-[15px] px-[10px] gap-[15px] rounded-[3px]">
        <FaBolt color="white" />
        <p className="text-[12px] leading-[18px] font-normal text-white/[0.4] text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe?
        </p>
        <button className="bg-[#17A673] text-white flex items-center justify-center h-[30px] w-full rounded-[3px] text-[14px] leading-[21px] font-normal">
          Upgrade to Pro!
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
