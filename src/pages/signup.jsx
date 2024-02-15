import { useState,useRef } from "react";
import {useForm} from "react-hook-form";


const Signup =()=>{
    // const [email,setEmail] = useState();
    // const [pass,setPass] = useState();
    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = (data) =>alert(JSON.stringify(data));

    const fileInput = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState("");
    const [imageData, setImageData] = useState("");


    return(
        <>
        <h1>This is SignUp page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="userName">
                <p className="userName-text">user name</p>
                <input type="text" className="userName-input" {...register('name',{
                    required: {value: true,
                        message:<p>ユーザー名の登録は必須です。</p>},
                    onChange: (e)=>console.log(e)
                })}/>
                <p>{errors.name && errors.name.message}</p>
            </div>
            <div className="email">
                <p className="email-text">email</p>
                <input type="email" className="email-input" {...register('email',{
                    required: "メールアドレスを入力してください。",
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message:"メールアドレスが正しい形式ではないです。"}
                })}/>
                <p>{errors.email && errors.email.message}</p>
            </div>
            <div className="passWord">
                <p className="passWord-text">pass word(5文字以上)</p>
                <input type="password" className="passWord-input" {...register('password',{
                    required:{value:true,message:"パスワードを設定してください。"},
                minLength:{value:5,
                    message:"パスワードは５文字以上で設定してください。"}
                })}/>
                <p>{errors.password && errors.password.message}</p>
            </div>
            <input type="submit" className="button" value="Sign Up"/>

            <input type="file"/>
        </form>
        </>
    );
}

export default Signup;