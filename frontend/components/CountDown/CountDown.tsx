import Countdown, { CountdownRendererFn } from "react-countdown";
import CountDownRenderer from "./CountDownRenderer";
// import Input from "../Input";

interface Props {
    className?: string;
    date?: Date;
}

export default function CountDown(props: Props) {

    const CountDown: CountdownRendererFn = ({
        days,
        hours,
        minutes,
        seconds
    }) => {
        return (
            <CountDownRenderer
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    };
    return (
        <div className={`text-center ${props.className}`}>
            <p>Voting akan berakhir pada :</p>
            <Countdown date={new Date(props.date)} renderer={CountDown} />
        </div>
    );
}