import Penghuni from "./Penghuni";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    "http://127.0.0.1:8080/" +
      `penghuni?page=${page}${search !== "" ? `&search=${search}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
  const data = await res.json();

  return (
    <div className="min-h-screen w-full p-[7%]">
      <Penghuni datapenghuni={data} currentPage={page} />
    </div>
  );
}
