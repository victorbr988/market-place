import { Skeleton } from "@/components/ui/skeleton";

export function CardItemSkeleton() {
  return (
    <section className=" flex gap-2">
      <Skeleton className="h-[150px] w-[250px] bg-gray-600 rounded-xl" />
      <Skeleton className="h-[150px] w-[250px] bg-gray-600 rounded-xl" />
      <Skeleton className="h-[150px] w-[250px] bg-gray-600 rounded-xl" />
      <Skeleton className="h-[150px] w-[250px] bg-gray-600 rounded-xl" />
      <Skeleton className="h-[150px] w-[250px] bg-gray-600 rounded-xl" />
    </section>
  )
}