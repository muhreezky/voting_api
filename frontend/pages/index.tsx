import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Menu from '../components/Menu'
import styles from '../styles/Home.module.css'
import Button from '../components/Button'
import { LinkIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from 'react';
import useLocalStorage from '../components/hooks/useLocalStorage'
// import img from "../styles/foto.jpg"
// import Image from 'foto.jpg';


const Home: NextPage = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useLocalStorage("loginToken");
  const [votingList, setVotingList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/votings", {
      headers: {
        Authorization: `Bearer ${localStorage.loginToken}`
      }
    })
      .then((res) => setVotingList(res.data.data))
      .catch(err => {
        console.error(err);
        // setAuthToken("");
      });
    console.log(authToken);
  }, []);

  return (
    <>
      <Head>
        <title>Voting App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">

        <Menu />

        {/* <Headers> */}
        <div className='flex flex-col justify-center items-center pt-10 pb-20 space-y-3'>
          <h1 className="text-5xl font-bold">Ayo Mulai Voting</h1>
          <h2 className="text-lg bg-zinc-100 px-3">
            Tentukan pilihanmu untuk masa depan yang lebih baik
          </h2>
          {/* <Image
                src={img}
                alt="foto logo"
                width={500}
                height={400}
              /> */}


          <div className='space-x-10'>
            <Button text='Buat Vote Baru' style='primary' className='font-bold' onclick={() => router.push("/vote/create")} />
            <Button text='Ikutan Vote' style='secondary' className='font-bold' onclick={() => router.push("/participant")} />
          </div>
        </div>
        {/* </Headers> */}

        {/* <Table> */}
        <div className="p-4 mb-5">
          {/* {votingList.map(value => <div>{value}</div>)} */}
          <p className='py-5 text-lg font-bold'>Vote yang saya Buat</p>
          <table className='table-auto w-full border border-zinc-100'>
            <thead>
              <tr className='border-b border-zinc-100'>
                <th className='p-5 text-left'>No</th>
                <th className='p-5 text-left'>Judul</th>
                <th className='p-5 text-left'>Kode</th>
                <th className='p-5 text-left'>Mulai</th>
                <th className='p-5 text-left'>Selesai</th>
                <th className='p-5 text-left'></th>
              </tr>
            </thead>

            <tbody>
              {
                votingList &&
                votingList.map(
                  (value: any, key: number) => {
                    return (
                      <tr key={key}>
                        <td className='p-5 text-left'>{key + 1}</td>
                        <td className='p-5 text-left'>{value.name}</td>
                        <td className='p-5 text-left'>{value.join_code}</td>
                        <td className='p-5 text-left'>{value.createdAt}</td>
                        <td className='p-5 text-left'>{value.updatedAt}</td>
                        <td className='p-5 text-left'>
                          <div>
                            <a href='#' className="mb-5">
                              <LinkIcon className='w-6 h-6 hover:bg-zink-100 mb-5' />
                            </a>
                            <a href='#'>
                              <TrashIcon className='w-6 h-6 hover:bg-zink-100' />
                            </a>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                )
              }
            </tbody>
          </table>
        </div>
        {/* </Table> */}
      </div>
    </>
  )
}

export default Home
