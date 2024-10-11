import axios, { AxiosInstance } from "axios";


export class AddresApi {
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

    createAddress = async (street:string, avenue:string, house_number:string,user_id:string, city_id:string ) =>{
        try{
            const res = await this.instance
                .post(`/address`,{
                    street,
                    avenue,
                    house_number,
                    user_id,
                    city_id
                })
            
            return res.data;
        }catch(error){
            throw error
        }
    }

    findOneAddress = async (id:string) =>{
        try{
            const res = await this.instance
                .get(`/address/${id}`)

            return res.data
        }catch(error){
            throw error
        }
    }

    updateAddress = async (id:string, street:string, avenue:string, house_number:string,user_id:string, city_id:string) => {
        try{
            const res = await this.instance
                .patch(`/address/${id}`,{
                    street,
                    avenue,
                    house_number,
                    user_id,
                    city_id
                })
            
            return res.data
        }catch(error){
            throw error;
        }
    }

    deleteAddress = async(id:string) =>{
        try{
            const res = await this.instance
                .delete(`/address/${id}`)

            return res.data
        }catch(error){
            throw error;
        }
    }

    findDepartments = async() =>{
        try{
            const res = await this.instance
                .get(`/department`)
            
            return res.data
        }catch(error){
            throw error;
        }
    }

    findOneDepartment = async(id:string)=>{
        try{
            const res = await this.instance
                .get(`/department/${id}`)
            
            return res.data
        }catch(error){
            throw error;
        }
    }

    findCity = async(id:string) => {
        try{
            const res = await this.instance
                .get(`/city`)

            return res.data;
        }catch(error){
            throw error
        }
    }

    findOneCity = async(id:string) =>{
        try{
            const res = await this.instance
                .get(`/city/${id}`)

            return res.data;
        }catch(err){
            throw err
        }
    }


}