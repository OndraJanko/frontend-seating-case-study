import Link from "next/link";
import Signature from "@/components/Signature";
import dynamic from "next/dynamic";
import CartSkeleton from "@/components/skeletons/CartSkeleton";
import LoginSkeleton from "@/components/skeletons/LoginSkeleton";
import LogoShape from "./LogoShape";

//lazy loads login and cart button
const Login = dynamic(() => import("./Login"), {
  ssr: false,
  loading: () => <LoginSkeleton />,
});

const Cart = dynamic(() => import("./Cart"), {
  ssr: false,
  loading: () => <CartSkeleton />,
});

function LogoContainer() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link href="/" aria-label="Home">
        <LogoShape />
      </Link>
      <div className="hidden md:block">
        <Signature />
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="glass_bg min-w-screen sticky top-0 z-[10] flex flex-row items-center justify-between px-4 py-1 md:py-4 lg:px-20">
      <nav className="flex w-full flex-row items-center justify-between">
        <LogoContainer />
        <div className="flex flex-row items-center gap-4">
          <Cart />
          <Login />
        </div>
      </nav>
    </header>
  );
}
