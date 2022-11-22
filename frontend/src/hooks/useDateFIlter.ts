import { useState } from 'react'

type HandleFiltersParams = {
  month?: string
  year?: number
  client: {
    name: string
  }
  contractor?: { last_name: string; first_name: string }
  quarter?: { month: string; year: number }[]
  name?: string
}

function toMonthName(monthNumber: number) {
  const date = new Date()
  date.setMonth(monthNumber)

  return date.toLocaleString('en-US', {
    month: 'long',
  })
}

export function useDateFilter() {
  const [filterContractor, setFilterContractor] = useState('')
  const [filterClient, setFilterClient] = useState('')
  const [monthName, setMonthName] = useState(
    toMonthName(new Date(Date.now()).getMonth()),
  )
  const [yearName, setYearName] = useState(new Date().getFullYear().toString())

  function handleFilters(obj: HandleFiltersParams) {
    const filterByContractor = obj.contractor
      ? `${obj.contractor.first_name} ${obj.contractor.last_name}`
          .toLowerCase()
          .includes(filterContractor.toLowerCase())
      : obj.name!.toLowerCase().includes(filterContractor.toLowerCase())

    const filterByClient = obj.contractor
      ? `${obj.client.name}`.toLowerCase().includes(filterClient.toLowerCase())
      : obj.name!.toLowerCase().includes(filterClient.toLowerCase())

    const filterByMonth =
      obj.month?.toLowerCase().includes(monthName.toLowerCase()) ||
      (obj.quarter &&
        obj.quarter[0]?.month.toLowerCase().includes(monthName.toLowerCase()))

    const filterByYear =
      obj.year ||
      (obj.quarter &&
        obj.quarter[0].year.toString().includes(yearName.toLowerCase()))

    return filterByContractor && filterByMonth && filterByYear && filterByClient
  }

  return {
    handleFilters,
    setFilterContractor,
    setFilterClient,
    setMonthName,
    setYearName,
    monthName,
    yearName,
    filterContractor,
    filterClient,
  }
}
