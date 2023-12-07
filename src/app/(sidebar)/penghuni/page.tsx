import Penghuni from "./Penghuni";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function PenghuniPage({
  params,
}: {
  params: { page: string };
}) {
  const cookie = cookies()?.get("token")?.value;
  if (cookie === undefined) {
    redirect("/login");
  }
  const data = await fetch(process.env.API_URL + "penghuni", {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  }).then((res) => res.json());

  return (
    <div className="min-h-screen w-full p-[7%]">
      <Penghuni datapenghuni={data} />
    </div>
  );
}
