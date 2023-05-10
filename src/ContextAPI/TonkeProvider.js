import React, { useState } from "react";
import TokenAPI from "./TokenAPI";
import ExpenseCtxPrivider from "./ExpenseContext";

function TokenProvider(props) {
    const ID = localStorage.getItem("TOkenID")
    const Email = localStorage.getItem("Email")

    const [TokenId, SetTokenId] = useState(ID)

    const isLogin = !!TokenId

    function LogIn(id) {
        SetTokenId(id)
    }

    function LogOut() {
        SetTokenId(null)
    }

    const defaultValues = {
        TokenId: TokenId,
        Email: Email,
        isLogin: isLogin,
        LogIn: LogIn,
        LogOut: LogOut,
    }

    return (
        <TokenAPI.Provider value={defaultValues}>
            <ExpenseCtxPrivider>
                {props.children}
            </ExpenseCtxPrivider>
        </TokenAPI.Provider>
    )

}

export default TokenProvider;