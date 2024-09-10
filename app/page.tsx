"use client";
import DateRangeSlider from "@/components/DateRangeSlider";

export default function Home() {
  return (
    <div className="bg-gray-200 w-full min-h-screen p-4 flex gap-2">
      <DateRangeSlider
        minDate={new Date(2022, 10)}
        maxDate={new Date(2024, 5)}
        selectedStartDate={new Date(2022, 11)}
        selectedEndDate={new Date(2023, 9)}
        onDateChange={(startDate, endDate) => {
          console.log("Start date:", startDate);
          console.log("End date:", endDate);
        }}
      />
    </div>
  );
}
