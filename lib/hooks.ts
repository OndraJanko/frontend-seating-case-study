import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/lib/fetchers";

const useEvent = () => {
  return useQuery({ queryKey: ["event"], queryFn: () => fetchEvent() });
};

export default useEvent;
