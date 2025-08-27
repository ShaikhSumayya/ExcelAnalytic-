import { useLocation } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaUserTag } from "react-icons/fa";

export default function UserDetail() {
  const { state } = useLocation();
  const user = state?.user;

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-red-500 font-semibold">
          User data not available.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center">
          <FaUserCircle size={64} className="text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm mt-1">User Details</p>
        </div>

        <div className="mt-6 space-y-4 text-left">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-blue-400" />
            <span className="font-medium">Email:</span>
            <span className="ml-auto">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaUserTag className="text-blue-400" />
            <span className="font-medium">Role:</span>
            <span className="ml-auto capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
