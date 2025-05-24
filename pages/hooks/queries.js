import api from "../../services/config.js"
import { useQueries , useMutation } from "@tanstack/react-query"

export const UseRegisterUser = () => {
    const registerUser = (formData) => {
        return api.post("/auth/register" , formData)
    }
    return useMutation({ 
        mutationKey : ["userRegister"] ,
        mutationFn : registerUser 
    })
}

export const UseLoginUser = () => {
    const userLogin = (logindata) => {
      return api.post("/auth/login" , logindata)
    }
    return useMutation({
        mutationKey : ["userLogin"] ,
        mutationFn : userLogin
    })
}