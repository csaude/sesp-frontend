import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '@/contexts/AuthContext';

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);
    let proxyURL = 'http://localhost:8080/';

    const api = axios.create({
        baseURL : `${proxyURL}http://localhost/openmrs/ws/rest/v1`,
        // headers: {
        //     Authorization: `Bearer ${cookies['@nextauth.token']}`
        // }
    })

    api.defaults.headers.common["X-Requested-With"];

    api.interceptors.response.use(response => {
        return response;
    },(error: AxiosError) => { 
              //@ts-ignore
        if(error.response.status === 401){
            if(typeof window !== undefined){
                signOut();
            }else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error);
    })

    return api;
}