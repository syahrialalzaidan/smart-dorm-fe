import { redirect } from "next/navigation";
import Kamar from "./Kamar";
import { cookies } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookie = cookies()?.get("token")?.value;
  if (cookie === undefined) {
    redirect("/login");
  }


  var page : number = 1;
  if (searchParams?.page !== undefined) {
    page = +searchParams?.page;
  }
  var search : number = 0;
  if (searchParams?.search !== undefined) {
    search = +searchParams?.search;
  }

  const res = await fetch(
    process.env.API_URL + `kamar?page=${page}${search !== 0 ? `&search=${search}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    }
  );
  const data = await res.json();

  return (
    <div className="w-full p-[7%] min-h-screen">
      <Kamar kamar={data} currentPage={page} />
    </div>
  );
}
