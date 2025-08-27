import React, { useEffect, useState } from "react";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import profile from "../assets/profile.png";
import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";

const DashboardView = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const showDropdown = () => setOpen(!open);

 
const navigate = useNavigate();

const [searchTerm, setSearchTerm] = useState("");
const [users, setUsers] = useState([]);


  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const handleSearch = () => {
  const user = users.find(
    (u) => u.name.toLowerCase().trim() === searchTerm.toLowerCase().trim()
  );

  if (user) {
    const slug = user.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/user/${slug}`, { state: { user } });
  } else {
    alert("User not found.");
  }
};

useEffect(() => {
  const fetchUsers = async () => {
    const res = await fetch("/api/users"); // adjust the endpoint if needed
    const data = await res.json();
    setUsers(data);
  };
  fetchUsers();
}, []);

  

  return (
    <>
      <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px]">
       <div className="flex items-center rounded-[5px]">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search for..."
    className="bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px]"
  />
  <div
    onClick={handleSearch}
    className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]"
  >
    <FaSearch color="white" />
  </div>
</div>


        <div className="flex items-center gap-[15px] relative">
          <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
            <FaRegBell />
            <FaEnvelope />
          </div>

          <div className="flex items-center gap-[15px] relative" onClick={showDropdown}>
            <p>{localStorage.getItem("username")}</p>
            <div className="h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center">
              <img src={profile} alt="profile" className="h-full w-full rounded-full object-cover" />
            </div>

            {open && (
              <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] rounded-md shadow-md">
                <p className="cursor-pointer hover:text-blue-500 font-semibold">Profile</p>
                <Link to="/dashboard"><p className="cursor-pointer hover:text-blue-500 font-semibold">Dashboard</p></Link>
                <p
                  onClick={() => setShowLogoutModal(true)}
                  className="cursor-pointer hover:text-blue-500 font-semibold"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[350px]">
            <h2 className="text-lg font-bold mb-4 text-center">Confirm Logout</h2>
            <p className="text-center mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardView;
