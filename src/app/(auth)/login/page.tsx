import LoginForm from "@/components/login-form";
import Image from "next/image";
export default function Page() {
  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <section className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Image width={32} height={32} src="/logo.svg" alt="logo image" />
        <p className="text-xl font-bold text-primary mt-3">Fleet Manager</p>
        <h1 className="font-medium text-2xl leading-6 my-5">Log In</h1>
        <LoginForm />
      </section>
    </main>
  );
}