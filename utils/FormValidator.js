import * as yup from "yup";

const FormValidator = () => {
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

  return schema
};

export default FormValidator
