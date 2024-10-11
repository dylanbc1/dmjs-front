import { Order } from "@/interfaces/order";

interface OrderHistoryProps {
  order: Order;
}

const calculateEstimatedDeliveryDate = (orderDate: Date) => {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 5);
  return date.toISOString();
};

const determineCurrentStatusIndex = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 1; // Hasta 'Pago Aceptado'
    case 'SENDED':
      return 5; // Hasta 'Productos Enviados'
    case 'RECEIVED':
      return 6; // Hasta 'Entrega Estimada'
    case 'CANCELLED':
      return 0; // Solo 'Orden Realizada'
    default:
      return 0;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const OrderHistory = ({ order }: OrderHistoryProps) => {
  const orderDate = new Date(order.date); 
  const estimatedDeliveryDate = calculateEstimatedDeliveryDate(orderDate);

  const orderHistory = [
    { status: 'Orden Realizada', date: orderDate.toISOString(), description: 'Orden Realizada' },
    { status: 'Pago Aceptado', date: orderDate.toISOString(), description: 'Pago Aceptado' },
    { status: 'Productos entregados a la empresa de envio', date: orderDate.toISOString(), description: 'Productos entregados a la empresa de envio' },
    { status: 'Productos en el Almacen de Envio', date: orderDate.toISOString(), description: 'Productos en el Almacen de Envio' },
    { status: 'Productos en Camino', date: orderDate.toISOString(), description: 'Productos en Camino' },
    { status: 'Productos Enviados', date: orderDate.toISOString(), description: 'Productos Enviados' },
    { status: 'Entrega Estimada', date: estimatedDeliveryDate, description: 'Entrega Estimada' },
  ];

  const currentStatusIndex = determineCurrentStatusIndex(order.status);

  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 ">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Historial de Orden</h3>
      <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
        {orderHistory.map((item, index) => (
          <li key={index} className={`mb-10 ms-6 ${index <= currentStatusIndex ? 'text-primary-700 dark:text-primary-500' : ''}`}>
            <OrderStatusIcon completed={index <= currentStatusIndex} />
            <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">{formatDate(item.date)}</h4>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

const OrderStatusIcon = ({ completed }: { completed: boolean }) => (
  <span className={`absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-800 ${completed ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
    {completed ? (
      <svg className="h-4 w-4 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
      </svg>
    ) : (
      <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
      </svg>
    )}
  </span>
);
