import Image from "next/image"
import Button from "./Button";
import { useRouter } from "next/router";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Menu() {
  const router = useRouter();
  const [authToken, setAuthToken] = useLocalStorage("loginToken");

  useEffect(() => {
    setAuthToken(localStorage.getItem("loginToken"));
  }, []);

  const logout = () => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to logout?",
      confirmButtonText: "Yes",
      denyButtonText: "No",
      showDenyButton: true
    })
      .then((res) => {
        if (res.isConfirmed) {
          delete localStorage.loginToken
          router.reload();
        }
      })
  }

  return (
    <div className="flex justify-between px-10 py-3">
      {/* <Image
    src={"/assets/fotos.svg"}
    width={150}
    height={150}
    alt="Logo"
    /> */}
      {/* <img src="/assets/fotos.svg" alt="logo" width="300px"/> */}

      {/* <a className="text-2xl font-bold cursor-pinter"
    onClick={()=>router.push("/")}>
        Voting</a> */}
      <Button style="third" text="Voting" className="text-2xl font-bold" onclick={() => router.push("/")} />
      {
        !authToken ? (
          <div className="space-x-3">
            <Button style="secondary" text="Login" onclick={() => router.push("/login")} />
            <Button style="secondary" text="Register" onclick={() => router.push("/register")} />
          </div>
        ) : (
          <div>
            <Button style="primary" text="Logout" onclick={logout} />
          </div>
        )
      }
    </div>
  );
}