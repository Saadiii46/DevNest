"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Prop {
  label?: string;
  count?: number | string;
  icon?: React.ReactNode;
  className?: string;
}

const InfoCard = ({ label, count, icon, className }: Prop) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="info-card-main">
      <div className="flex flex-col gap-1">
        <p className="text-slate-600 text-xs font-medium mb-1">{label}</p>
        <span className="text-2xl font-bold text-slate-800">
          {isLoading ? (
            <Skeleton className="inline-block h-4 w-[150px] loader" />
          ) : (
            count
          )}
        </span>
      </div>
      <div className={className}>{icon}</div>
    </div>
  );
};

export default InfoCard;
