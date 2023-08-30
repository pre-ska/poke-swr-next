import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-center mb-4">Gotta cache &apos;em all</h1>
      <Link href="/bulbasaur">
        <p className="text-center">
          This is a simple example of SWR caching with Next.js.
        </p>
      </Link>
    </div>
  );
}
