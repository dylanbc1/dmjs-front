"use client"

const formatter = new Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: 'USD'
});

interface CurrencyProp {
    value?: string | number;
}

const Currency: React.FC<CurrencyProp> = ({
    value
}) => {
    return (
        <div className="cont-semibold">
            {formatter.format(Number(value))}
        </div>
    )
}

export default Currency;