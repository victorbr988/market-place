import { Skeleton } from "@/components/ui/skeleton"

export function ItemsPageSkeleton() {
  return (
    <section className="flex items-center mt-8 flex-wrap gap-3">
      <section className=" flex w-full max-w-lg items-center space-x-2 border-r-[1px] border-gray-400 px-6">
        <Skeleton className="h-10 w-[400px] bg-gray-600 rounded-md" />
        <Skeleton className="h-10 w-[100px] bg-gray-600 rounded-md" />
      </section>

      <section className="flex gap-2 overflow-x-auto md:overflow-hidden px-3 md:px-0 mt-3 md:mt-0">
        <Skeleton className="h-10 w-[100px] bg-gray-600 rounded-md" />
        <Skeleton className="h-10 w-[100px] bg-gray-600 rounded-md" />
        <Skeleton className="h-10 w-[100px] bg-gray-600 rounded-md" />
        <Skeleton className="h-10 w-[100px] bg-gray-600 rounded-md" />
        <Skeleton className="h-10 w-[100px] bg-gray-600 rounded-md" />
      </section>

      <section className="mt-8 flex gap-2 px-5">
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
        <Skeleton className="h-[125px] w-[250px] bg-gray-600 rounded-xl" />
      </section>
    </section>
  )
}