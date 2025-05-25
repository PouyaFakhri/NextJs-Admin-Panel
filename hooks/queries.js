import api from "../services/config";
import { useQuery, useMutation } from "@tanstack/react-query";

export const UseRegisterUser = () => {
  const registerUser = (formData) => {
    return api.post("/auth/register", formData);
  };
  return useMutation({
    mutationKey: ["userRegister"],
    mutationFn: registerUser,
  });
};

export const UseLoginUser = () => {
  const userLogin = (logindata) => {
    return api.post("/auth/login", logindata);
  };
  return useMutation({
    mutationKey: ["userLogin"],
    mutationFn: userLogin,
  });
};

export const UseGetProducts = ({ page = 1, limit = 10, name = "" }) => {
  const getProducts = () => {
    return api.get(
      `products?page=${page}&limit=${limit}&name=${encodeURIComponent(name)}`
    );
  };
  return useQuery({
    queryKey: ["getProducts", name, limit,page],
    queryFn: getProducts,
    keepPreviousData: true
  });
};
