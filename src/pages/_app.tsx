import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import AppNavbar from "@/widgets/AppNavbar/AppNavbar";

const App: React.FC = () => {
  return (
    <Fragment>
      <AppNavbar />
      <Outlet />
    </Fragment>
  );
};

export default App;
