import api from "../../../bootCamp/React/Admin-Panel/Front/src/services/config"
import { useQueries , useMutation } from "@tanstack/react-query"

export const UseRegisterUser = () => {
    const registerUser = (formData) => {
        return api.post("/auth/register" , formData)
    }
    return useMutation({ 
        mutationKey : ["users"] ,
        mutationFn : registerUser 
    })
}