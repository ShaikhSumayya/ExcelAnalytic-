// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ProtectedRoute from './components/ProtectedRoute';
// // import Sidebar from './components/Sidebar';
// import DashboardView from './components/DashboardView';
// import Layout from './components/Layout';
// import Main from './components/Main';
// import Home from './components/Home';
// import Upload from './components/Upload';
// import Dashboard from './components/Dashboard';
// import UserTable from './components/UserTable';
// import ChartsPage from './components/ChartsPage';
// import DashboardHome from './pages/DashboardHome';
// import DashboardLayout from './components/DashboardLayout';

// function App() {
//   return (
//     <>
//     {/* <div className='flex'>
//       <div className='basis-[12%] border h-[100vh]'>
//          <Sidebar/>
//       </div>
//       <div className='basis-[88%] border'>
//        <DashboardView/>
//       </div>

//     </div> */}
    
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} /> 
//         <Route path='/' element={<Home/>}/>
//         <Route path="/upload" element={<Upload />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//          <Route path="/table" element={<UserTable />} />
//           {/* <Route path="/charts" element={<ChartsPage />} /> */}

//           <Route path="/dashboardlayout" element={<DashboardLayout />}>
//           <Route index element={<DashboardHome />} />
//           <Route path="/upload" element={<Upload />} />
//           {/* <Route path="/ai" element={<AiInsightsPage />} /> */}
//           <Route path="/table" element={<UserTable />} />
//           <Route path="/charts" element={<ChartsPage />} />
//         </Route>
        
        
        
//       {/* Protected layout */}
//       <Route path="/admindashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
//         <Route path="main" element={<Main/>} />
//          <Route index element={<Main />} />
         
//         {/* Add other child routes here */}
//       </Route>
       
//       </Routes>

      
//     </>
//   );
// }

// export default App;





import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './components/Home';
import Upload from './components/Upload';
import Dashboard from './components/Dashboard';
import UserTable from './components/UserTable';
import ChartsPage from './components/ChartsPage';

import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './components/DashboardLayout';
import Layout from './components/Layout';
import Main from './components/Main';
import AIInsights from './components/AIInsights';
import DashboardUpload from './pages/DashboardUpload';
import UserSearchBar from './components/UserSearch';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />  

       <Route path="/" element={<UserSearchBar />} />
       <Route path="/user/:slug" element={<UserDetail />} />
      

      {/* Dashboard Layout (Sidebar, Header, etc.) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />         {/* /dashboard */}
        <Route path="upload" element={<Upload />} />         {/* /dashboard/upload */}
        <Route path="table" element={<UserTable />} />       {/* /dashboard/table */}
        <Route path="charts" element={<ChartsPage />} />     {/* /dashboard/charts */}
        <Route path="ai" element={<AIInsights />} /> 
        <Route path="dashboardupload" element={<DashboardUpload />} />  
        {/* You can add /dashboard/ai or other tabs here */}
      </Route>

      {/* Protected Admin Dashboard (if needed) */}
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="table" element={<UserTable />} />   
        <Route index element={<Main />} />
        <Route path="main" element={<Main />} />
        {/* Add protected child routes here */}
        
      </Route>

      {/* Optional: Fallback Route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;









