import Event from "@/components/Event";
import PriceFooter from "@/components/PriceFooter";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-start">
      <Event />
      <PriceFooter />
    </main>
  );
}
