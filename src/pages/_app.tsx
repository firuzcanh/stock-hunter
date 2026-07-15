import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/store";

import AppNavbar from "@/widgets/AppNavbar/AppNavbar";
import AppTheme from "@/widgets/AppTheme/AppTheme";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppTheme>
          <AppNavbar />

          <Outlet />

          <Toaster />
        </AppTheme>
      </PersistGate>
    </Provider>
  );
};

export default App;
