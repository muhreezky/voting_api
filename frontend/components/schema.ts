import * as Yup from "yup";

const registerSchema: Yup.Schema = Yup.object().shape(
  {
    name: Yup.string(),
    email: Yup.string().email("Please Enter Valid Email Address"),
    password: Yup.string().min(6, "Minimum password length is 6"),
    confirm_pass: Yup.string().min(6, "Minimum password length is 6")
  }
);

const loginSchema: Yup.Schema = Yup.object().shape({
  email: Yup.string().email("Please Enter Valid Email Address"),
  password: Yup.string().min(6, "Minimum password length is 6")
});

export { 
  registerSchema,
  loginSchema
};