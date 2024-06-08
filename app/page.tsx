import Event from "@/components/Event";
import PriceFooter from "@/components/PriceFooter";
import { fetchEvent } from "@/lib/fetchers";
import QueryProvider from "./_components/queryprovider";

export default async function Home() {
  return (
    <QueryProvider>
      <main className="flex h-full flex-col items-center justify-start">
        <Event />
        <PriceFooter />
      </main>
    </QueryProvider>
  );
}
