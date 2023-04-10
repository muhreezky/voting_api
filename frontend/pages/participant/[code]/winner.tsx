import Menu from "../../../components/Menu"
import axios from "axios";
import useLocalStorage from "../../../components/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VotesCard from "../../../components/VotesCard";
import Head from "next/head";
import { useRouter } from "next/router";

interface dataProps {
  [key: string]: any;
}

export default function Winner() {
  const [loginData, setLoginData] = useLocalStorage("loginToken");
  const [voteData, setVoteData] = useState<dataProps>({});
  const router = useRouter();
  const [code, setCode] = useState<any>("");

  useEffect(() => {
    setLoginData(localStorage.getItem("loginToken"));
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setCode(router.query.code);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (code && loginData) {
      axios.get(`http://localhost:8000/votings/${code}/candidates`, {
        headers: {
          Authorization: `Bearer ${loginData}`
        }
      })
        .then(res => setVoteData(res.data))
        .then(() => console.log(voteData))
        .catch(err => Swal.fire({
          title: "<b>Error</b>",
          text: err.response.message
        }))

      document.title = "Pemungutan Suara";
    }
  }, [code, loginData]);

  useEffect(() => {
    if (voteData.winner) {
      console.log(voteData);
    }
  }, [voteData]);

  return (
    <>
      <Menu />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">
          Pemungutan Suara Terbanyak
        </h1><br />
        <div className="text-xl flex flex-col justify-center content-center">
          {
            voteData.candidates ?
              (
                voteData.candidates.map(
                  (value: any, key: number) => (
                    <VotesCard name={value.name} count={value.votes} key={key} />
                  )
                )
              ) :
              (
                <>
                  <Head>
                    <title>Please Wait...</title>
                  </Head>
                  <p className="flex justify-center items-center self-center font-extrabold text-3xl">
                    Loading...
                  </p>
                </>
              )
          }
        </div>
      </div>
    </>
  )
}