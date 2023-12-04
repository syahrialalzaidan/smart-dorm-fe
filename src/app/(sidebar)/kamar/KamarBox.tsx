"use client";

import Image from "next/image";
import { LiaEditSolid } from "react-icons/lia";

interface KamarBoxProps {
  nama: string;
  fasilitas: string[];
  available: boolean;
}

export default function KamarBox({
  nama,
  fasilitas,
  available,
}: KamarBoxProps) {
  return (
    <div className="bg-white w-[480px] rounded-lg px-4 py-6 border border-gray-200 flex gap-4">
      <Image
        alt="Kamar"
        src="/kamar-dummy.svg"
        width={200}
        height={200}
        className="rounded-lg"
      />

      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-3xl">{nama}</h1>
        <div className="flex gap-4">
          <LiaEditSolid className="text-gray-400 text-4xl cursor-pointer" />
          <div
            className={`rounded-lg px-4 py-2 border ${
              available
                ? "border-emerald-700 bg-emerald-100 text-emerald-700"
                : "border-amber-700 bg-amber-100 text-amber-700"
            }`}
          >
            <p className="text-center">{available ? "Available" : "Booked"}</p>
          </div>
        </div>

        <p className="text-xl mt-4">
          <span className="font-bold">
            Fasilitas: <br />
          </span>{" "}
          {fasilitas.join(", ")}
        </p>
      </div>
    </div>
  );
}
