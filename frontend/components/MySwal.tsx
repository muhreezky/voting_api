import Swalert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function MySwal () {
  return withReactContent(Swalert);
}