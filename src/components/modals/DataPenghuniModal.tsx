import { useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";

export const DataPenghuniModal = () => {
    const { type, data, isOpen, onClose } = useModal();

    const isModalOpen = isOpen && type === "dataPenghuni";

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
                <div className="bg-white flex flex-col gap-8 items-center justify-center p-11 rounded-xl">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold">Data Penghuni</h1>
                        <div className="border-black border rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer" onClick={handleClose}>
                            <IoMdClose className="w-5 h-5" />
                        </div>
                    </div>
                    <form className="w-full flex flex-col gap-6">
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
                                <label>Nomor Telepon Kontak Darurat</label>
                                <input
                                    type="number"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="081234567890"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Hub - Nama Kontak Darurat</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="Ibu - Janet Doe"
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <label>Alasan Ingin Memasuki Asrama</label>
                            <textarea
                                className="border border-slate-300 rounded-sm py-1 px-3 h-36 w-full placeholder-slate-500"
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu libero turpis. In nunc 
                                purus, cursus eget est a, commodo ultrices lacus. Etiam pharetra mauris at nulla tincidunt,
                                in vulputate quam venenatis. Nulla vitae dolor vitae urna hendrerit tempus quis fermentum est. Etiam
                                fermentum molestie nisl vitae laoreet. Fusce lectus lectus, faucibus in venenatis ac, pharetra vel nisl.
                                Phasellus ullamcorper nibh eget metus aliquam convallis."
                            />
                        </div>
                        <div className="w-full flex justify-end mt-4">
                            <input
                                type="submit"
                                className="border border-red-700 bg-red-100 text-red-700 font-medium rounded-md py-1 px-3 w-1/2 cursor-pointer"
                                value="Hapus Penghuni"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}