"use client";
import Pagination from "@/components/pagination/Pagination";
import { usePathname } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { CiEdit } from "react-icons/ci";
import { Penghuni, PenghuniList, PenghuniPageProps } from "@/types/penghuni";
import { useState } from "react";

interface PenghuniProps {
  datapenghuni: PenghuniPageProps;
}

export default function Penghuni({ datapenghuni }: PenghuniProps) {
  const pathname = usePathname();
  let currentPage: number = 1;
  const [search, setSearch] = useState("");
  if (pathname === "/penghuni") {
  } else {
    currentPage = +pathname.substring(pathname.length - 1);
  }
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Penghuni</h1>
        <div className="flex items-center gap-4 border border-gray-400 w-64 p-3 rounded-lg">
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/penghuni?search=${search}`)}
          >
            <AiOutlineSearch className="text-gray-400 text-2xl relative" />
          </div>
          <input
            type="text"
            placeholder="Search by Name"
            className="focus:outline-none bg-transparent focus:border-none"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <table className="w-full my-12">
        <thead className="rounded-t-xl">
          <tr className="text-left border border-gray-300">
            <th className="pl-8 p-4">No. Kamar</th>
            <th className="p-4">Nama</th>
            <th className="p-4">Gender</th>
            <th className="p-4">No HP</th>
            <th className="p-4">Kontak Darurat</th>
            <th className="p-4"></th>
          </tr>
        </thead>

        <tbody>
          {datapenghuni.data?.map((penghuni: PenghuniList, index: number) => (
            <tr className="border border-gray-300" key={index}>
              <td className="pl-8 p-4">{penghuni.nomor_kamar}</td>
              <td className="p-4">{penghuni.nama}</td>
              <td className="p-4">{penghuni.jenis_kelamin}</td>
              <td className="p-4">{penghuni.nomor_telepon}</td>
              <td className="p-4">{penghuni.kontak_darurat}</td>
              <td className="p-4">
                <CiEdit
                  className="text-4xl text-gray-400 cursor-pointer hover:scale-110"
                  onClick={() =>
                    onOpen("dataPenghuni", { userId: penghuni.id })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {datapenghuni.data.length === 0 && (
        <div className="text-center w-full mb-12">No Data Found</div>
      )}

      <Pagination
        currentPage={currentPage}
        pageSize={10}
        totalDataCount={10 * datapenghuni.totalPage}
        onPageChange={(page) => {
          router.push(`/penghuni?page=${page}&search=${search}`);
        }}
      />
    </div>
  );
}
