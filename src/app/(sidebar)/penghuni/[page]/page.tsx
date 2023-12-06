import Penghuni from "../Penghuni";

export default async function PenghuniPage({
  params,
}: {
  params: { page: string };
}) {
  const data = await fetch(process.env.API_URL + `penghuni?page=${params?.page}` ).then((res) =>
    res.json()
  );

  return (
    <div className="min-h-screen w-full p-[7%]">
      <Penghuni datapenghuni={data} />
    </div>
  );
}
