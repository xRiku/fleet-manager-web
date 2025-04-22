import LoginForm from "@/components/login-form";
import { auth } from "@/lib/auth";
import { Role } from "@/types";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === Role.ADMIN) {
    redirect("/dashboard");
  }

  if (session?.user.role === Role.USER) {
    redirect("/driver");
  }

  return (
    <main className="flex justify-center items-center h-screen bg-white sm:bg-gray-100">
      <section className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg sm:shadow-md">
        <Image width={32} height={32} src="/logo.png" alt="logo image" />
        <p className="text-xl font-bold text-primary mt-3">Fleet Manager</p>
        <h1 className="font-medium text-2xl leading-6 my-5">Log In</h1>
        <LoginForm />
      </section>
    </main>
  );
}
