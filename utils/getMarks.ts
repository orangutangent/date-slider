import { addMonths, getMonth, differenceInMonths } from "date-fns";
import { getFullYear, formatTooltip, getMaxRange } from "./dateUtils";
import { IMark, View } from "@/types/types";

/**
 * Генерирует метки для слайдера в зависимости от текущего представления (годы или месяцы).
 * @param minDate - минимальная дата для расчета.
 * @param maxDate - максимальная дата для расчета.
 * @param view - текущее представление (годы или месяцы).
 * @param maxVisibleMarks - максимальное количество видимых меток на экране.
 * @returns Массив IMark для отображения на слайдере.
 */

export const getMarks = (
  minDate: Date,
  maxDate: Date,
  view: View,
  maxVisibleMarks: number
): IMark[] => {
  const marks: IMark[] = [];
  const totalSteps = getMaxRange(minDate, maxDate);
  const step = Math.ceil(totalSteps / maxVisibleMarks);

  // Получаем список всех годов
  const allYears = Array.from(
    new Set(
      Array(totalSteps + 1)
        .fill(null)
        .map((_, i) => getFullYear(i, minDate))
    )
  );

  if (view === View.Months) {
    for (let i = 0; i <= totalSteps; i++) {
      const date = addMonths(minDate, i);
      const isYearStart = getMonth(date) === 0;

      if (isYearStart) {
        if (allYears.length < maxVisibleMarks) {
          marks.push({
            value: getFullYear(i, minDate),
            type: "bold",
          });
        } else if (
          allYears.indexOf(getFullYear(i, minDate)) %
            Math.floor(allYears.length / maxVisibleMarks) ===
          0
        ) {
          marks.push({
            value: getFullYear(i, minDate),
            type: "bold",
          });
        }
      } else if (i % step === 0) {
        marks.push(formatTooltip(i, minDate, view));
      } else {
        marks.push({ value: "", type: "normal" });
      }
    }
  } else if (view === View.Years) {
    const years = allYears.map(
      (year) =>
        ({
          value: year,
          type: "normal",
        } as IMark)
    );

    for (let i = 0; i < totalSteps; i++) {
      marks.push({ value: "", type: "normal" });
    }

    if (years.length < maxVisibleMarks) {
      const iter = Math.ceil(totalSteps / years.length);
      for (let i = 0; i < years.length; i++) {
        marks[i * iter] = years[i];
      }
    } else {
      for (let i = 0; i < totalSteps; i++) {
        if (i % step === 0) {
          marks[i] =
            years[
              Math.floor(years.length / maxVisibleMarks) * Math.floor(i / step)
            ];
        }
      }
    }
  }

  return marks;
};
