import Link from "next/link";

export default function Signature() {
  return (
    <h3 className="text-sm">
      app by{" "}
      <Link
        className="font-bold"
        href="https://ondrajanko.xyz"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ondra Janko's personal website"
      >
        Ondra Janko
      </Link>
    </h3>
  );
}
