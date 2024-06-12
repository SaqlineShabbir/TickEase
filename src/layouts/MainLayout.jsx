import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      {/* <Navigation /> */}
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
