'use client'

import { Chart } from "./chart"
import { SpendingPie } from "./spending-pie"



interface DataGridProps {
    currentPeriod: number
    incomeChange: number
    orderDays: []
    topCategories: []
}


export const DataCharts = ({currentPeriod, incomeChange, orderDays, topCategories}:DataGridProps) => {
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={orderDays}/>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={topCategories}/>
            </div>
        </div>
    )
}