'use client'

import { formatDateRange } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { FaArrowTrendUp, FaAddressBook, FaArrowUpRightDots } from "react-icons/fa6"

import { DataCard } from "./data-card"
import { DataCardRegistrations } from "./data-card-registrations"

interface DataGridProps {
    currentPeriod: number
    incomeChange: number
    orderDays: []
    registerChange: number
    registerPeriod: number
    orders: number
    ordersPercentage: number
}

export const DataGrid = ({currentPeriod, incomeChange, orderDays, registerChange, registerPeriod, orders, ordersPercentage}:DataGridProps) => {


    const params = useSearchParams()
    const to = params.get('to') || ''
    const from = params.get('from') || ''

    const dateRangeLabel = formatDateRange({to, from})
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard
            title="Ingresos"
            value={currentPeriod}
            icon={FaArrowTrendUp}
            percentage={incomeChange}
            variant='default'
            dateRange={dateRangeLabel} />
             <DataCardRegistrations
             title="Usuarios Registrados"
             value={registerPeriod}
             icon={FaAddressBook}
             percentage={registerChange}
             variant='default'
             dateRange={dateRangeLabel} /> 
             <DataCardRegistrations
             title="Órdenes Realizadas"
             value={orders}
             icon={FaArrowUpRightDots}
             percentage={ordersPercentage}
             variant='default'
             dateRange={dateRangeLabel} /> 
        </div>
    )
}