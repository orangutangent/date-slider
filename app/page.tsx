"use client";
import DateRangeSlider from "@/components/DateRangeSlider";
import { View } from "@/types/types";

export default function Home() {
  return (
    <div className="bg-gray-200 w-full min-h-screen space-y-4 p-4 gap-2">
      <DateRangeSlider
        minDate={new Date(2022, 8)}
        maxDate={new Date(2024, 2)}
        selectedStartDate={new Date(2022, 11)}
        selectedEndDate={new Date(2023, 9)}
        onDateChange={(startDate, endDate) => {
          console.log("Start date:", startDate);
          console.log("End date:", endDate);
        }}
      />
      <DateRangeSlider
        minDate={new Date(2012, 10)}
        maxDate={new Date(2063, 5)}
        selectedStartDate={new Date(2022, 11)}
        selectedEndDate={new Date(2043, 9)}
        baseView={View.Years}
        onDateChange={(startDate, endDate) => {
          console.log("Start date:", startDate);
          console.log("End date:", endDate);
        }}
      />
    </div>
  );
}
