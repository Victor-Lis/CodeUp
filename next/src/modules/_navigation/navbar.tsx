"use client";
import React, { useEffect } from "react";
// import {
//   ArrowBendDownLeftIcon,
//   DotsThreeOutlineIcon,
// } from "@phosphor-icons/react";
import { MenuIcon } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenubarLabel,
} from "@/components/ui/menubar";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

function Navbar() {
  const router = useRouter();
  const session = useSession();

  const isAdmin = () => {
    if (session.status === "authenticated") {
      const user = session.data?.user;
      return user?.role === "ADMIN";
      // || user?.role === "SUPER_ADMIN";
    }
    return false;
  };

  return (
    <nav className="px-4 w-full fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-end">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <MenuIcon
              className="text-white cursor-pointer bg-transparent p-0 m-0 border-none shadow-none hover:bg-transparent focus:outline-none"
              size={35}
            />
          </MenubarTrigger>
          <MenubarContent className="mr-4">
            <MenubarItem onClick={() => router.push("/dashboard")}>
              Desafios
            </MenubarItem>
            {isAdmin() && (
              <>
                <MenubarSeparator />
                <MenubarLabel>Admin</MenubarLabel>
                <MenubarItem
                  className="ml-3"
                  onClick={() => router.push("/challenge")}
                >
                  Desafios
                </MenubarItem>
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}

export default dynamic(() => Promise.resolve(Navbar), {
  ssr: false,
  // loading: () => <span>Carregando...</span>,
});
