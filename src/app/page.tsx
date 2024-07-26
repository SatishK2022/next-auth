import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-black">
      <h1 className="font-semibold text-5xl text-center">Next Auth</h1>
      <p className="text-xl">Welcome to the Next Auth App.</p>
      <div className="flex justify-center">
        <Link href={"/profile"}>
          <button className="bg-black hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition-all duration-200 ease-in-out mt-10">Profile</button>
        </Link>
      </div>
    </main>
  );
}
