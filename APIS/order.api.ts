import axios, { AxiosInstance } from "axios";


export class OrderApi {
    protected readonly instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
          baseURL: url,
          timeout: 30000,
          timeoutErrorMessage: "Time out!",
          headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins
          },
          
        });
    }


    createOrder = async (status:string, date:Date, customer_id:string,payment_method_id:string, address_id:string ) => {

        try{
            const res = await this.instance.
                post(`/orders`,{
                    status:status,
                    date:date,
                    customer_id:customer_id,
                    payment_method_id:payment_method_id,

                    address_id,

                })
            
            return res.data;
        }catch(error){
            throw error
        }
    }   

    findOrders = async () =>{
        try{
            const res = await this.instance
                .get(`/orders`)
            
            return res.data;
        }catch(error){
            throw error
        }
    }

    findOneOrders = async (id:string) => {
        try{
            const res = await this.instance
                .get(`/orders/${id}`)
            
            return res.data;
        }catch(err){
            throw err;
        }
    }

    updateOrders = async(id:string, status:string, date:Date, customer_id:string,payment_method_id:string) =>{
        try{    
            const res = await this.instance
                .patch(`/orders/${id}`,{
                    status:status,
                    date,
                    customer_id,
                    payment_method_id
                })
        }catch(error){
            throw error
        }
    }

    deleteOrder = async(id:string) =>{
        try{
            const res = await this.instance
                .delete(`/orders/${id}`)
        }catch(error){
            throw error;
        }
    }

    createOrderDetail = async(quantity: number, order_id:string, product_id:string) =>{
        try{
            const res = await this.instance
                .post(`/orderDetails`,
                    {
                        quantity,
                        order_id,
                        product_id
                    }
                )
            
            return res.data;
        }catch(error){
            throw error;
        }
    }

    findOrderDetails = async() =>{
        try{
            const res = await this.instance
                .get(`/orderDetails`)
            
            return res.data;
        }catch(error){
            throw error
        }
    }

    findOneOrderDetail = async(id:string) =>{
        try{
            const res = await this.instance
                .get(`/orderDetails/${id}`)
            
            return res.data;
        }catch(error){
            throw error
        }
    }

    updateOrderDetail = async (id:string, quantity: number, order_id:string, product_id:string) => {
        try{
            const res= await this.instance
                .patch(`/orderDetails/${id}`,{
                    quantity,
                    order_id,
                    product_id
                })
        }catch(error){
            throw error;
        }
    }

    deleteOrderDetail = async(id:string)=>{
        try{
            const res = await this.instance
                .delete(`/orderDetails/${id}`)
        }catch(err){
            throw err
        }
    }

    findSellerOrders = async (id:string) =>{
        try{
            const res = await this.instance
                .get(`/orders/seller/${id}`)
            
            return res.data;
        }catch(error){
            throw error
        }
    }
}