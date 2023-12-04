import { useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export const DataCalonPenghuniModal = () => {
    const { type, data, isOpen, onClose } = useModal();

    const isModalOpen = isOpen && type === "dataCalonPenghuni";

    const [showModal, setShowModal] = useState(isOpen);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isReviewChecked, setIsReviewChecked] = useState(false);
    const [isKontrakChecked, setIsKontrakChecked] = useState(false);

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

    if (!isModalOpen) {
        return null;
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="bg-white flex flex-col gap-8 items-center justify-center p-11 rounded-xl">
                    <div className="flex items-center gap-60">
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
                            />
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Jenis Kelamin</label>
                                <select
                                    className="border border-slate-300 rounded-sm py-1.5 px-2 text-slate-500 w-full placeholder-slate-500"
                                    placeholder="Jenis Kelamin"
                                >
                                    <option value="" disabled selected hidden>Jenis Kelamin</option>
                                    <option value="laki-laki">Laki-laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>NIM</label>
                                <input
                                    type="number"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="18221000"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <h1 className="text-2xl font-bold">Checklist</h1>
                    </div>
                    <div className="flex gap-6 justify-start w-full">
                        <div className={`flex gap-2.5 px-4 border py-2.5 ${isReviewChecked ? 'border-purple-700 text-purple-700 bg-purple-100' : 'border-slate-300 text-slate-600'} rounded-md`}>
                            <label className="text-sm font-semibold">Review Data Penghuni</label>
                            <input
                                type="checkbox"
                                className="w-5 h-5 accent-purple-700"
                                onChange={handleReviewCheckboxChange}
                            />
                        </div>
                        {isReviewChecked && (
                            <div className={`flex gap-2.5 px-4 border py-2.5 ${isKontrakChecked ? 'border-purple-700 text-purple-700 bg-purple-100' : 'border-slate-300 text-slate-600'} rounded-md`}>
                                <label className="text-sm font-semibold">Kontrak & Alokasi Kamar</label>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-purple-700"
                                    onChange={handleKontrakCheckboxChange}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}