import Head from "next/head";
import Button from "../../components/Button";
import Menu from "../../components/Menu";
import Input from "../../components/Input"
import { useFormik } from "formik";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Register() {
  const [loginToken, setLoginToken] = useLocalStorage("loginToken");
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_pass: ""
    },
    onSubmit: (values) => {
      const { name, email, password, confirm_pass } = values;
      if (password === confirm_pass) {
        axios.post("http://localhost:8000/auth/register", {
          name,
          email,
          password
        })
          .then(res => router.push("/login"))
          .catch(err => console.log(err));
      } else {
        MySwal.fire({
          title: <b>Confirm</b>,
          html: <h3>Confirm your password first</h3>
        })
      }
    }
  });

  return (
    <>
      <Menu />
      <div className="p-4 flex flex-col justify-center items-center mt-6">
        <h1 className="text-3xl font-bold">
          Create New Account
        </h1><br />
        <form className="w-full p-3" onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
          <label htmlFor="name">
            Name
          </label>
          <Input id="name" name="name" type="text" className="w-full mb-4" placeholder="Enter your name" />

          <label htmlFor="email">
            E-mail
          </label>
          <Input id="email" name="email" type="text" className="w-full mb-4" placeholder="Enter your e-mail" />

          <label htmlFor="password">
            Password
          </label>
          <Input id="password" name="password" type="password" className="w-full mb-4" placeholder="Enter password" />

          <label htmlFor="confirm_pass">
            Confirm Password
          </label>
          <Input id="confirm_pass" name="confirm_pass" type="password" className="w-full mb-4" placeholder="Confirm your password" />

          <Button style="primary" className="w-full mt-8" text="Submit" type="submit" />
        </form>
      </div>
    </>
  )
}