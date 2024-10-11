"use client";
import { userApi, orderApi } from "@/APIS";
import { getUsers } from "@/actions/get-users";
import { DataTable } from "@/components/data-table";
import { useState, useCallback, useEffect } from "react";
import { columns } from "./columns";
import { EditOrderSheet } from "@/components/profile/edit-order-sheet";
import { Container } from "@mui/material";

interface Props {
  params: { id: string };
}

const OrdersPage = ({ params }: Props) => {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchOrders = useCallback(async () => {
    const res = await orderApi.findSellerOrders(params.id);
    console.log(res);
    setOrders(res);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, reload]);
  const handleOrderUpdate = () => {
    setReload(!reload);
  };
  return (
    <Container maxWidth="md" className="mx-auto p-4">
      <h3 className="font-bold text-3xl">Mis ordenes</h3>

      <DataTable
        filterKey="date"
        columns={columns}
        data={orders}
        disabled={false}
      />
      <EditOrderSheet onOrderUpdate={handleOrderUpdate} />
    </Container>
  );
};

export default OrdersPage;
