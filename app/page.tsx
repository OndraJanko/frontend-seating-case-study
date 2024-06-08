import EventDetails from "@/components/EventDetails";
import EventSeats from "@/components/EventSeats";
import PriceFooter from "@/components/PriceFooter";

function Event() {
  return (
    <div className="flex w-full flex-row gap-5 overflow-auto px-5 py-8 lg:px-32">
      <EventDetails />
      <EventSeats />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-start">
      <Event />
      <PriceFooter />
    </main>
  );
}
