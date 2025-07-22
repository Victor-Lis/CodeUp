"use client";
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
import { useSession, signOut } from "next-auth/react";
import { BookBookmarkIcon, BookIcon, ListIcon, SignOutIcon } from "@phosphor-icons/react/dist/ssr";

function Navbar() {
  const router = useRouter();
  const session = useSession();

  const isAdmin = () => {
    if (session.status === "authenticated") {
      const user = session.data?.user;
      return user?.role === "ADMIN";
    }
    return false;
  };

  return (
    <nav className="px-4 w-full fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-end">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <ListIcon
              className="text-white cursor-pointer bg-transparent p-0 m-0 border-none shadow-none hover:bg-transparent focus:outline-none"
              size={35}
            />
          </MenubarTrigger>
          <MenubarContent className="mr-4">
            <MenubarItem onClick={() => router.push("/dashboard")}>
              <BookIcon className="mb-[0.25px]" /> Desafios
            </MenubarItem>
            {isAdmin() && (
              <>
                <MenubarSeparator />
                <MenubarLabel>Admin</MenubarLabel>
                <MenubarItem
                  className="ml-3"
                  onClick={() => router.push("/challenge")}
                >
                  <BookBookmarkIcon className="mb-[0.25px]" />
                  Desafios
                </MenubarItem>
              </>
            )}
            <MenubarSeparator />
            <MenubarItem onClick={() => signOut({ callbackUrl: "/login" })}>
              <SignOutIcon />
              Sair
            </MenubarItem>
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
