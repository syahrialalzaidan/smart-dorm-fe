import Sidebar from "@/components/Sidebar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="pl-72">
        <div className="bg-gray-100">{children}</div>
      </div>
    </>
  );
}
