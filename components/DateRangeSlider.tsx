"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import {
  format,
  getYear,
  getMonth,
  addMonths,
  differenceInMonths,
  min,
} from "date-fns";
import { ru } from "date-fns/locale";

import { BUTTON_TEXT } from "@/utils/constants";
import { View } from "@/types/types";
import RangeButtons from "./RangeButtons";
import { getMaxRange, getFullYear, getFullMonth } from "@/utils/dateUtils";
import { getMarks } from "@/utils/getMarks";
import { useWindowResize } from "@/hooks/useWindowResize";

interface DateRangeSliderProps {
  minDate: Date;
  maxDate: Date;
  selectedStartDate?: Date | null;
  selectedEndDate?: Date | null;
  baseView?: View;
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const DateRangeSlider = ({
  minDate,
  maxDate,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
  baseView = View.Months,
}: DateRangeSliderProps) => {
  const [view, setView] = useState<View>(baseView);
  const [range, setRange] = useState([0, 0]);
  const [maxVisibleMarks, setMaxVisibleMarks] = useState(10);

  const handleResize = (width: number) => {
    const WIDTH_PER_MARK = 100;
    const marksPerScreen = Math.floor(width / WIDTH_PER_MARK);
    setMaxVisibleMarks(marksPerScreen);
  };

  useWindowResize(handleResize);

  useEffect(() => {
    const totalMonths = differenceInMonths(maxDate, minDate);
    setRange([
      selectedStartDate ? differenceInMonths(selectedStartDate, minDate) : 0,
      selectedEndDate
        ? differenceInMonths(selectedEndDate, minDate)
        : totalMonths,
    ]);
  }, [minDate, maxDate, selectedStartDate, selectedEndDate]);

  const handleRangeChange = (values: number[]) => {
    setRange(values);

    const startDate = addMonths(minDate, values[0]);
    const endDate = addMonths(minDate, values[1]);
    onDateChange?.(startDate, endDate);
  };

  return (
    <div className="w-full p-8  h-min  relative flex flex-col md:flex-row">
      <RangeButtons
        currentView={view}
        onViewChange={setView}
        buttonText={BUTTON_TEXT}
      />
      <div className="w-full">
        <Slider
          className="w-full mt-12  h-2 bg-gray-300 rounded-lg"
          value={range}
          onChange={handleRangeChange}
          min={0}
          max={getMaxRange(minDate, maxDate)}
          step={1}
          renderThumb={(props, state) => {
            const { key, ...othersProps } = props;
            return (
              <div
                key={key}
                {...othersProps}
                className="relative outline-none cursor-grab top-[-10px] bg-blue-500 w-6 h-6 rounded-full flex justify-center items-center"
              >
                <div className="absolute bg-white w-3 h-3 rounded-full flex justify-center items-center" />
                <div
                  className={`absolute bg-white shadow-lg  font-[600] text-sm w-min px-2 py-1 flex flex-col items-center ${
                    state.index === 0 ? "top-[-60px] " : "bottom-[-60px] "
                  } text-white p-1 rounded-md text-xs`}
                >
                  <p className="text-blue-700">
                    {getFullMonth(state.valueNow, minDate)}
                  </p>
                  <p className="text-blue-700">
                    {getFullYear(state.valueNow, minDate)}
                  </p>
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 
        ${state.index === 0 ? "bottom-[-5px]" : "top-[-5px]"}`}
                  >
                    <div
                      className={`w-0 h-0 border-l-[6px] border-r-[6px] 
          ${
            state.index === 0
              ? "border-t-[6px] border-t-white  border-l-transparent border-r-transparent"
              : "border-b-[6px] border-b-white border-l-transparent border-r-transparent"
          }`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          }}
          pearling
          minDistance={1}
          renderTrack={(props, state) => {
            const { key, ...othersProps } = props;
            return (
              <div
                key={key}
                {...othersProps}
                className={`h-2 rounded-lg ${
                  state.index === 1 ? "bg-blue-500" : "bg-gray-300 rounded-lg"
                }`}
              />
            );
          }}
        />

        <div className="relative w-full mt-2 mb-12">
          {getMarks(minDate, maxDate, view, maxVisibleMarks).map(
            (mark, index, arr) => (
              <div
                key={index}
                className={`absolute  ${
                  mark.type === "bold"
                    ? `text-sm text-gray-800 font-[600] ${
                        maxVisibleMarks <= arr.length && "top-4"
                      }`
                    : "text-xs text-gray-500"
                } `}
                style={{
                  left: `${(index / getMaxRange(minDate, maxDate)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {mark.value}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DateRangeSlider;
