import * as React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getChartData, getSummary } from "../api";
import { FuelChart } from "../components/fuel-chart";
import { OemChart } from "../components/oem-chart";
import { RegistrationYearChart } from "../components/registration-year-chart";
import { Skeleton } from "../components/skeleton";
import { Statistic } from "../components/statistic";
import { formatCurrency, formatNumber } from "../lib/intl";
import { privateLoader } from "../lib/private-loader";
import type { Chart, Summary } from "../types";

export const loader = privateLoader(() => {
  return defer({
    summary: getSummary(),
    fuelChart: getChartData("FUEL_TYPE"),
    oemChart: getChartData("OEM"),
    yearChart: getChartData("REGISTRATION_YEAR"),
  });
});

export function Component() {
  const data = useLoaderData() as {
    summary: Promise<Summary>;
    fuelChart: Promise<Array<Chart>>;
    oemChart: Promise<Array<Chart>>;
    yearChart: Promise<Array<Chart>>;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <React.Suspense
          fallback={
            <>
              <Skeleton className="h-[120px]" />
              <Skeleton className="h-[120px]" />
              <Skeleton className="h-[120px]" />
            </>
          }
        >
          <Await resolve={data.summary}>
            {(data: Summary) => (
              <>
                <Statistic
                  label="Vehicles in stock"
                  value={formatNumber(data.count)}
                />
                <Statistic
                  label="Unique OEMs"
                  value={formatNumber(data.oems)}
                />
                <Statistic
                  label="Stock value"
                  value={formatCurrency(data.value, {
                    notation: "compact",
                  })}
                />
              </>
            )}
          </Await>
        </React.Suspense>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Top 5 OEMs */}
        <React.Suspense fallback={<Skeleton className="h-[400px]" />}>
          <Await resolve={data.oemChart}>
            {(oemChart: Array<Chart>) => <OemChart data={oemChart} />}
          </Await>
        </React.Suspense>

        {/* Fuel Type Breakdown */}
        <React.Suspense fallback={<Skeleton className="h-[400px]" />}>
          <Await resolve={data.fuelChart}>
            {(fuelChart: Array<Chart>) => <FuelChart data={fuelChart} />}
          </Await>
        </React.Suspense>

        {/* Registration Year Breakdown */}
        <React.Suspense
          fallback={<Skeleton className="col-span-1 h-[400px] md:col-span-2" />}
        >
          <Await resolve={data.yearChart}>
            {(yearChart: Array<Chart>) => (
              <RegistrationYearChart data={yearChart} />
            )}
          </Await>
        </React.Suspense>
      </section>
    </div>
  );
}
Component.displayName = "Dashboard";
