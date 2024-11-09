import { Outlet } from "react-router-dom";
import { Layout } from "@/components";

const ToolsLayout: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Sidebar />

      <Outlet />

      <Layout.Sidebar />
    </Layout.Root>
  );
};

export default ToolsLayout;
