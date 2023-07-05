
import { useState } from "react";
import AuthVerifyState from "./AuthContext";

export const AuthState= ({ children }) => {

    const [isAuth, setisAuth] = useState(true)

    return (
        <AuthVerifyState.Provider value={{ isAuth,setisAuth }}>
            {children}
        </AuthVerifyState.Provider>
    )
}