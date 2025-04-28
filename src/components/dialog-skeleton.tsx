import { Skeleton } from "./ui/skeleton";

export function DialogSkeleton() {

  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
      <Skeleton className="w-/2 h-6" />
    </div>
  )
}
