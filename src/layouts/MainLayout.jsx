import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navigation from "../components/shared/Navigation";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
