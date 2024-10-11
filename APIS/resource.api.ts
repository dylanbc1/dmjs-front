import axios, { AxiosInstance } from "axios";


export class ResourceApi {
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

    createComment= async (description:string, is_question: boolean, user_id:string, product_id:string, review_id:string)=>{
        try{ 
            const res = await this.instance
                .post(`/comments`,{
                    description:description,
                    is_question: is_question,
                    user_id: user_id,
                    product_id: product_id,
                    review_id: review_id
                })
            return res.data
        }catch(error){
            throw error;
        }
    }

    updateComment = async (id:string, description:string, is_question: boolean, user_id:string, product_id:string, review_id:string) =>{
        try{    
            const res = await this.instance
                .patch(`/comments/${id}`,{
                    description: description,
                    is_question: is_question,
                    user_id: user_id,
                    product_id: product_id,
                    review_id: review_id
                })
            return res.data;
        }catch(error){
            throw error;
        }
    }

    deleteComment = async (id:string) =>{
        const res = await this.instance
            .delete(`/comments/${id}`)
    }

    answerQuestion = async(comment_id:string, product_id:string, user_id:string, comment:string)=>{
        try{
            const res = await this.instance
            .post(`/comments/${comment_id}/${product_id}/${user_id}`,{
                comment
            })  

            return res.data
        }catch(err){
            throw err
        }
        
    }

    createReview = async (score: number, comment:string | null, user_id:string, product_id: string ) =>{
        try{
            if(comment){
                const res = await this.instance
                .post(`/reviews`, {
                    score: score,
                    comment,
                    user_id:user_id,
                    product_id: product_id
                })
                return res.data;
            }else{
                const res = await this.instance
                .post(`/reviews`, {
                    score: score,
                    user_id:user_id,
                    product_id: product_id
                })
                return res.data;
            }
           
        }catch(error){
            throw error;
        }
    }

    updateReview = async (id:string, score:number, user_id:string, product_id:string) =>{
        try{
            const res = await this.instance
            .patch(`/reviews/${id}`,{
                score: score,
                user_id: user_id,
                product_id: product_id
            })
            return res.data;
        }catch(error){
            throw error;
        }
    }   

    deleteReview = async (id:string) =>{
        try{    
            const res = await this.instance
                .delete(`/reviews/${id}`)
        }catch(error){
            throw error;
        }
    }

    


}