import React from "react";
import { View } from "@/types/types";

interface RangeButtonsProps {
  currentView: View;
  onViewChange: (view: View) => void;
  buttonText: { allYears: string; months: string };
}

const RangeButtons = ({
  currentView,
  onViewChange,
  buttonText,
}: RangeButtonsProps) => (
  <div className="flex md:mt-2 md:mr-4 md:flex-col justify-center text-[13px] mb-4">
    <button
      onClick={() => onViewChange(View.Years)}
      className={`px-4 py-2 min-w-max rounded-lg text-blue-500 ${
        currentView === View.Years && "font-[600] text-[14px]"
      }`}
    >
      {buttonText.allYears}
    </button>
    <button
      onClick={() => onViewChange(View.Months)}
      className={`px-4 py-2 rounded-lg text-blue-500 ${
        currentView === View.Months && "font-[600] text-[14px]"
      }`}
    >
      {buttonText.months}
    </button>
  </div>
);

export default RangeButtons;
