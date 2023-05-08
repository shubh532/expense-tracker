import React,{useState} from "react";
import TokenAPI from "./TokenAPI";

function TokenProvider(props){
    const [TokenId,SetTokenId]=useState(null)

    const isLogin=!!TokenId

    function LogIn(id){
        SetTokenId(id)
    }

    function LogOut(){
        SetTokenId(null)
    }

    const defaultValues={
        TokenId:TokenId,
        isLogin:isLogin,
        LogIn:LogIn,
        LogOut:LogOut,
        mess:"i am Working"
    }

    return(
        <TokenAPI.Provider value={defaultValues}>
            {props.children}
        </TokenAPI.Provider>
    )

}

export default TokenProvider;