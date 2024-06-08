import EventDetails from "@/components/EventDetails";
import EventSeats from "@/components/EventSeats";
import PriceFooter from "@/components/PriceFooter";

function Event() {
  return (
    <div className="flex w-full flex-col gap-5 px-5 py-8 md:flex-row lg:px-32">
      <EventDetails />
      <div className="relative flex h-full w-full md:w-2/3">
        <EventSeats />
        <div className="absolute bottom-[-5px] right-[-5px] z-0 h-full w-full rounded-md bg-gradient-to-bl from-gradient-start via-gradient-middle to-gradient-end md:bottom-[-10px] md:right-[-10px] lg:bottom-[-20px] lg:right-[-20px]"></div>
      </div>
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
