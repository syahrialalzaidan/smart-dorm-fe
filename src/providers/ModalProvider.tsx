"use client"

import { DataCalonPenghuniModal } from "@/components/modals/DataCalonPenghuniModal";
import { DataPenghuniModal } from "@/components/modals/DataPenghuniModal";
import { KontrakModal } from "@/components/modals/KontrakModal";
import { ReviewCalonPenghuniModal } from "@/components/modals/ReviewCalonPenghuniModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <>
        <DataPenghuniModal />
        <DataCalonPenghuniModal />
        <ReviewCalonPenghuniModal />
        <KontrakModal />
      </>
    )
  }