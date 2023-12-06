import Seleksi from "./Seleksi";

export default async function PenghuniPage({
  params,
}: {
  params: { page: string };
}) {
  const data = await fetch(process.env.API_URL + "calon-penghuni").then((res) =>
    res.json()
  );

  return (
    <div className="min-h-screen w-full p-[7%]">
        <Seleksi datacalonpenghuni={data} />
    </div>
  );
}
