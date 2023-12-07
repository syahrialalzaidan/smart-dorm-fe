import Seleksi from "../Seleksi";
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
  const data = await fetch(process.env.API_URL + `calon-penghuni?page=${params.page}`, {
    headers: {
      'Authorization': `Bearer ${cookie}` // Assuming the cookie contains the authorization token
    }
  }).then((res) => res.json());

  return (
    <div className="min-h-screen w-full p-[7%]">
      <Seleksi datacalonpenghuni={data} />
    </div>
  );
}
