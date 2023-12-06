"use client";
import { LuChevronsLeft, LuChevronsRight } from "react-icons/lu";

export interface PaginationButtonProps {
  isDirectionRight?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

export default function PaginationButton({
  isDirectionRight = false,
  onClick,
  isDisabled = false,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-2 py-1 glass rounded-md font-bold ${
        !isDisabled && "hover:bg-purple-200 hover:text-purple-800"
      } transition-all disabled:opacity-50`}
    >
      {isDirectionRight ? (
        <LuChevronsRight className="text-primaryDark-400 text-2xl md:text-3xl" />
      ) : (
        <LuChevronsLeft className="text-primaryDark-400 text-2xl md:text-3xl" />
      )}
    </button>
  );
}
