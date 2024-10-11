import axios, { AxiosInstance } from "axios";

export class ProductApi {
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

  totalRating = async (id:string) =>{
    try{
        const res = await this.instance
            .get(`/products/${id}/reviews`)
        console.log(res.data)
        return parseFloat(res.data)
    }catch(error){
        throw error;
    }
    }

  createProduct = async (
    product_name: string,
    description: string,
    price: number,
    quantity: number,
    photo_url: string[],
    product_category_id: string,
    seller_id: string
  ) => {
    try {
      const res = await this.instance.post(`/products`, {
        product_name,
        description,
        price,
        quantity,
        photo_url,
        product_category_id,
        seller_id,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  };

  findProducts = async () => {
    try {
      const res = await this.instance.get(`/products`);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  findOneProduct = async (id: string) => {
    try {
      const res = await this.instance.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  updateProduct = async (
    id: string,
    product_name: string,
    description: string,
    price: number,
    quantity: number,
    photo_url: string[],
    product_category_id: string,
    seller_id: string
  ) => {
    try {
      const res = await this.instance.patch(`/products/${id}`, 
        {
        product_name,
        description,
        price,
        quantity,
        photo_url,
        product_category_id,
        seller_id,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  findProductsCategory = async () => {
    try {
      const res = await this.instance.get(`/product-category`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  deleteProduct = async (id: string) => {
    try {
      const res = await this.instance.delete(`/products/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  findSellerProduct = async (seller_id: string) => {
    try {
      const res = await this.instance.get(`/products/seller/${seller_id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
}

export const productApi = new ProductApi("http://localhost:3000");
