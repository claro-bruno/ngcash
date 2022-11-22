import { MONTHS } from './constants'

export function getLastDayOfMonth(month: string) {
  const findMonthIndex = MONTHS.findIndex((item) => item === month)
  const lastDayOfMonth = new Date(2020, findMonthIndex + 1, 0).getDate()
  return lastDayOfMonth
}
function formatDate(date: Date): string {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export function createObjectDaysByMonth(
  month: string,
  year: number = new Date().getFullYear(),
  options?: { days?: string[]; hours?: string },
) {
  const getMonthNumberByName = MONTHS.indexOf(month)
  const getNumberOfDaysInMonth = new Date(
    year,
    getMonthNumberByName,
    0,
  ).getDate()

  const days = new Array(getNumberOfDaysInMonth).fill(0)

  const objectDays = days.reduce((acc, _, index) => {
    const day = index + 1
    const date = new Date(year, getMonthNumberByName, day)
    const weekDayName = new Date(
      year,
      getMonthNumberByName,
      day,
    ).toLocaleDateString('en-US', { weekday: 'long' })

    const dateFormatted = formatDate(date)
    /* console.log(options?.days, weekDayName) */
    return (acc = [
      ...acc,
      {
        day: dateFormatted,
        weekDay: weekDayName,
        workedHours: 0,
      },
    ])
  }, [])

  return objectDays
}
