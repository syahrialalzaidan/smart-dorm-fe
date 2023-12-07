import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Kamar from "../Kamar";

export default async function Page({ params }: { params: { page: string } }) {
  const cookie = cookies()?.get("token")?.value;
  if (cookie === undefined) {
    redirect("/login");
  }

  const data = await fetch(process.env.API_URL + `kamar?page=${params?.page}`, {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  }).then((res) => res.json());

  return (
    <div className="w-full p-[7%] min-h-screen">
      <Kamar kamar={data} />
    </div>
  );
}
