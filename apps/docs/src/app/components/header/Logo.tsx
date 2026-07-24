import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <Image src="/vertex-logo.png" alt="Vertex UI" width={100} height={100} priority />
    </Link>
  );
}
