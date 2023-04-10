import Head from "next/head";
import { useRouter } from "next/router";
import Menu from "../../../components/Menu";
import Button from "../../../components/Button";
import CandidateItem from "../../../components/CandidateItem";
import CountDownItem from "../../../components/CountDown/CountDownItem";
import CountDown from "../../../components/CountDown/CountDown";
import { showAlert } from "../../../components/CountDown/Alert";
import useLocalStorage from "../../../components/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import RestrictedPage from "../../../components/page/RestrictedPage";
import axios from "axios";
import Swal from "sweetalert2";

interface dataProps {
	[key: string]: any;
}

export default function DetailParticipant() {
	const router = useRouter();
	const [code, setCode] = useState<string | string[]>("");
	const [votingData, setVotingData] = useState<dataProps>({});
	const [loginData, setLoginData] = useLocalStorage("loginToken");
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [expireDate, setExpireDate] = useState<Date>(new Date());

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
			axios.get(`http://localhost:8000/votings/${code}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("loginToken")}`
				}
			})
				.then(res => {
					setVotingData(res.data);
					setExpireDate(new Date(res.data.voting.end_date))
				})
				.catch(err => console.log(err));
		}
	}, [code, loginData]);

	useEffect(() => {
		if (Date.now() > expireDate.getTime()) {
			Swal.fire({
				title: "Error",
				text: "Masa berlaku voting sudah habis",
			})
			.then(res => {
				if (res) {
					router.push(`${code}/winner`);
				}
			})
		}
	}, [expireDate]);

	return (
		<>
			{
				!votingData.candidates ?
					(
						<>
							<Head>
								<title>Please Wait...</title>
							</Head>
							<div>
								<div className="text-4xl font-extrabold flex justify-center items-center">
									Loading...
								</div>
							</div>
						</>
					)
					:
					(<div className="container mx-auto">
						<Head>
							<title>Mulai Voting</title>
						</Head>

						<Menu />

						<div>
							<h1 className="text-4xl mt-10 text-center">
								{votingData ? votingData.voting.name : <></>}
							</h1>

							{/* <Timer> */}
							<CountDown date={votingData.voting.end_date} className="mt-10" />
							{/* </Timer> */}

							{/* <Kandidat> */}
							<div className="my-10 space-y-3 mx-auto w-2/3">
								{
									votingData ? votingData.candidates.map(
										(values: any, key: number) => {
											return (
												<CandidateItem
													candidate_id={values.candidate_id}
													name={values.name}
													key={key}
													index={key + 1}
													voting_id={votingData.voting.voting_id} />
											)
										}
									) : <></>
								}
							</div>
							{/* </Kandidat> */}


							{/* <Submit> */}
							{/* <div className="text-center mt-10">
									<Button style="primary" text="Kirim Vote Saya" onclick={() => 
									showAlert({
											title: "Yeay!",
											message: "Kamu berhasil melakukan vote!"
									})}/>
								</div> */}
							{/* </Submit> */}
						</div>
					</div>)
			}
			{
				!loginData && <RestrictedPage />
			}
		</>

	)
}