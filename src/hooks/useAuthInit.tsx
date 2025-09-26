import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUserState } from "../store/authAtom";
import { getProfile } from "../api/authApi";

export default function useAuthInit() {
  const setUser = useSetRecoilState(authUserState);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    getProfile()
      .then((res) => {
        console.log("resss", res.data);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("auth-token");
        setUser(null);
      });
  }, [setUser]);
}
