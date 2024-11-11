import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/store";

import AppNavbar from "@/widgets/AppNavbar/AppNavbar";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppNavbar />

        <Outlet />

        <Toaster />
      </PersistGate>
    </Provider>
  );
};

export default App;
