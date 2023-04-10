import { CheckIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import axios from "axios";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface CandidateItemProps {
    name: string;
    index: number;
    candidate_id: number;
    voting_id: number
}

export default function CandidateItem({ name, index, voting_id, candidate_id }: CandidateItemProps) {
    const [loginData, setLoginData] = useLocalStorage("loginToken");
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        setLoginData(localStorage.loginToken);
    }, []);

    const voteNow = () => {
        axios.post("http://localhost:8000/votings/vote", {
            voting_id,
            candidate_id
        }, {
            headers: {
                Authorization: `Bearer ${loginData}`
            }
        })
            .then(
                () => Swal.fire({
                    title: "<b>Success</b>",
                    text: `You voted for ${name}`,
                    icon: 'success'
                })
                    .then(result => {
                        if (result.isConfirmed || result.isDismissed) {
                            router.push(`${code}/winner`);
                        }
                    })
            )
            .catch(
                err => {
                    Swal.fire({
                        title: "<b>Error</b>",
                        text: (err.response.data.message),
                        icon: 'error'
                    })
                    .then(result => {
                        if (result) {
                            router.push(`${code}/winner`);
                        }
                    })
                }
            )
    }

    return (
        <div className="flex flex-row border border-zinc-100 p-5 rounded-md space-x-3">
            <div className="w-12 h-12 font-bold text-black text-lg items-center flex justify-center bg-zinc-100 text-center">
                {index}
            </div>
            <div className="w-full pt-4">
                <h3 className="text-lg font-bold">{name}</h3>
            </div>

            <button
                className="flex w-20 h-20 items-center justify-center cursor-pointer bg-green-600 rounded-md"
                onClick={voteNow}
            >
                <CheckIcon className="w-7 h-7" />
            </button>
        </div>
    )
}