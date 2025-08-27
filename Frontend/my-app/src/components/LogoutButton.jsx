import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <p
      className="cursor-pointer hover:text-blue-500 font-semibold"
      onClick={handleLogout}
    >
      Logout
    </p>
  );
};

export default LogoutButton;
