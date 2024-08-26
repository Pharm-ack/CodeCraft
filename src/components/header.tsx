import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="#" className="text-xl font-bold">
          Programming Tips
        </Link>
      </div>
    </header>
  );
}
