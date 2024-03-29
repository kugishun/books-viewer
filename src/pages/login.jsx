import axios from "axios";
import { useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { useCookies } from "react-cookie";
import { useNavigate ,Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../authSlice";
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import Button from 'react-bootstrap/Button'; // React BootstrapのButtonコンポーネントをインポート

const Login =()=>{

    const { register, handleSubmit,formState: { errors } } = useForm();
    const [errorMessage,setErrorMessage] = useState();
    const [_,setCookie] = useCookies();
    const auth = useSelector((state) => state.auth.isSignIn);
    const dispatch = useDispatch();


    useEffect(()=>{
        console.log(auth)
        console.log("aaaaaaaaaaaaaaaaa")
        if(auth) {navigate('/')}
    },[auth])

    const onSubmit = (data) =>{
        axios.post('https://railway.bookreview.techtrain.dev/signin',data)
        .then((response)=>{
            setErrorMessage();
            setCookie("token",response.data.token);
            dispatch(signIn());
            navigate('/')
        })
        .catch((err)=>{
            setErrorMessage(err);
        })
        if(auth) return <Navigate to="/" replace/>
    }
    const navigate = useNavigate();

    const onClickSignUp =()=>{
        navigate("/signup");
    }

    return(
        <>
            <h1>This is Login Page</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
            <input type="submit" className="button" value="Login"/>
            <p>{errorMessage}</p>
            </form>
            <p></p>
        <Button  variant="link" onClick={onClickSignUp}>ログインページに移動</Button>
        </>
    )


}

export default Login;