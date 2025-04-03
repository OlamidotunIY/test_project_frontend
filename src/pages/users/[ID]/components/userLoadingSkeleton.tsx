import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserLoadingSkeleton = () => {
  return (
    <div className="lg:p-16 md:p-10 p-5 h-screen">
      <div className="w-full h-full flex flex-col space-y-10">
        <Skeleton className="w-full h-1/2 rounded bg-slate-300">
          <div className="absolute -bottom-1/12 left-5">
            <Skeleton className="w-10 h-10" />
          </div>
        </Skeleton>
        <div>
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-1/5 h-4" />
            <Skeleton className="w-1/4 h-3" />
          </div>
          <div className="border border-slate-300 mt-5 rounded-lg min-h-10 flex flex-col p-3 space-y-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-1/2 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoadingSkeleton;
