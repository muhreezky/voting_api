import Head from "next/head";
import Link from "next/link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import Menu from "../../components/Menu";
import { useFormik } from "formik";
import axios from "axios";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { loginSchema } from "../../components/schema";
import { useEffect } from "react";

export default function Login(){
    const [auth, setAuth] = useLocalStorage("loginToken");
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: ({ email, password }) => {
            axios.post("http://localhost:8000/auth/login", {
                email,
                password
            })
                .then(res => {
                    setAuth(res.data.token);
                    // router.push("/");
                })
                // .then(() => router.push("/"))
                .catch(err => console.error(err));
        }
    });

    useEffect(() => {
        auth && router.push("/");
    }, [auth])
    return (
        <>
            <Menu />
            <div className="flex items-center justify-center">
                <Head>
                    <title>Login</title>
                </Head>
                <div className="w-1/3">
                    <div className="text-4xl mb-3">
                        <strong>Login dahulu untuk Mulai Vote</strong>
                    </div>
                    <form className="w-full" onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                        <Input type="text" placeholder="Enter Email" name="email" id="email" className="mb-4 w-full" />
                        <Input type="password" placeholder="Enter Password" name="password" id="password" className="mb-4 w-full" />
                        <button className="inline-flex justify-between px-7 items-center gap-3 bg-white py-2 w-full border-2 border-black font-medium hover:bg-black mb-3 hover:text-white" type="submit">
                            Login <FaSignInAlt />
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}