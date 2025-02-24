"use client";

import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { StatusBadge } from "./StatusBadge";

interface TimeSeriesData {
  months: string[];
  datasets: {
    name: string;
    data: number[];
    color: string;
    showArea?: boolean;
  }[];
}

interface TimeSeriesGraphProps {
  data: TimeSeriesData;
  title: string;
  value: string;
  percentageChange: number;
  dateRange: string;
  maxValue?: number;
  interval?: number;
}

export const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  data,
  title,
  value,
  percentageChange,
  dateRange,
  maxValue = 250,
  interval: defaultInterval = 0,
}) => {
  const [chartHeight, setChartHeight] = useState(700);
  const [interval, setInterval] = useState(defaultInterval);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setChartHeight(500);
      } else if (width < 1024) {
        setChartHeight(600);
      } else {
        setChartHeight(700);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    setInterval(window.innerWidth < 640 ? 2 : 0);

    const handleResize = () => {
      setInterval(window.innerWidth < 640 ? 2 : 0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = {
    backgroundColor: "rgb(15 23 42)",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      containLabel: true,
      left: '3%',
      right: '4%',
    },
    responsive: true,
    maintainAspectRatio: false,
    xAxis: {
      type: "category",
      data: data.months,
      axisLine: {
        lineStyle: {
          color: "#666",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
        interval: interval,
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: maxValue,
      interval: maxValue / 5,
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      axisLabel: {
        color: "#999",
        fontSize: 12,
        formatter: "{value}K",
      },
    },
    series: data.datasets.map(dataset => ({
      name: dataset.name,
      type: "line",
      smooth: true,
      data: dataset.data,
      symbolSize: 6,
      itemStyle: {
        color: dataset.color,
      },
      lineStyle: {
        width: 3,
      },
      ...(dataset.showArea && {
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: `${dataset.color}33`, // 20% opacity
              },
              {
                offset: 1,
                color: `${dataset.color}00`, // 0% opacity
              },
            ],
          },
        },
      }),
    })),
  };

  return (
    <div className="w-full">
      <div className="flex flex-col px-7 py-7 w-full rounded-xl border-solid shadow-sm bg-slate-900 border-[0.6px] border-[color:var(--Secondary-Colors-Color-4,#343B4F)] max-md:px-5">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
          <div className="flex flex-col">
            <div className="self-start text-sm font-medium leading-none text-white">
              {title}
            </div>
            <div className="flex gap-1.5 items-center mt-2.5 whitespace-nowrap">
              <div className="self-stretch my-auto text-2xl font-semibold leading-none text-white">
                {value}
              </div>
              <StatusBadge>{percentageChange}%</StatusBadge>
            </div>
          </div>
          <div className="flex gap-5 items-center my-auto text-xs font-medium leading-none text-white">
            {data.datasets.map((dataset) => (
              <div key={dataset.name} className="gap-2 self-stretch my-auto whitespace-nowrap">
                {dataset.name}
              </div>
            ))}
            <div className="flex flex-col justify-center self-stretch p-2.5 text-xs leading-none rounded border-solid shadow-sm bg-slate-900 border-[0.6px] border-[color:var(--Neutral-Colors-600,#0B1739)]">
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center self-stretch my-auto">
                  <div className="flex shrink-0 self-stretch my-auto w-2.5 h-2.5" />
                  <div className="self-stretch my-auto text-white">
                    {dateRange}
                  </div>
                </div>
                <div className="flex shrink-0 self-stretch my-auto w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <ReactECharts
            option={options}
            style={{ height: `${chartHeight}px`, width: "100%" }}
            opts={{
              renderer: "canvas",
              devicePixelRatio: window.devicePixelRatio,
              width: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};
