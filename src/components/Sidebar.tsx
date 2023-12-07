"use client";
import { MdLogout } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { MdGroups2 } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";

export default function Sidebar() {
  const pathname = usePathname();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed mt-10 lg:mt-0 top-0 left-0 z-40 w-72 h-screen transition-transform sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full py-14 flex flex-col justify-between pl-[5%] overflow-y-auto">
        <div>
          <a className="flex justify-center items-center gap-4 font-light text-3xl mb-16">
            Smart Dorm
          </a>

          <ul className="flex flex-col gap-2">
            <a
              className={`flex cursor-pointer gap-6  ${
                pathname.substring(0, 6) == "/kamar"
                  ? "bg-[#FAF5FF] text-[#6D28D9]"
                  : "bg-white text-gray-700"
              } px-2 rounded-l-lg py-3 hover:bg-[#FAF5FF] hover:text-[#6D28D9]`}
              href="/kamar"
            >
              <BiSolidCategory className="text-2xl" />
              <p>Kamar</p>
            </a>

            <a
              className={`flex cursor-pointer gap-6 ${
                pathname.substring(0, 9) == "/penghuni"
                  ? "bg-[#FAF5FF] text-[#6D28D9]"
                  : "bg-white text-gray-700"
              } px-2 rounded-l-lg py-3 hover:bg-[#FAF5FF] hover:text-[#6D28D9]`}
              href="/penghuni"
            >
              <MdGroups2 className="text-2xl" />
              <p>Penghuni</p>
            </a>

            <a
              className={`flex cursor-pointer gap-6 ${
                pathname.substring(0, 8) == "/seleksi"
                  ? "bg-[#FAF5FF] text-[#6D28D9]"
                  : "bg-white text-gray-700"
              } px-2 rounded-l-lg py-3 hover:bg-[#FAF5FF] hover:text-[#6D28D9]`}
              href="/seleksi"
            >
              <IoIosPersonAdd className="text-2xl" />
              <p>Seleksi Penghuni</p>
            </a>
          </ul>
        </div>
        <a
          href="/"
          className={`px-8 flex items-center gap-3 mt-16 p-4 text-[#4C4E64]/[0.87] rounded-lg group hover:bg-red-500 hover:text-white`}
          onClick={handleLogout}
        >
          <MdLogout className="text-2xl" />
          <span className="whitespace-nowrap font-bold">Logout</span>
        </a>
      </div>
    </aside>
  );
}
