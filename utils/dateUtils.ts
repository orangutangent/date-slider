import { IMark, View } from "@/types/types";
import { format, addMonths, differenceInMonths, getMonth } from "date-fns";
import { ru } from "date-fns/locale";
import { LOCALE } from "./constants";

/**
 * Форматирует месяц в полном виде с заглавной буквы.
 * @param value - количество месяцев, которое нужно добавить к minDate.
 * @param minDate - минимальная дата для расчета.
 * @returns Полное название месяца с заглавной буквы.
 */
export const getFullMonth = (value: number, minDate: Date): string => {
  const date = addMonths(minDate, value);
  return (
    format(date, "LLLL", { locale: ru }).slice(0, 1).toUpperCase() +
    format(date, "LLLL", { locale: ru }).slice(1)
  );
};

/**
 * Возвращает полный год в формате YYYY.
 * @param value - количество месяцев, которое нужно добавить к minDate.
 * @param minDate - минимальная дата для расчета.
 * @returns Год в формате YYYY.
 */
export const getFullYear = (value: number, minDate: Date): string => {
  return format(addMonths(minDate, value), "yyyy", { locale: ru });
};

/**
 * Вычисляет максимальное количество месяцев между двумя датами.
 * @param minDate - начальная дата.
 * @param maxDate - конечная дата.
 * @returns Разница в месяцах.
 */
export const getMaxRange = (minDate: Date, maxDate: Date): number => {
  return differenceInMonths(maxDate, minDate);
};

/**
 *  форматирует метки для слайдера в зависимости от текущего представления (годы или месяцы).
 * @param value - количество месяцев, которое нужно добавить к minDate.
 * @param minDate - минимальная дата для расчета.
 * @param view - текущее представление (годы или месяцы).
 * @returns объект с типом метки и значением.
 * */

export const formatTooltip = (
  value: number,
  minDate: Date,
  view: View
): IMark => {
  if (view === View.Years) {
    return {
      value: getFullYear(value, minDate),
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
      value: format(date, "LLLL", { locale: LOCALE }).slice(0, 3),
      type: "normal",
    };
  }
};
