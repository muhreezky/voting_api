interface Props {
    id?: string;
    onChange?: (value: string) => void;
    value?: string;
    placeholder: string;
    className?: string;
    type?: string;
    name?: string;
}

export default function Form(props: Props) {
    return (
        <input
            name={props.name}
            id={props.id}
            type={props.type ? props.type : "text"}
            className={`bg-zinc-100 border-2 p-2 ${props.className}`}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange && props.onChange(e.target.value)}
            defaultValue={props.value}
        />
    );
}