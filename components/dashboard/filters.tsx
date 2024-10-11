import { DateFilter } from "./date-filter"

export const Filters = () => {
    return (
        <div className="flex flex-col lg:flex-col items-center gap-y-2 lg:gap-y-0 lg:gap-x-2 mr-auto">
            <DateFilter />
        </div>
    )
}