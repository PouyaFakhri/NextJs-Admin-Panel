import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Register.module.css";
import FormValidator from "../utils/FormValidator";
import { UseRegisterUser } from "../hooks/queries";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter()
  const { mutate,error } = UseRegisterUser();

  const onSubmit = (data) => {
    const { ConfirmPassword, ...finalData } = data;
    console.log(finalData);
    mutate(finalData, {
      onSuccess: () => {
        toast.success("ثبت نام با موفقیت انجام شد");
        router.replace('/')
      },
      onError: () => {
        error?.response?.data?.message === "User already exists"
          ? toast.error("این نام کاربری قبلاً ثبت شده است ")
          : toast.error("خطایی رخ داده است ، لطفاً دوباره تلاش کنید ");
      },
    });
  };

  const schema = FormValidator();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
          <p className={styles.formTitle}>فرم ثبت نام </p>
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
            autoComplete="new-password"
          />
          <p className={styles.error}>{errors.password?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("ConfirmPassword")}
            autoComplete="new-password"
          />
          <p className={styles.error}>{errors.ConfirmPassword?.message}</p>
        </div>
        <button type="submit"> ثبت نام </button>
        <Link href="/" className={styles.link}>
          حساب کاربری دارید ؟
        </Link>
      </form>
    </div>
  );
}

export default Register;
