"use client";

export interface PaginationNumberProps {
  pageNumber?: number | string;
  isDots?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function PaginationNumber({
  pageNumber,
  isDots = false,
  isActive = false,
  isDisabled = false,
  onClick,
}: PaginationNumberProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`flex w-[9%] max-w-[2rem] aspect-square text-base md:text-lg ${
        isActive ? "bg-purple-200 shadow-sm shadow-primary scale-110" : ""
      } justify-center items-center font-bold font-sen ${
        !isDots ? "rounded-md " : ""
      } ${
        !isActive && !isDots ? "hover:text-purple-700 ease-out duration-200" : ""
      } ${isActive && "text-purple-700"}`}
    >
      {isDots ? "..." : pageNumber}
    </button>
  );
}
