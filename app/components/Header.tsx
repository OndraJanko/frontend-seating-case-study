import { FaReact } from "react-icons/fa";
import Login from "./Login";
import Link from "next/link";

function HeaderLogo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Link href="/">
        <div className="group relative inline-block rounded-full bg-black p-4 text-6xl text-white transition-colors duration-500 ease-in-out">
          <div className="relative z-10">
            <FaReact />
          </div>
          <div className="from-gradient-start via-gradient-middle to-gradient-end absolute inset-0 rounded-full bg-gradient-to-bl opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"></div>
        </div>
      </Link>
      <div className="flex items-center justify-center rounded-full bg-black p-8" />
      <div className="flex items-center justify-center rounded-full bg-black p-6" />
      <Signature />
    </div>
  );
}
function Signature() {
  return (
    <h3 className="item-center flex justify-center">app by Ondra Janko</h3>
  );
}

export default function Header() {
  return (
    <header className="min-w-screen glass_bg sticky top-0 z-[100000] flex flex-row items-center justify-between px-52 py-8">
      <HeaderLogo />
      <Login />
    </header>
  );
}
