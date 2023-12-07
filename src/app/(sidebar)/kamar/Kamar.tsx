"use client";
import { FaSort } from "react-icons/fa";
import { useState } from "react";
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

export default function Kamar({ kamar, currentPage  }: { kamar: KamarProps, currentPage: number }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">Kamar</h1>

        <div className="flex gap-2">
          <div className="flex items-center gap-4 border border-gray-400 w-64 p-3 rounded-lg">
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/kamar?search=${search}`)}
            >
              <AiOutlineSearch className="text-gray-400 text-2xl relative" />
            </div>
            <input
              type="number"
              placeholder="Enter Room Number"
              className="focus:outline-none bg-transparent focus:border-none"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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

        {kamar.data.length === 0 && (<div className="text-center w-full">No Data Found</div>)}

      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={10}
        totalDataCount={10 * kamar.totalPage}
        onPageChange={(page) => {
          router.push(`/kamar?page=${page}`);
        }}
      />
    </div>
  );
}
