import { useLocation } from "react-router-dom";
import { Link } from "@/router";

import { twMerge } from "tailwind-merge";

import { TabNav } from "@radix-ui/themes";

import { APP_NAVS } from "@/constants/data";

const linkClass = twMerge(
  "vertical-writing-lr orientation-mixed rotate-180 !h-auto px-1.5 py-2",
  "before:w-0.5 before:h-full",
  "[&>span]:px-1 [&>span]:py-2"
);

const AppNavbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 flex flex-col justify-between h-screen border-r border-border bg-zinc-100">
      <TabNav.Root className="flex-col shadow-none">
        {APP_NAVS.map((navItem) => {
          return (
            <TabNav.Link
              key={navItem.value}
              asChild
              className={linkClass}
              active={pathname.includes(navItem.value)}
            >
              <Link to={navItem.value as any}>{navItem.label}</Link>
            </TabNav.Link>
          );
        })}
      </TabNav.Root>

      <TabNav.Root className="flex-col shadow-none">
        <TabNav.Link
          asChild
          className={linkClass}
          active={pathname === "/guide"}
        >
          <Link to="/guide">Guide</Link>
        </TabNav.Link>
      </TabNav.Root>
    </div>
  );
};

export default AppNavbar;
