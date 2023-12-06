import { FaSort } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import KamarBox from "./KamarBox";

export default function Kamar() {
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

      <div className="flex flex-wrap gap-6 mt-8">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <KamarBox key={i}
                nama={`Kamar ${i + 100}`}
                fasilitas={["Kamar mandi dalam", "Meja belajar"]}
                available={i % 2 === 0}
            />
          ))}
      </div>
    </div>
  );
}
