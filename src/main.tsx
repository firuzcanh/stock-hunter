import { createRoot } from "react-dom/client";
import { Routes } from "@generouted/react-router/lazy";

import "@radix-ui/themes/styles.css";
import "@/assets/css/global.css";

createRoot(document.getElementById("root")!).render(<Routes />);
