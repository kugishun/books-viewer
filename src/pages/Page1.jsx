import { useState } from "react";
//import { useForm, SubmitHandler } from "react-hook-form";

const Page1 = () =>{

    const [inputText, setInputText] = useState("");
    const [messageText, setMessageText] = useState("");


    const changeText = (e) =>{
        setInputText(e.target.value);
    }
    const onButton = () =>{
        // setSubmitText(inputText);
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if(inputText == null){
            setMessageText("メールアドレスを入力して下さい");
        }
        else if(!regex.test(inputText)){
            setMessageText("正しい形式でメールアドレスを入力してください");
        }
        else setMessageText("正しいメールアドレスです")
    }

    return(
        <>
            <h1>this is Page1</h1>
            <p>メールアドレスを入力してください(必須)</p>
            <input type="text" id="input-text" data-cy="input-text" onChange={changeText}/>
        <input type="button" id="input-button" data-cy="input-button" value="入力" onClick={onButton}/>
        <div id="result" data-cy="result" >{messageText}</div>
        </>
    )

}

export default Page1;