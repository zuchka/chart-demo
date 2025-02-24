"use client";

import dynamic from 'next/dynamic';

const TimeSeriesGraph = dynamic(
  () => import('./components/dashboard/TimeSeriesGraph').then(mod => mod.TimeSeriesGraph),
  { ssr: false }
);

const revenueData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      name: "Revenue",
      data: [180, 200, 220, 190, 230, 210, 240, 220, 230, 210, 225, 240],
      color: "#CB3CFF",
      showArea: true
    },
    {
      name: "Expenses",
      data: [120, 130, 125, 135, 140, 130, 145, 140, 150, 140, 145, 150],
      color: "#60A5FA"
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="gap-8">
        {/* Graph container with responsive width */}
        <div className="w-full overflow-x-hidden">
        <TimeSeriesGraph
          data={revenueData}
          title="Total revenue"
          value="$240.8K"
          percentageChange={24.6}
          dateRange="Jan 2024 - Dec 2024"
          maxValue={250}
        />
        </div>
      </main>
    </div>
  );
}