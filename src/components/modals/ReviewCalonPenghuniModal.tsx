import { useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { Penghuni } from "@/types/penghuni";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

export const ReviewCalonPenghuniModal = () => {
    const { type, data, isOpen, onClose } = useModal();
    const router = useRouter()

    const isModalOpen = isOpen && type === "reviewCalonPenghuni";

    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");

    const [showModal, setShowModal] = useState(isOpen);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        data: penghuniData,
        error,
        isLoading,
    } = useSWR<Penghuni>(
        `http://localhost:8080/penghuni/${data.userId}`,
        () => fetcher(`http://localhost:8080/penghuni/${data.userId}`, token as string)
    );

    useEffect(() => {
        if (isSubmitting) {
            toast.loading("Loading...");
        } else {
            toast.dismiss();
        }
    }, [isSubmitting]);

    const handleClose = useCallback(() => {
        if (isSubmitting) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [isSubmitting, onClose]);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await fetch(`http://localhost:8080/calon-penghuni/${data.userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            setTimeout(() => {
                toast.success("Calon Penghuni successfully deleted!");
            }, 500)
            handleClose();
            router.refresh();
        } else {
            setTimeout(() => {
                toast.error("Failed to delete calon penghuni!");
            }, 500)
        }
        setIsSubmitting(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await fetch(`http://localhost:8080/penghuni/${data.userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.status === 200) {
            setTimeout(() => {
                toast.success("Calon Penghuni Successfully accepted!", {
                    duration: 3000
                });
            }, 500)
            handleClose();
            router.refresh();
        } else {
            setTimeout(() => {
                toast.error("Failed to update calon penghuni!");
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
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-bold">Review Data Calon</h1>
                        <div className="border-black border rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer" onClick={handleClose}>
                            <IoMdClose className="w-5 h-5" />
                        </div>
                    </div>
                    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
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
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Nomor Telepon</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="081234567890"
                                    value={penghuniData?.data.nomor_telepon}
                                    disabled
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="janedoe@gmail.com"
                                    value={penghuniData?.data.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Nomor Telepon Kontak Darurat</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="081234567890"
                                    value={penghuniData?.data.kontak_darurat}
                                    disabled
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Hub - Nama Kontak Darurat</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="Ibu - Janet Doe"
                                    value={penghuniData?.data.hubungan_kontak_darurat + ' - ' + penghuniData?.data.nama_kontak_darurat}
                                    disabled
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
                                value={penghuniData?.data.alasan}
                                disabled
                            />
                        </div>
                        <div className="w-full flex justify-end mt-4 gap-6">
                            <input
                                type="button"
                                className="border border-red-700 bg-red-100 text-red-700 font-medium rounded-md py-1 px-3 w-1/2 cursor-pointer"
                                value="Tolak"
                                onClick={handleDelete}
                            />
                            <input
                                type="submit"
                                className="border border-emerald-700 bg-emerald-100 text-emerald-700 font-medium rounded-md py-1 px-3 w-1/2 cursor-pointer"
                                value="Lanjut ke Pembuatan Kontrak"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}