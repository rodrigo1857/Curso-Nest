import axios from "axios";

export  interface HttpAdapter {
    get<T>(url:string): Promise<T>;
}

export class PokeApiFetchAdapter  implements HttpAdapter {
    async get<T>(url:string): Promise<T> {
        const response = await fetch(url);
        const data:T = await response.json();
        console.log("con fetch");
        return data;
    }
}



export class PokeApiAdapter implements HttpAdapter {
    private readonly axios = axios;
    async get<T>(url:string): Promise<T>{
        const{data} = await this.axios.get<T>(url);
        console.log("con axios");
        return data;
    }

    async post(url:string, data:any){
        const response = await this.axios.post(url, data);
        return response.data;
    }

    async put(url:string, data:any){
        const response = await this.axios.put(url, data);
        return response.data;
    }

    async delete(url:string){
        const response = await this.axios.delete(url);
        return response.data;
    }
}