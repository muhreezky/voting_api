import Head from "next/head";
import { useRouter } from "next/router";
import Menu from "../../components/Menu";
import Button from "../../components/Button";
import CandidateItem from "../../components/CandidateItem";
import CountDownItem from "../../components/CountDown/CountDownItem";
import CountDown from "../../components/CountDown/CountDown";
import { showAlert } from "../../components/CountDown/Alert";


export default function DetailParticipant() {
    const router = useRouter();
    const { code } = router.query;
    
    return (
        <div className="container mx-auto">
            <Head>
                <title>Mulai Voting</title>
            </Head>

            <Menu/>

            <div>
                <h1 className="text-4xl mt-10 text-center">Judul Voting</h1>

                {/* <Timer> */}
                <CountDown className="mt-10"/>
                {/* </Timer> */}

                {/* <Kandidat> */}
                <div className="mt-10 space-y-3 mx-auto w-2/3">
                    <CandidateItem />
                    <CandidateItem />
                    <CandidateItem />
                    <CandidateItem />
                </div>
                {/* </Kandidat> */}


                {/* <Submit> */}
                <div className="text-center mt-10">
                    <Button style="primary" text="Kirim Vote Saya" onclick={() => 
                    showAlert({
                        title: "Yeay!",
                        message: "Kamu berhasil melakukan vote!"
                    })}/>
                </div>
                {/* </Submit> */}
            </div>
        </div>

)
}