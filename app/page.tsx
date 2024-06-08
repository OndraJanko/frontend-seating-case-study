import EventDetails from "@/components/EventDetails";
import EventSeats from "@/components/EventSeats";
import PriceFooter from "@/components/PriceFooter";

function Event() {
  return (
    <div className="flex flex-row gap-5">
      <EventDetails />
      <EventSeats />
    </div>
  );
}

export default function Home() {
  return (
    <main className="debug flex min-h-screen flex-col items-center justify-center">
      <Event />
      <PriceFooter />
    </main>
  );
}
