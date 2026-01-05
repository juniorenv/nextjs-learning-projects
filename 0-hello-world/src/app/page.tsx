import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <Image src="/file.svg" alt="File icon" width={48} height={48}></Image>
        <h1 className="text-5xl font-bold">Hello World</h1>
      </div>
      <p className="text-xl text-gray-600">Welcome to Next.js!</p>
    </main>
  );
}
