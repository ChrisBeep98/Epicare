import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center gap-6">
      <h1 className="text-5xl font-bold font-dmsans">Welcome to the New Platform</h1>
      <p className="text-xl opacity-70 font-dmsans max-w-lg">
        The base project is ready. The Design System has been configured with your tokens.
      </p>
      <Link href="/design-system" className="px-8 py-4 bg-[#35BBFD] text-white font-bold rounded-2xl shadow-lg hover:-translate-y-1 transition-all">
        Open Design System
      </Link>
    </div>
  );
}
