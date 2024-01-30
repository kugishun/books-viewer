import { useState } from "react";

const Page2 = () =>{

    const [inputAdress,setInputAdress] = useState();
    const [inputPass,setInputPass] = useState("");
    const [adressStatus,setAdressStatus] = useState();
    const [passStatus,setPassStatus] = useState();

    const changeAdress = (e) =>{
        setInputAdress(e.target.value);
    }

    const changePass = (e) =>{
        setInputPass(e.target.value);
    }

    const onButton=()=>{
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

        if(!regex.test(inputAdress)){
            setAdressStatus("please write mail address");
        }
        else setAdressStatus("正しいメールアドレスです")

        if(inputPass.length < 5)
            setPassStatus("please write pass");
        else
            setPassStatus("正しいパスワードです");
    }

    return(
        <>
            <h1>this is Page2</h1>
            <div className="mailAdress">
                <p>メールアドレス</p>
                <input type="text" placeholder="example@gmail.com" onChange={changeAdress}></input>
                <p>{adressStatus}</p>
            </div>
            <div className="PassWord">
                <p>パスワード(5文字以上)</p>
                <input type="password" placeholder="PassWord" onChange={changePass}></input>
                <p>{passStatus}</p>
            </div>
            <input type="button" value="ログイン" onClick={onButton}/>
        </>
    )

}

export default Page2;