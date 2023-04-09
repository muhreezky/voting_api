import Head from "next/head";
import Button from "../Button";
import { useRouter } from "next/router";

export default function RestrictedPage() {
    const router = useRouter();
    return (
        <div>
            <head>
                <title> Login Dulu</title>
            </head>
            {/* <Image src={"/assets/restricted.jpg"}
                alt="restricted"
                width={200}
                height={200}
            /> */}

            <h1 className="text-4xl font-bold">Login untuk Mengakses ini</h1>
            <h2 className="text=lg">
                Untuk mengakses halaman ini, kamu wajib login terlebih dahulu
            </h2>
            <div>
                <Button style="primary" onclick={() => router.push("/login")} text="Login" />
                <Button style="primary" onclick={() => router.push("/register")} text="Register" />
            </div>
        </div>
    );
}