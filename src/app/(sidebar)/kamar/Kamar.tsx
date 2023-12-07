"use client";
import { FaSort } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import KamarBox from "./KamarBox";
import Pagination from "@/components/pagination/Pagination";
import { usePathname, useRouter } from "next/navigation";

interface Kamar {
  id: number;
  nomor_kamar: number;
  fasilitas: string;
  status: string;
  Created_at: string;
  Updated_at: string;
}

interface KamarProps {
  data: Kamar[];
  page: number;
  totalPage: number;
}

export default function Kamar({ kamar }: { kamar: KamarProps }) {
  const router = useRouter();
  const pathname = usePathname();
  let currentPage: number = 1;
  if (pathname === "/kamar") {
  } else {
    currentPage = +pathname.substring(pathname.length - 1);
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Kamar</h1>

        <div className="flex gap-2">
          <button className="bg-purple-100 text-purple-700 flex gap-4 items-center justify-center rounded-lg px-4 py-2">
            <p>Sort</p>
            <FaSort />
          </button>

          <div className="flex items-center gap-4 border border-gray-400 w-64 p-3 rounded-lg">
            <AiOutlineSearch className="text-gray-400 text-2xl relative" />
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none bg-transparent focus:border-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 my-8">
        {kamar.data.map((kamar) => (
          <KamarBox
            key={kamar.id}
            nama={`Kamar ${kamar.nomor_kamar}`}
            fasilitas={kamar.fasilitas}
            available={kamar.status.toLowerCase() === "available"}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={10}
        totalDataCount={10 * kamar.totalPage}
        onPageChange={(page) => {
          router.push(`/kamar/${page}`);
        }}
      />
    </div>
  );
}
