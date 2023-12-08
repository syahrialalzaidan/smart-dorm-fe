import { useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Cookies from "universal-cookie";
import fetcher from "@/lib/fetcher";
import { Penghuni } from "@/types/penghuni";
import useSWR from "swr";
import toast from "react-hot-toast";

export const DataCalonPenghuniModal = () => {
    const { type, data, isOpen, onClose } = useModal();
    const router = useRouter()

    const isModalOpen = isOpen && type === "dataCalonPenghuni";

    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");

    const [showModal, setShowModal] = useState(isOpen);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isReviewChecked, setIsReviewChecked] = useState(false);
    const [isKontrakChecked, setIsKontrakChecked] = useState(false);
    const [isPembayaranChecked, setIsPembayaranChecked] = useState(false);

    const {
        data: penghuniData,
        error,
        isLoading,
    } = useSWR<Penghuni>(
        `http://localhost:8080/penghuni/${data.userId}`,
        () => fetcher(`http://localhost:8080/penghuni/${data.userId}`, token as string)
    );

    useEffect(() => {
        if (penghuniData?.data.status === "Menunggu Pembayaran") {
            setIsReviewChecked(true);
            setIsKontrakChecked(true);
        } else if (penghuniData?.data.status === "Menunggu Pembuatan Kontrak") {
            setIsReviewChecked(true);
            setIsKontrakChecked(false);
        } else {
            setIsReviewChecked(false);
            setIsKontrakChecked(false);
        }
    }, [penghuniData?.data?.status]);

    const handleClose = useCallback(() => {
        if (isSubmitting) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [isSubmitting, onClose]);

    const handleReviewCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsReviewChecked(event.target.checked);
    };

    const handleKontrakCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsKontrakChecked(event.target.checked);
    }

    useEffect(() => {
        if (isSubmitting) {
            toast.loading("Loading...")
        } else {
            toast.dismiss();
        }
    }, [isSubmitting]);

    const handlePembayaranCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setIsSubmitting(true);
        setIsPembayaranChecked(event.target.checked);
        const res = await fetch(`http://localhost:8080/penghuni/${data.userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            setTimeout(() => {
                toast.success("Successfully updated!");
            }, 500)
            handleClose();
            router.refresh();
        } else {
            setTimeout(() => {
                toast.error("Failed to update!");
            }, 500)
        }
        setIsSubmitting(false);
    }

    if (!isModalOpen) {
        return null;
    }

    if (isLoading) {
        return
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="bg-white flex flex-col gap-8 items-center justify-center p-11 rounded-xl">
                    <div className="flex items-center w-full justify-between">
                        <h1 className="text-3xl font-bold">Calon Penghuni</h1>
                        <div className="border-black border rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer" onClick={handleClose}>
                            <IoMdClose className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-full flex flex-col gap-2">
                            <label>Nama</label>
                            <input
                                type="text"
                                className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                placeholder="John Doe"
                                value={penghuniData?.data.nama}
                                disabled
                            />
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Jenis Kelamin</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="John Doe"
                                    value={penghuniData?.data.jenis_kelamin}
                                    disabled
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>NIM</label>
                                <input
                                    type="number"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="18221000"
                                    value={penghuniData?.data.nim}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <h1 className="text-2xl font-bold">Checklist</h1>
                    </div>
                    <div className="flex gap-3 justify-start w-full">
                        <div className={`flex gap-2.5 px-4 border py-2.5 ${isReviewChecked ? 'border-purple-700 text-purple-700 bg-purple-100' : 'border-slate-300 text-slate-600'} rounded-md`}>
                            <label className="text-sm font-semibold">Review Data Penghuni</label>
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-purple-700 "
                                onChange={handleReviewCheckboxChange}
                                checked={isReviewChecked}
                            />
                        </div>
                        {isReviewChecked && (
                            <div className={`flex gap-2.5 px-4 border py-2.5 ${isKontrakChecked ? 'border-purple-700 text-purple-700 bg-purple-100' : 'border-slate-300 text-slate-600'} rounded-md`}>
                                <label className="text-sm font-semibold">Kontrak & Alokasi Kamar</label>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-purple-700"
                                    onChange={handleKontrakCheckboxChange}
                                    checked={isReviewChecked && isKontrakChecked}
                                />
                            </div>
                        )}
                        {isReviewChecked && isKontrakChecked && (
                            <div className={`flex gap-2.5 px-4 border py-2.5 ${isPembayaranChecked ? 'border-purple-700 text-purple-700 bg-purple-100' : 'border-slate-300 text-slate-600'} rounded-md`}>
                                <label className="text-sm font-semibold">Pembayaran</label>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-purple-700"
                                    onChange={handlePembayaranCheckboxChange}
                                    checked={isReviewChecked && isKontrakChecked && isPembayaranChecked}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}