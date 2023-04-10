
import { useEffect, useState } from "react";
import Input from "./Input"
import { XCircleIcon } from "@heroicons/react/24/solid";

interface Props {
    candidate: Candidate;
    submitCandidate: (candidate: Candidate) => void;
    removeCandidateForm: (key: number) => void;
}


export default function CandidateForm(props: Props) {
    const [candidate, setCandidate] = useState<Candidate>({
        key: 0,
        name: "",
        title: "",
    });

    useEffect(() => {
        setCandidate(props.candidate);
    }, [props.candidate]);

    useEffect(() => {
        props.submitCandidate(candidate)
    }, [candidate]);

    return (
        <div className="flex flex-col border border-zinc-100 p-5">
            <div className="self-end">
                <XCircleIcon className="h-6 w-6 cursor-pointer hover:bg-zinc-100 text-zinc-300"
                    onClick={() => props.removeCandidateForm(candidate.key)} />
            </div>
            <h1 className="flex w-1/2 bg-zinc-100 aspect-square justify-center items-center self-center text-4x1 rounded-full">
                {props.candidate.key}
            </h1>
            <label className="text-sm mt-3 mb-1">Nama Kandidat</label>
            <Input
                placeholder="Masukan Nama Kandidat"
                value={candidate.name}
                name="candidate"
                onChange={(e) => {
                    setCandidate({ ...candidate, name: e });
                    // props.submitCandidate(candidate);
                }} />
        </div>
    );
}


