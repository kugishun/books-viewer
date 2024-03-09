import { useState} from "react";
import {useForm} from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../authSlice";
import Compressor from "compressorjs";
import axios from 'axios';
import '../CSS/signup.css';
import { useNavigate } from "react-router-dom";

const Signup =()=>{

    const navigate = useNavigate();
    const [picture, setPicture] = useState([]);
    const [imageUrl,setImageUrl] = useState()
    const [errPicture,setErrPicture] = useState([]);
    const [errorMessage,setErrorMessage] = useState();
    const [errorIcon,setErrorIcon] = useState();
    const [_,setCookie] = useCookies();

    const { register, handleSubmit,formState: { errors } } = useForm();
    const auth = useSelector((state) => state.auth.isSignIn);
    const dispatch = useDispatch();

    const onSubmit = (data) =>{
        console.log(picture.length)

        // const icon = {
        //     iconUrl: picture,
        // };
        const form = new FormData();
        form.append('icon',picture);

        console.log("this is icon")
        console.log(form);
        if(picture.length === 0){
            setErrPicture("アイコンを設定してください");
            return;
        }
        console.log(JSON.stringify(data))
        console.log(picture)
        axios.post('https://railway.bookreview.techtrain.dev/users',data)
        .then((response) => {
            console.log(response.data.token);
            setErrorMessage("");
            ////アイコンのpost
            axios.post('https://railway.bookreview.techtrain.dev/uploads',form,{
                headers:{
                    "Content-Type": 'multipart/form-data',
                    "Authorization": `Bearer ${response.data.token}`
                }
            })
            .then(() =>{
                setErrorIcon("");
                setCookie("token",response.data.token);
                dispatch(signIn());
                navigate('/')
            })
            .catch((err)=>{
                setErrorIcon(`アイコンの登録に失敗しました。${err}`);
            });
            ////
        })
        .catch((err)=>{
            setErrorMessage(`ユーザーの作成に失敗しました。${err}`);
        });

        if (auth) return <Navigate to="/" replace />;
    }

    const hundleChange=(e)=>{

        const file = e.target.files[0];
        if(!file){
            return;
        }

        new Compressor(file,{
            maxHeight: 150,
            maxWidth:150,
            convertTypes: 'image/png',
            success(result){//画像のリサイズが成功している
                console.log("Compressor is success")
                console.log(result);
                setPicture(result);
                const url = URL.createObjectURL(result)
                setImageUrl(url);
            },
            error(err){
                console.log(err.message);
                setErrPicture(err.message);

            }
        })
    }

    const onClickLigin =()=>{
        navigate("/login");
    }

    return(
        <>
        <h1>This is SignUp page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="userName">
                <p className="userName-text">user name</p>
                <input type="text" className="userName-input" {...register('name',{
                    required: {value: true,
                        message:<p>ユーザー名の登録は必須です。</p>},
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
            <div>
                <input type="file" accept="image/jpeg, image/png" onChange={hundleChange}></input>
                <div>
                    <p>画像プレビュー</p>
                    <div>
                        {picture.length!==0 && <img className="preview" src={imageUrl}/>}
                        <p>{errPicture && errPicture}</p>
                    </div>
                </div>
            </div>
            <input type="submit" className="button" value="Sign Up"/>
        </form>
            <p>{errorMessage}</p>
            <p>{errorIcon}</p>
        <p></p>
        <button onClick={onClickLigin}>ログインページに移動</button>
        </>
    );
}


export default Signup;