import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const user = users.find(
      (u) => u.name.toLowerCase().trim() === searchTerm.toLowerCase().trim()
    );

    if (user) {
      const slug = user.name.toLowerCase().replace(/\s+/g, "-");
      // Redirect and pass user data via state
      navigate(`/user/${slug}`, { state: { user } });
    } else {
      alert("User not found.");
    }
  };

  return (
    <div className="flex items-center rounded-[5px]">
      <input
        type="text"
        placeholder="Search for..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px]"
      />
      <div
        onClick={handleSearch}
        className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]"
      >
        <FaSearch color="white" />
      </div>
    </div>
  );
}
