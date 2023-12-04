import { useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { TbFileDownload } from "react-icons/tb";

export const KontrakModal = () => {
    const { type, data, isOpen, onClose } = useModal();

    const isModalOpen = isOpen && type === "kontrak";

    const [showModal, setShowModal] = useState(isOpen);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClose = useCallback(() => {
        if (isSubmitting) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [isSubmitting, onClose]);

    if (!isModalOpen) {
        return null;
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="bg-white flex flex-col gap-8 items-center justify-center p-11 rounded-xl max-w-[700px]">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold">Data Penghuni</h1>
                        <div className="border-black border rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer" onClick={handleClose}>
                            <IoMdClose className="w-5 h-5" />
                        </div>
                    </div>
                    <form className="w-full flex flex-col gap-4">
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
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Nomor Telepon</label>
                                <input
                                    type="number"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="081234567890"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="janedoe@gmail.com"
                                />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Tanggal Awal Masuk</label>
                                <input
                                    type="date"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Tanggal Akhir Sewa</label>
                                <input
                                    type="date"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Kamar</label>
                                <select
                                    className="border border-slate-300 rounded-sm py-1.5 px-2 text-slate-500 w-full placeholder-slate-500"
                                    placeholder="Jenis Kelamin"
                                >
                                    <option value="" disabled selected hidden>Nomor Kamar</option>
                                    <option value="laki-laki">001</option>
                                    <option value="perempuan">002</option>
                                </select>
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Pin Akses</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="758902"
                                />
                            </div>
                        </div>
                        <div className="">
                            Pengiriman kontrak akan menagihkan biaya sewa sebesar <span className="font-bold">Rp899.000,00 </span> 
                            ke Sdri. <span className="font-bold">Jane Doe</span> beserta mengirimkan file kontrak digital.
                            Pengalokasian kamar akan sekaligus dilakukan dengan mengirimkan <span className="font-bold">pin akses </span> 
                            dan mengalokasikan kamar ke penghuni.
                        </div>
                        <div className="w-full flex justify-end gap-6">
                            <div className="w-1/3 border rounded border-slate-300 text-slate-700 flex items-center justify-center py-1.5 px-3 cursor-pointer gap-2">
                            <input
                                type="submit"
                                className="font-semibold text-sm"
                                value="Kontrak Jane Doe.pdf"
                            />
                            <TbFileDownload className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="w-full flex justify-end gap-6">
                            <input
                                type="submit"
                                className="border rounded bg-purple-700 text-white font-medium py-1.5 px-3 w-1/2 cursor-pointer"
                                value="Kirim Kontrak"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}