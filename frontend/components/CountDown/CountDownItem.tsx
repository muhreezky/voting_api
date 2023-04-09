import { zeroPad } from "react-countdown";
interface ItemProps {
    value: number;
    label: string;
}

export default function CountDownItem (props: ItemProps){
    return (
    <div className="flex item-center">
        <div className="flex flex-col text-center">
            <span className="text-5xl font-bold">{zeroPad(props.value, 2)}</span>
            <span className="text-xl font-light">{props.label}</span>
        </div>
        {props.label !== "Detik" && <span className="mx-5 text-4x1">:</span>}
    </div>
    );
};