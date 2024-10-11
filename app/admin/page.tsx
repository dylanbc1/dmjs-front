import { getIncome } from "@/actions/income-report";
import { getOrders } from "@/actions/orders-report";
import { getRegister } from "@/actions/register-report";
import { DataCharts } from "@/components/dashboard/data-charts";
import { DataGrid } from "@/components/dashboard/data-grid";
import { Suspense } from "react";
const AdminPage = async () => {
    let data;
    let register;
    let orders
    try {
        data = await getIncome();
        register = await getRegister();
        orders = await getOrders();
    } catch (error) {
        console.error('Failed to fetch income data:', error);
        data = {
            currentPeriod: { income: 0 },
            incomeChange: 0,
            ordersDays: [],
            topCategories: []
        };
        register = {
            totalRegistrations : 0,
            percentageChange : 1
        };
        orders = {
            totalOrders : 0,
            ordersChange : 1
        }
    }
    const currentPeriodIncome = data?.currentPeriod?.income ?? 0;
    const incomeChange = data?.incomeChange ?? 0;
    const orderDays = data?.ordersDays ?? [];
    const topCategories = data?.topCategories ?? [];
    const totalRegistrations = register?.totalRegistrations ?? 0;
    const percentageChange = register?.percentageChange ?? 0;
    const totalOrders = orders?.totalOrders ?? 0;
    const ordersChange = orders?.ordersChange ?? 0;
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Suspense fallback={<div>Loading...</div>}>
                <DataGrid
                currentPeriod={currentPeriodIncome}
                incomeChange={incomeChange}
                orderDays={orderDays}
                registerChange={percentageChange}
                registerPeriod={totalRegistrations}
                orders={totalOrders}
                ordersPercentage={ordersChange} />
             </Suspense>
            <DataCharts
             currentPeriod={currentPeriodIncome}
             incomeChange={incomeChange}
             orderDays={orderDays}
             topCategories={topCategories}/>
        </div> 
    )
}

export default AdminPage;