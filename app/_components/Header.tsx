import { FaReact } from "react-icons/fa";
import Login from "./Login";
import Link from "next/link";

function HeaderLogo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link href="/">
        <div className="group relative inline-block rounded-full bg-black p-2 text-6xl text-white">
          <div className="relative z-10">
            <FaReact />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-gradient-start via-gradient-middle to-gradient-end opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"></div>
        </div>
      </Link>
      <Signature />
    </div>
  );
}
function Signature() {
  return <h3 className="text-sm italic md:text-lg">app by Ondra Janko</h3>;
}

export default function Header() {
  return (
    <header className="glass_bg min-w-screen sticky top-0 z-[10] flex flex-row items-center justify-between px-4 py-1 md:py-4 lg:px-32">
      <HeaderLogo />
      <Login />
    </header>
  );
}
