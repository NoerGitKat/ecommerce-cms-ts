"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FC } from "react";
import { getRoutes } from "./data";
import StoreSwitcher from "../store-switcher";
import { Store } from "@prisma/client";

interface NavbarProps {
  stores: Store[];
}

const Navbar: FC<NavbarProps> = ({ stores }): JSX.Element => {
  const pathname = usePathname();
  const params = useParams();

  const routes = getRoutes(params as { storeId: string }, pathname);

  return (
    <nav className="border-b flex h-16 items-center px-4">
      <StoreSwitcher stores={stores} />
      <aside className="flex items-center space-x-4 lg:space-x-6 mx-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            }`}
          >
            {route.label}
          </Link>
        ))}
      </aside>
      <aside className="ml-auto flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
      </aside>
    </nav>
  );
};

export default Navbar;
