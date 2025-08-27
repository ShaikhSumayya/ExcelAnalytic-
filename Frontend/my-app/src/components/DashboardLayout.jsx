import { Outlet, NavLink } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaUser,
  FaChartBar,
  FaRobot,
  FaSignOutAlt,
  FaHome,
  FaRegUser,
} from "react-icons/fa";
import profile from "../assets/users.png";
 const role = localStorage.getItem("role");

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-blue-600 ${
        isActive ? "bg-blue-700" : ""
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-violet-600 text-white p-5 space-y-4">
        <NavLink
          to="/dashboard"
          className="text-xl font-bold hover:underline hover:text-blue-200 block"
        >
          My Dashboard
        </NavLink>
        <SidebarItem icon={<FaHome />} label="Home" to="/" />
        <SidebarItem
          icon={<FaCloudUploadAlt />}
          label="Upload"
          to="/dashboard/dashboardupload"
        />
        <SidebarItem
          icon={<FaRobot />}
          label="AI Insights"
          to="/dashboard/ai"
        />
        {/* <SidebarItem icon={<FaUser />} label="Users" to="/dashboard/table" /> */}
        <SidebarItem
          icon={<FaChartBar />}
          label="Charts"
          to="/dashboard/charts"
        />
        {role && role.toLowerCase() === "admin" && (
        <SidebarItem icon={<FaRegUser />} label="Admin" to="/admindashboard" />
        )}
        {/* <SidebarItem icon={<FaSignOutAlt />} label="Logout" to="/dashboard/logout" /> */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            // Or clear cookies/session depending on your auth
             localStorage.removeItem("role");
            window.location.href = "/login"; // or use useNavigate if inside a component
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-md text-white hover:bg-blue-600 w-full text-left"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
  Welcome, {localStorage.getItem("role") === "admin" 
    ? "Admin" 
    : localStorage.getItem("username") || "User"}
</h2>


          <div className="flex items-center gap-2">
            <img
              src={profile} // Replace with actual path or a dynamic variable
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <span className="text-gray-700"> {role === "admin" ? "Admin" : "User"} </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
