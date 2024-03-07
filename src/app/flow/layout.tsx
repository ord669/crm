import { Navbar } from "@/app/_components/navbar";
import { Sidebar } from "@/app/_components/sidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="contacts-layout  ">
      <Navbar isPro={false} />
      <main className="main h-[calc(100%-64px)] w-full ">{children}</main>
    </div>
  );
};

export default RootLayout;
