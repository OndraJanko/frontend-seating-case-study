import EventContainer from "@/components/EventContainer";
import PriceFooter from "@/components/PriceFooter";

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-start">
      <EventContainer />
    </main>
  );
}
