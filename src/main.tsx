import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router/lazy";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "@/assets/css/global.css";

createRoot(document.getElementById("root")!).render(
  <Theme accentColor="blue" className="flex">
    <Routes />
  </Theme>
);
