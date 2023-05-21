'use client';

import { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";
import {Toaster, toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export const Context = createContext({user:{}});

export const ContextProvider = ({children})=>{
    const [user, setUser] = useState({});

    useEffect(()=>{
        fetch("api/auth/me")
        .then((res)=>res.json())
        .then((data) => {
            if(data.success) setUser(data.user);
        }, []);
    });


    return <Context.Provider value={{
        user, setUser
    }}>
        {children}
        <Toaster />
    </Context.Provider>

}

export const LogoutBtn = ()=>{

    const { user, setUser } = useContext(Context);
    const logoutHandler = async() => {

        try{
            const res = await fetch("/api/auth/logout");
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            setUser({});                   
            toast.success(data.message);
        }catch(error){
            return toast.error(error);
        }
        
    }

    return(
    <>
        {
            user._id?(<button className="btn" onClick={logoutHandler}>Logout</button>)
            :(<Link href={"/login"}>Login</Link>)
        }
        
    </>)
}

export const TodoBtn = ({id, completed})=>{
    const router = useRouter();
    const DeleteHandler = async(id)=>{
        try {
            const res = await fetch(`/api/task/${id}`, {
                method:"DELETE"
            });
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error);
        }
    }
    const UpdateHandler = async(id)=>{
        try {
            const res = await fetch(`/api/task/${id}`, {
                method:"PUT"
            });
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error);
        }
    }

    return <>
        <input type="checkbox" checked={completed} 
        onClick={()=> UpdateHandler(id)} />
        <button className="btn" onClick={() => DeleteHandler(id)}>Delete</button>
    </>
}