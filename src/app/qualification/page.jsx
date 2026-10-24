import Link from "next/link";
import Qualification from "../../sections/Qualification";

export default function QualificationPage() {
  return (
    <main className="min-h-screen bg-black">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 px-5 py-2 rounded-full text-white font-semibold
          border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition"
      >
        ← Back
      </Link>
      <Qualification />
    </main>
  );
}