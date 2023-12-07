import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  const cookie = cookies()?.get("token")?.value;
  if (cookie !== undefined) {
    redirect("/kamar");
  }
  
  return (
    <div className="p-[5%] bg-[url('/login-bg.svg')] bg-no-repeat flex flex-col items-center justify-center">
      <h1 className="text-[#6930B7] mb-16 font-semibold text-center text-6xl">
        Login
      </h1>

      <LoginForm />
    </div>
  );
}
