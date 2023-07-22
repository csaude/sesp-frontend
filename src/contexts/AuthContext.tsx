'use client'

import { createContext, ReactNode, useState } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import { useRouter } from "next/navigation";
import { api } from '../services/apiClient';

import {toast } from 'react-toastify';  

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
  }

  type UserProps = {
    id: string;
    name: string;
    username: string;
  }
  
  type SignInProps = {
    username: string;
    password: string;
  }

  type AuthProviderProps = {
    children : ReactNode;
  }

  export const AuthContext = createContext({} as AuthContextData)

  export function signOut(){
    const router = useRouter();
    try{
      destroyCookie(undefined, '@nextauth.token')
      router.push('/')
    }catch{
      console.log('erro ao deslogar')
    }
  }

  export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;
    const router = useRouter();
  

    async function signIn({username, password}: SignInProps){
      try{
        const response = await api.get('/session', {
          auth: {
            username,
            password
          },
        },)
         console.log(response.data);
  
        // const { id, name, token } = response.data;
  
        // setCookie(undefined, '@nextauth.token', token, {
        //   maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        //   path: "/" // Quais caminhos terao acesso ao cookie
        // })
  
        // setUser({
        //   id,
        //   name,
        //   username,
        // })
  
        // //Passar para proximas requisiçoes o nosso token
        // api.defaults.headers['Authorization'] = `Bearer ${token}`
  
        toast.success('Logado com sucesso!');
  
        //Redirecionar o user para /dashboard
        router.push('/dashboard');
  
  
      }catch(err){
        toast.error("Erro ao logar no sistema!")
        console.log("ERRO AO ACESSAR ", err)
      }
    }

    return(
      //@ts-ignore
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
          {children}
        </AuthContext.Provider>
      )
  }