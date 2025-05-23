"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { UserSetting } from "@/generated/prisma";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";
import StatsCards from "./StatsCards";
import CategoriesStats from "./CategoriesStats";

const Overview = ({ userSetting }: { userSetting: UserSetting }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="container py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-3xl font-bold">Overview</h2>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `The Selected data range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days`
                );
                return;
              }
              setDateRange({ from, to });
            }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 mb-3">
        <StatsCards
          userSetting={userSetting}
          from={dateRange.from}
          to={dateRange.to}
        />
        <CategoriesStats
          userSetting={userSetting}
          from={dateRange.from}
          to={dateRange.to}
        />
      </div>
    </>
  );
};

export default Overview;
