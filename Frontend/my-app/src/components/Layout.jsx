// components/Layout.js
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';


const Layout = () => {
  return (
    <div className="flex">
      <div className="basis-[12%] border h-[100vh]">
        <Sidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <DashboardView />
        
        <Outlet /> {/* ← where pages like Dashboard will render */}
      </div>
    </div>
  );
};

export default Layout;
