import { Skeleton } from "@/components/ui/skeleton";

export function CategoriesSkeleton() {
  return Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} className="h-10 w-20 bg-gray-600 rounded" />
  ))
}