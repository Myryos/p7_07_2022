import axios, { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import { useAuth } from "../contexts/Auth"


const useAxiosPrivate = () => {

    const refresh = useRefreshToken()

    const auth = useAuth();

    useEffect(() => {

        const reqIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const rersIntercept = axiosPrivate.interceptors.response.use(
            res => res,
            (error) => {
                const prevReq = error?.config;
                if(error?.response.status === 403 && !prevReq?.sent)
                {
                   prevReq.sent = true
                   const newAccessToken = refresh()
                   prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                   return axiosPrivate(prevReq)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(reqIntercept)
            axiosPrivate.interceptors.response.eject(rersIntercept)

        }

    }, [auth, refresh])


    return axiosPrivate

}

export default useAxiosPrivate
