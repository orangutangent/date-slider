"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import {
  format,
  getYear,
  getMonth,
  addMonths,
  differenceInMonths,
} from "date-fns";
import { ru } from "date-fns/locale";

interface DateRangeSliderProps {
  minDate: Date;
  maxDate: Date;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void;
}

enum View {
  Years = "years",
  Months = "months",
}

interface IMark {
  value: string;
  type: "normal" | "bold";
}

const DateRangeSlider = ({
  minDate,
  maxDate,
  selectedStartDate,
  selectedEndDate,
  onDateChange,
}: DateRangeSliderProps) => {
  const [view, setView] = useState<View>(View.Months);
  const [range, setRange] = useState([0, 0]);
  const [maxVisibleMarks, setMaxVisibleMarks] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const marksPerScreen = Math.floor(width / 60);
      setMaxVisibleMarks(marksPerScreen);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (view === View.Years) {
      setRange([
        selectedStartDate ? getYear(selectedStartDate) - getYear(minDate) : 0,
        selectedEndDate
          ? getYear(selectedEndDate) - getYear(minDate)
          : getYear(maxDate) - getYear(minDate),
      ]);
    } else {
      const totalMonths = differenceInMonths(maxDate, minDate);
      setRange([
        selectedStartDate ? differenceInMonths(selectedStartDate, minDate) : 0,
        selectedEndDate
          ? differenceInMonths(selectedEndDate, minDate)
          : totalMonths,
      ]);
    }
  }, [minDate, maxDate, selectedStartDate, selectedEndDate]);

  const handleRangeChange = (values: number[]) => {
    setRange(values);

    const startDate = addMonths(minDate, values[0]);
    const endDate = addMonths(minDate, values[1]);
    onDateChange?.(startDate, endDate);
  };

  const formatTooltip = (value: number): IMark => {
    if (view === View.Years) {
      return {
        value: getFullYear(value),
        type: "normal",
      };
    } else {
      const date = addMonths(minDate, value);
      if (getMonth(date) === 0) {
        return {
          value: format(date, "yyyy"),
          type: "bold",
        };
      }
      return {
        value: format(date, "LLLL", { locale: ru }).slice(0, 3),
        type: "normal",
      };
    }
  };

  const getFullMonth = (value: number) => {
    const date = format(addMonths(minDate, value), "LLLL ", {
      locale: ru,
    });
    return date[0].toUpperCase() + date.slice(1);
  };

  const getFullYear = (value: number) => {
    return format(addMonths(minDate, value), "yyyy", {
      locale: ru,
    });
  };

  const getMaxRange = () => {
    const totalMonths = differenceInMonths(maxDate, minDate);
    return totalMonths;
  };

  const getMarks = () => {
    const marks = [];
    const totalSteps = getMaxRange();
    const step = Math.ceil(totalSteps / maxVisibleMarks);

    for (let i = 0; i <= totalSteps; i++) {
      const date = addMonths(minDate, i);
      const isYearStart = getMonth(date) === 0;
      if (view === View.Months) {
        if (isYearStart) {
          marks.push({
            value: format(date, "yyyy"),
            type: "bold",
          });
        } else if (i % step === 0 || isYearStart) {
          marks.push(formatTooltip(i));
        } else {
          marks.push({ value: "", type: "normal" });
        }
      } else if (view === View.Years) {
        if (isYearStart) marks.push(formatTooltip(i));
        else marks.push({ value: "", type: "normal" });
      }
    }
    return marks;
  };

  return (
    <div className="w-full p-8  h-min  relative flex flex-col md:flex-row">
      <div className="flex md:mt-2 md:mr-4 md:flex-col justify-center  md:justify-center   text-[13px]  mb-4">
        <button
          onClick={() => setView(View.Years)}
          className={`px-4 py-2 min-w-max rounded-lg text-blue-500 ${
            view === View.Years && "font-[600] text-[14px]"
          }`}
        >
          Все года
        </button>
        <button
          onClick={() => setView(View.Months)}
          className={`px-4 py-2 rounded-lg text-blue-500 ${
            view === View.Months && "font-[600] text-[14px]"
          }`}
        >
          Месяца
        </button>
      </div>
      <div className="w-full">
        <Slider
          className="w-full mt-12  h-2 bg-gray-300 rounded-lg"
          value={range}
          onChange={handleRangeChange}
          min={0}
          max={getMaxRange()}
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
                    {getFullMonth(state.valueNow)}
                  </p>
                  <p className="text-blue-700">{getFullYear(state.valueNow)}</p>
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
          {getMarks().map((mark, index, arr) => (
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
                left: `${(index / getMaxRange()) * 100}%`,
                transform: "translateX(-50%)",
              }}
            >
              {mark.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateRangeSlider;
