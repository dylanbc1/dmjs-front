import axios, { AxiosInstance } from "axios";

export class AuthApi {
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

  login = async(email:string, password:string) =>{
    try{
        const res = await this.instance
            .post('/auth/login',{
                email: email,
                password: password
            })
        console.log(res.data)
        return res.data
    }catch(error){
        throw error
    }
  }

  forgot = async(email:string) =>{
    try{
      const res = await this.instance
        .post('/auth/forgot',{
          email
        })
    }catch(err){
      throw err;
    }
  }

  changePassword = async(id:string, password:string) =>{
    try{
      const res = await this.instance
        .post(`/auth/change/${id}`,{
          password
        })

      return res
    }catch(err){
      throw err
    }
  }

}