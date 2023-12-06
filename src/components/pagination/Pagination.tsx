"use client";

import { useState, useMemo } from "react";
import PaginationButton from "./PaginationButton";
import PaginationNumber from "./PaginationNumber";

export interface PaginationProps {
  totalDataCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange?: (arg: number | string) => void;
  siblingCount?: number;
}

function getArray(start: number, end: number) {
  let length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
}

// usePagination returns an array of page numbers to show
export const usePagination = ({
  totalDataCount,
  currentPage,
  pageSize,
  siblingCount = 1,
}: PaginationProps) => {
  const pageRange = useMemo(() => {
    const pageCount = Math.ceil(totalDataCount / pageSize);
    const pageNumbersToShow = siblingCount + 5;

    if (pageNumbersToShow >= pageCount) {
      return getArray(1, pageCount);
    }

    const leftIndex = Math.max(currentPage - siblingCount, 1);
    const rightIndex = Math.min(currentPage + siblingCount, pageCount);
    const isLeftDotsShown = leftIndex > 2;
    const isRightDotsShown = rightIndex < pageCount - 2;

    if (!isLeftDotsShown && isRightDotsShown) {
      let leftRange = getArray(1, 3 + siblingCount);
      return [...leftRange, "DOTS", pageCount];
    }

    if (isLeftDotsShown && !isRightDotsShown) {
      let rightRange = getArray(pageCount - 4 + siblingCount, pageCount);
      return [1, "DOTS", ...rightRange];
    }

    if (isLeftDotsShown && isRightDotsShown) {
      let middleRange = getArray(leftIndex, rightIndex);
      return [1, "DOTS", ...middleRange, "DOTS", pageCount];
    }
  }, [currentPage, totalDataCount, pageSize, siblingCount]);

  return pageRange;
};

const Pagination = ({
  totalDataCount,
  currentPage,
  pageSize,
  onPageChange = () => {},
  siblingCount = 1,
}: PaginationProps) => {
  const paginationRange = usePagination({
    totalDataCount,
    currentPage,
    pageSize,
    siblingCount,
  });

  const onNext = () => {
    onPageChange ? onPageChange(currentPage + 1) : null;
  };

  const onPrev = () => {
    onPageChange ? onPageChange(currentPage - 1) : null;
  };

  let lastPageNumber = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : 0;

  return (
    <div className="flex gap-2 md:gap-3 w-full justify-center items-center">
      <PaginationButton
        isDirectionRight={false}
        onClick={onPrev}
        isDisabled={currentPage === 1}
      />

      {paginationRange?.map((pageNum, idx) => {
        if (pageNum === "DOTS") {
          return <PaginationNumber isDots={true} key={idx} isDisabled={true} />;
        }

        return (
          <PaginationNumber
            pageNumber={pageNum}
            isActive={currentPage === pageNum}
            isDisabled={currentPage === pageNum}
            onClick={() => onPageChange(pageNum)}
            key={idx}
          />
        );
      })}

      <PaginationButton
        isDirectionRight={true}
        onClick={onNext}
        isDisabled={currentPage === lastPageNumber}
      />
    </div>
  );
};

export default Pagination;
