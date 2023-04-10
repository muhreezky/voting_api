import Head from "next/head"
import Image from "next/image"
import Button from '../../components/Button'
import Menu from '../../components/Menu'
import Input from '../../components/Input'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useLocalStorage from "../../components/hooks/useLocalStorage"
import RestrictedPage from "../../components/page/RestrictedPage"


export default function Participant() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [authCode, setAuthCode] = useLocalStorage("loginToken");

    useEffect(() => {
        setAuthCode(localStorage.getItem("loginToken"));
    }, []);

    const handleSubmit = () => {
        router.push(`/participant/${code}`);
    };
    return (
        <>
            {
                authCode ?
                    (<div className="flex flex-col items-center justify-center h-schreen space-y-5 container mx-auto">
                        <Head>
                            <title>Join Vote</title>
                        </Head>

                        {/* <Menu/> */}

                        <Image
                            src={"/assets/fotos.svg"}
                            width={150}
                            height={150}
                            alt="Logo"
                        />

                        <h1 className="text-4xl font-bold">Join Voting</h1>
                        <h2 className="w-1/3 text-center">
                            Untuk Join Voting, kamu harus memasukan kode voting yang
                            sudah diberikan panitia/penyelenggara
                        </h2>
                        <Input
                            onChange={setCode}
                            placeholder="Masukan Kode Voting"
                            className="w-1/3 mt-3" />


                        <Button style="primary" onclick={handleSubmit} text="Lanjutkan" className="w-1/3" />
                        {/* <button className="text-sm" onclick={() => router.push("/")}>
                        Kembali
                    </button> */}
                    </div>)
                    :
                    <RestrictedPage />
            }
        </>

    )
}

