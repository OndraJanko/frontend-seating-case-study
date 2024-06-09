import Link from "next/link";
export default function Signature() {
  return (
    <h3 className="text-sm">
      app by{" "}
      <Link
        className="font-bold"
        href="https://ondrajanko.xyz"
        target="_blank"
        rel="noreferrer"
        aria-description="Ondra Janko"
      >
        Ondra Janko
      </Link>
    </h3>
  );
}
