import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUserState, authLoadingState } from "../store/authAtom";
import { getProfile } from "../api/authApi";

export default function useAuthInit() {
  const setUser = useSetRecoilState(authUserState);
  const setLoading = useSetRecoilState(authLoadingState);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getProfile()
      .then((res) => {
        console.log("resss", res.data);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("auth-token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser, setLoading]);
}
