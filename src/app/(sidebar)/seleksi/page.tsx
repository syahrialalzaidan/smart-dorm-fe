import { redirect } from "next/navigation";
import Seleksi from "./Seleksi";
import { cookies } from "next/headers";

export default async function PenghuniPage({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookie = cookies()?.get("token")?.value;
  if (cookie === undefined) {
    redirect("/login");
  }

  var page: number = 1;
  if (searchParams?.page !== undefined) {
    page = +searchParams?.page;
  }
  var search = "";
  if (searchParams?.search !== undefined) {
    search = searchParams?.search.toString();
  }

  const res = await fetch(
    process.env.API_URL +
      `calon-penghuni?page=${page}${search !== "" ? `&search=${search}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
  const data = await res.json();

  return (
    <div className="min-h-screen w-full p-[7%]">
      <Seleksi datacalonpenghuni={data} currentPage={page} />
    </div>
  );
}
