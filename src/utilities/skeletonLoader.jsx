import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center h-[70vh]">
        <Skeleton className="h-48 w-94" />
        <Skeleton className="h-48 w-94" />
        <Skeleton className="h-48 w-94" />
        <Skeleton className="h-48 w-94" />
    </div>
  );
}
