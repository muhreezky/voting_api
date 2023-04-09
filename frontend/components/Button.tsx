interface Props {
    text: string;
    style: "primary" | "secondary" | "third";
    type?: "button" | "reset" | "submit";
    className?: string;
    onclick?: () => void;
}

export default function Button(props: Props) {
    return (
        <button
            onClick={props.onclick}
            className={`px-3 py-2 hover:bg-zinc-800 rounded-lg
            ${props.style === "primary" &&
                "bg-black text-white"
                }
            ${props.style === "secondary" &&
                "bg-white border-2 border-black text-black hover:text-white"
                }
            ${props.style === "third" &&
                "bg-white border-black text-black hover:text-white"
                }
            ${props.className}
        `}
            type={props.type || 'button'}
        >
            {props.text}
        </button>
    );
}