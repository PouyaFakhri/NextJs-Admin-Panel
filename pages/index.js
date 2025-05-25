import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/LoginPage.module.css";
import LoginFormValidator from "../utils/LoginFormValidator";
import { UseLoginUser } from "../hooks/queries";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";


function LoginPage() {
  const {setIsAuthenticated} = useContext(AuthContext)
  const router = useRouter()
  const { mutate, error } = UseLoginUser();
  const schema = LoginFormValidator();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    mutate(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          Cookies.set("token", response.token);
          setIsAuthenticated(true)
          router.replace("/dashboard")
        },
        onError: () => {
          setIsAuthenticated(false)
          error.response.data.message === "Invalid credentials"
            ? toast.error("نام کاربری یا رمز عبور اشتباه است")
            : toast.error("خطایی رخ داده است");
        },
      }
    );
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>بوت کمپ بوتواستارت</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <div className={styles.formTop}>
          <Image
            src="/images/Union.png"
            alt="لوگوی بوتواستارت"
            width={80}
            height={85}
            priority
          />
          <p>فرم ورود </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="نام کاربری "
            {...register("username")}
            autoComplete="username"
          />
          <p className={styles.error}>{errors.username?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="رمز عبور "
            {...register("password")}
            autoComplete="current-password"
          />
          <p className={styles.error}>{errors.password?.message}</p>
        </div>
        <button type="submit"> ورود </button>
        <Link href="/register" className={styles.link}>
          ایجاد حساب کاربری
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
