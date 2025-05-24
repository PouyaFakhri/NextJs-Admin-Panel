import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/LoginPage.module.css";
import FormValidator from "../utils/FormValidator";

function LoginPage() {
  const schema = FormValidator();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    console.log(data);
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
