import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Image from "next/image";

function Register() {
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
    ConfirmPassword: yup
      .string()
      .required("تایید رمز عبور الزامی است")
      .oneOf([yup.ref("password")], " با رمز عبور وارد شده مطابقت ندارد"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <div>
      <h2>بوت کمپ بوتواستارت</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Image
            src="/images/Union.png"
            alt="لوگوی بوتواستارت"
            width={80}
            height={85}
          />
          <p>فرم ثبت نام </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="نام کاربری "
            {...register("username")}
            autoComplete="username"
          />
          <p>{errors.username?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="رمز عبور "
            {...register("password")}
            autoComplete="new-password"
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("ConfirmPassword")}
            autoComplete="new-password"
          />
          <p>{errors.ConfirmPassword?.message}</p>
        </div>
        <button type="submit"> ثبت نام </button>
        <Link href="/">حساب کاربری دارید ؟</Link>
      </form>
    </div>
  );
}

export default Register;
