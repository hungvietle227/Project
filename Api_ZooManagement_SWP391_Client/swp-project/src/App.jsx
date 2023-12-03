// import "./App.css";

// import "../src/assets/css/index.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import router from "./router";
// import { RouterProvider } from "react-router-dom";

// function App() {
//   return (
//     <>
//       <RouterProvider router={router}></RouterProvider>
//     </>
//   );
// }
// export default App;

import React, { useState, useEffect } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./App.css";
import Index from "./page";
import Forget from "./page/Authen/forgotPassword/fogotPassword";
import Login from "./page/Authen/loginPage/login";
import Checkout from "./page/cart-checkout/checkout";
import Cart from "./page/cart/cart";
import StaffPage from "./page/rolePage/staffPage";
import "./assets/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import Dashboard from "./page/dashBoard";
import TableUser from "./page/TableUser";
import AddPage from "./page/User/AddPage";
import TableAnimal from "./page/Animal/TableAnimal";
import TableFood from "./page/Food/TableFood";
import SideMenu from "./page/rolePage/test";
import HeaderLayoutStaff from "./HeaderLayoutStaff";
import HeaderLayOutTrainer from "./HeaderLayOutTrainer";
import TableStaff from "./page/User/TableStaff";
import AddStaff from "./page/User/AddStaff";
import OrderTable from "./page/Order/OrderTable";
import ViewStaff from "./page/User/ViewStaff";
import TableAnimalDetail from "./page/Animal/TableAnimalDetail";
import New from "./page/New/New";
import Loading from "./page/cart-checkout/loadingPage";
import Contact from "./page/Contact/Contact";
import TableNews from "./page/News/TableNews";
import TableCage from "./page/Cage/TableCage";
import TableArea from "./page/Area/TableArea";
import TableNewsByAdmin from "./page/News/TableNewsByAdmin";
import TableFeedBack from "./page/FeedBack/TableFeedBack";
import TableScheduleFeed from "./page/FeedScheduleAnimal/TableScheduleFeed";
import TableSpecies from "./page/Species/tableSpecies";
import TableExperience from "./page/WorkExperience/TableExperience";
import TableCategory from "./page/Category/TableCategory";
import PersonalProfile from "./page/User/Profile";
import { ToastContainer, Zoom, toast } from "react-toastify";
import Detail from "./page/detailNew/detail";
import ScheduleAnimal from "./page/Animal/ScheduleAnimal";
import ScheduleAnimalNotFeeding from "./page/ScheduleAnimal/ScheduleAnimalNotFeeding";
import TableMeal from "./page/Meal/TableMeal";
import TableSchedule from "./page/schedule/TableSchedule";

const secretKey = "your_secret_key";

function App() {
  const userRole = localStorage.getItem("role");
  // console.log(userRole);
  function checkRole() {
    return localStorage.getItem("role");
  }
  function RequireStaffRole({ children }) {
    const role = checkRole();

    if (role !== "ADMIN") {
      return <Navigate to="/" />;
    }

    return <>{children}</>;
  }
  function RequireZooTrainerRole({ children }) {
    const role = checkRole();

    if (role !== "ZOOTRAINER") {
      return <Navigate to="/" />;
    }

    return <>{children}</>;
  }
  function RequireAdminRole({ children }) {
    const role = checkRole();

    if (role !== "ADMIN") {
      return <Navigate to="/" />;
    }

    return <>{children}</>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<HeaderLayout />}>
            <Route
              path=""
              element={
                <RequireStaffRole>
                  <Dashboard />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="1"
              element={
                <RequireStaffRole>
                  <TableUser />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="add"
              element={
                <RequireStaffRole>
                  <AddPage />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="2"
              element={
                <RequireStaffRole>
                  <TableAnimal />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="3"
              element={
                <RequireStaffRole>
                  {/* <OrderTable /> */}
                  <Dashboard />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="news"
              element={
                <RequireStaffRole>
                  <TableNewsByAdmin />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="cage"
              element={
                <RequireStaffRole>
                  <TableCage />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="area"
              element={
                <RequireStaffRole>
                  <TableArea />
                </RequireStaffRole>
              }
            ></Route>
            <Route
              path="feedback"
              element={
                <RequireStaffRole>
                  <TableFeedBack />
                </RequireStaffRole>
              }
            ></Route>
            {/* <Route path="3" element={<TableFood />}></Route> */}
          </Route>
          <Route path="/staff" element={<HeaderLayoutStaff />}>
            {/* <Route path="" element={<Dashboard />}></Route> */}
            <Route path="1" element={<TableStaff />}></Route>
            <Route path="add" element={<AddStaff />}></Route>
            <Route path="2" element={<TableAnimal />}></Route>
            <Route path="4" element={<OrderTable />}></Route>
            <Route path="news" element={<TableNews />}></Route>
            {/* <Route path="profile" element={<ViewStaff />}></Route> */}
            <Route path="cage" element={<TableCage />}></Route>
            <Route path="area" element={<TableArea />}></Route>
            <Route path="food" element={<TableFood />}></Route>
            <Route path="species" element={<TableSpecies />}></Route>
            <Route path="experience" element={<TableExperience />}></Route>
            <Route path="category" element={<TableCategory />}></Route>
            <Route path="profile" element={<PersonalProfile />}></Route>
            <Route path="meal" element={<TableMeal />}></Route>
            <Route path="schedule" element={<TableSchedule />}></Route>

            {/* <Route path="3" element={<TableFood />}></Route> */}
          </Route>
          <Route path="/ZooTrainer" element={<HeaderLayOutTrainer />}>
            {/* <Route path="profile" element={<ViewStaff />}></Route> */}
            <Route path="food" element={<TableFood />}></Route>
            <Route path="2" element={<TableAnimalDetail />}></Route>
            <Route path="feed" element={<TableScheduleFeed />}></Route>
            <Route path="profile" element={<PersonalProfile />}></Route>
            <Route
              path="scheduleAnimal"
              element={<ScheduleAnimalNotFeeding />}
            ></Route>
          </Route>
          <Route path="/loading" element={<Loading></Loading>} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/reset" element={<Forget />}></Route>
          <Route path="/" element={<Index />}></Route>
          <Route path="/new" element={<New />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="detail/:id" element={<Detail />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default App;
