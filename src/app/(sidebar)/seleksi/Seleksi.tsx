"use client";
import Pagination from "@/components/pagination/Pagination";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";
import { CiEdit } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { IoIosPersonAdd } from "react-icons/io";
import { Penghuni } from "@/types/penghuni";
import { GoDotFill } from "react-icons/go";

interface PenghuniProps {
  datacalonpenghuni: any;
}

export default function Seleksi({ datacalonpenghuni }: PenghuniProps) {
  const pathname = usePathname();
  let currentPage: number = 1;
  if (pathname === "/seleksi") {
  } else {
    currentPage = +pathname.substring(pathname.length - 1);
  }
  const router = useRouter();
  const { onOpen } = useModal();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Seleksi Penghuni</h1>

        <div className="flex gap-4">
          <div className="rounded-xl bg-purple-300 flex gap-4 items-center text-purple-800 px-4 cursor-pointer border border-purple-800"
            onClick={() => {
              onOpen("dataCalonPenghuni");
            }}
          >
            <p>Tambah Calon Penghuni</p>
            <IoIosPersonAdd className="text-4xl" />
          </div>

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

      <table className="w-full my-12">
        <thead className="rounded-t-xl">
          <tr className="text-left border border-gray-300">
            <th className="p-4">Nama Calon</th>
            <th className="p-4">Gender</th>
            <th className="p-4">No HP</th>
            <th className="p-4">Status</th>
            <th className="p-4"></th>
          </tr>
        </thead>

        <tbody>
          {datacalonpenghuni.data?.map((penghuni: Penghuni['data'], index: number) => (
            <tr className="border border-gray-300" key={index}>
              <td className="p-4 cursor-pointer" onClick={() => onOpen("dataCalonPenghuni", { userId: penghuni.id })}>{penghuni.nama}</td>
              <td className="p-4">{penghuni.jenis_kelamin}</td>
              <td className="p-4">{penghuni.nomor_telepon}</td>
              <td className="p-4">
                <div className={`flex items-center px-1.5 gap-2 py-0.5 w-3/4 rounded-xl
                ${penghuni.status === "Menunggu Pembuatan Kontrak" ? "text-amber-600 bg-[#FFF2DD]" :
                    penghuni.status === "Menunggu Pembayaran" ? "text-green-600 bg-green-100" : "text-gray-800 bg-gray-200"}`}>
                  <GoDotFill className="text-xl" />
                  <p>{penghuni.status}</p>
                </div>
              </td>
              <td className="p-4">
                  <CiEdit
                    className="text-4xl text-gray-400 cursor-pointer hover:scale-110"
                    onClick={() => onOpen(`${penghuni.status === "Belum Direview" ? "reviewCalonPenghuni" : penghuni.status === "Menunggu Pembuatan Kontrak" ? "kontrak" : "dataCalonPenghuni"}`, { userId: penghuni.id })}
                  />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        pageSize={10}
        totalDataCount={10 * datacalonpenghuni.totalPages}
        onPageChange={(page) => {
          router.push(`/seleksi/${page}`);
        }}
      />
    </div>
  );
}
