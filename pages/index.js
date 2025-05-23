import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/LoginPage.module.css"

function LoginPage() {
  const PasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const schema = yup.object().shape({
    username: yup
      .string()
      .required(" نام کاربری الزامی است")
      .min(3, " حداقل 3 کاراکتر"),
    password: yup
      .string()
      .required("رمز عبور الزامی است")
      .matches(
        PasswordRegex,
        "رمز عبور باید حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک، عدد و نماد باشد"
      ),
  });
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
      <form onSubmit={handleSubmit(onSubmit)}  className={styles.formBox}>
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
        <Link href="/register" className={styles.link}>ایجاد حساب کاربری</Link>
      </form>
    </div>
  );
}

export default LoginPage;

