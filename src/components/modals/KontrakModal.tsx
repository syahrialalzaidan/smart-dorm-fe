import { useModal } from "@/hooks/useModalStore";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { TbFileDownload } from "react-icons/tb";
import fetcher from "@/lib/fetcher";
import { Penghuni } from "@/types/penghuni";
import useSWR from "swr";
import Cookies from "universal-cookie";
import { Kamar } from "@/types/kamar";
import toast from "react-hot-toast";

export const KontrakModal = () => {
    const { type, data, isOpen, onClose } = useModal();
    const router = useRouter()

    const isModalOpen = isOpen && type === "kontrak";

    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");

    const [showModal, setShowModal] = useState(isOpen);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [tanggalMasuk, setTanggalMasuk] = useState("");
    const [tanggalKeluar, setTanggalKeluar] = useState("");
    const [idKamar, setIdKamar] = useState("");
    const [pinAkses, setPinAkses] = useState("");

    const {
        data: penghuniData,
        error,
        isLoading,
    } = useSWR<Penghuni>(
        `http://localhost:8080/penghuni/${data.userId}`,
        () => fetcher(`http://localhost:8080/penghuni/${data.userId}`, token as string)
    );

    const {
        data: kamarData,
        error: errorKamar,
        isLoading: isLoadingKamar,
    } = useSWR<Kamar[]>(
        `http://localhost:8080/kamar/available`,
        () => fetcher(`http://localhost:8080/kamar/available`, token as string)
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(new Date(tanggalMasuk), tanggalKeluar, idKamar, pinAkses);
        setIsSubmitting(true);
        const res = await fetch(`http://localhost:8080/kontrak`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                tanggal_masuk: new Date(tanggalMasuk),
                tanggal_keluar: new Date(tanggalKeluar),
                kamar_id: idKamar,
                penghuni_id: penghuniData?.data.id,
                pin_akses: pinAkses,
            }),
        });

        if (res.status === 200) {
            toast.success("Successfully deleted!");
            handleClose();
            router.refresh();
            window.location.reload();
        } else {
            toast.error("Failed to delete!");
        }
        setIsSubmitting(false);

    }

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
                    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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
                                <label>Tanggal Awal Masuk</label>
                                <input
                                    type="date"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    onChange={(e) => setTanggalMasuk(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Tanggal Akhir Sewa</label>
                                <input
                                    type="date"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    onChange={(e) => setTanggalKeluar(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Kamar</label>
                                <select
                                    className="border border-slate-300 rounded-sm py-1.5 px-2 text-slate-500 w-full placeholder-slate-500"
                                    placeholder="Jenis Kelamin"
                                    onChange={(e) => {
                                        const selectedNomorKamar = parseInt(e.target.value);
                                        const selectedKamar = kamarData?.find((kamar) => kamar.nomor_kamar === selectedNomorKamar);

                                        if (selectedKamar) {
                                            setIdKamar(selectedKamar.id);
                                        } else {
                                            setIdKamar(""); 
                                        }
                                    }}
                                >
                                    <option value="" disabled selected hidden>Nomor Kamar</option>
                                    {kamarData?.map((kamar, index) => (
                                        <option key={index} value={kamar.nomor_kamar}>{kamar.nomor_kamar}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2 flex flex-col gap-2">
                                <label>Pin Akses</label>
                                <input
                                    type="text"
                                    className="border border-slate-300 rounded-sm py-1 px-3 w-full placeholder-slate-500"
                                    placeholder="758902"
                                    onChange={(e) => setPinAkses(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="">
                            Pengiriman kontrak akan menagihkan biaya sewa sebesar <span className="font-bold">Rp899.000,00 </span>
                            ke Sdri. <span className="font-bold">{penghuniData?.data.nama}</span> beserta mengirimkan file kontrak digital.
                            Pengalokasian kamar akan sekaligus dilakukan dengan mengirimkan <span className="font-bold">pin akses </span>
                            dan mengalokasikan kamar ke penghuni.
                        </div>
                        <div className="w-full flex justify-end gap-6">
                            <div className="w-1/2 border rounded border-slate-300 text-slate-700 flex items-center justify-center py-1.5 px-3 cursor-pointer gap-2">
                                <input
                                    type="submit"
                                    className="font-semibold text-sm"
                                    value={"Kontrak " + penghuniData?.data.nama}
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