
import { useState } from "react";
import UserNameContexts from "./UserNameContext";

export const UserNameState = ({ children }) => {

    const [UserName, setUserName] = useState('Guest')

    return (
        <UserNameContexts.Provider value={{ UserName, setUserName }}>
            {children}
        </UserNameContexts.Provider>
    )
}