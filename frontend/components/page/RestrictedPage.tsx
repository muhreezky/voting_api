import Head from "next/head";
import Button from "../Button";
import { useRouter } from "next/router";

export default function RestrictedPage() {
    const router = useRouter();
    return (
        <>
          <Head>
            <title>Login Dulu</title>
          </Head>
          <div className="flex flex-col justify-center items-center py-48">
            {/* <Image src={"/assets/restricted.jpg"}
                alt="restricted"
                width={200}
                height={200}
            /> */}

            <h1 className="text-4xl font-bold">Login untuk Mengakses ini</h1>
            <h2 className="text-lg mb-5">
              Untuk mengakses halaman ini, kamu wajib login terlebih dahulu
            </h2>
            <div className="space-x-3">
              <Button style="primary" onclick={() => router.push("/login")} text="Login" />
              <Button style="primary" onclick={() => router.push("/register")} text="Register" />
            </div>
          </div>
        </>
    );
}