import { redirect } from "next/navigation";
import Kamar from "./Kamar";
import { cookies } from "next/headers";

export default async function Page() {
  const cookie = cookies()?.get("token")?.value;
  if(cookie === undefined){
    redirect("/login");
  }

  const data = await fetch(process.env.API_URL + "kamar", {
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
