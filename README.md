# Next.js Project

# DateRangeSlider

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Описание

DateRangeSlider - это компонент слайдера для выбора диапазона дат. Он позволяет пользователям выбирать даты в пределах заданного диапазона и отображает их в виде слайдера. Компонент поддерживает два режима отображения: по годам и по месяцам.

Компонент принимает следующие свойства:

    minDate (Date): Минимальная дата для диапазона.
    maxDate (Date): Максимальная дата для диапазона.
    selectedStartDate (Date | null): Начальная дата выбранного диапазона.
    selectedEndDate (Date | null): Конечная дата выбранного диапазона.
    onDateChange (function): Функция обратного вызова, которая вызывается при изменении диапазона дат. Принимает два параметра: startDate и endDate.

## Инструкция по запуску

1. **Установить зависимости**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install

   ```

2. **Запустить приложение**

   ````npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev```


   открыть http://localhost:3000 в браузере.

   ````

3. **Редактирование**

   Вы можете начать редактирование страницы, изменив app/page.tsx. Страница автоматически обновляется по мере редактирования файла.
