import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { subDays, format } from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




type Period = {
  from: string | Date | undefined
  to: string | Date | undefined
}

export function formatDateRange(period?: Period){
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  if(!period?.from){
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`
  }

  if(period.to){
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`
  }

  return format(period.from, "LLL dd, y")
}


export function formatCurrency(amount: number){
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
export function calculatePercentageChange(
  current: number,
  previous: number,
){
  if (previous === 0){
    return previous === current ? 0 : 100
  }

  return ((current - previous) / previous) * 100
}


export function formatPercentage(
  value: number,
  options: {addPrefix?: boolean} = {
    addPrefix: false
  
  },
){
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value/100)
 
  if (options.addPrefix && value > 0){
    return `+${result}`
  }

  return result
  
}