import { useState} from "react";
import {useForm} from "react-hook-form";
import Compressor from "compressorjs";
import '../CSS/signup.css';
import { Navigate } from "react-router-dom";


const Signup =()=>{

    const { register, handleSubmit,formState: { errors } } = useForm();
    const onSubmit = (data) =>{
        console.log(picture.length)
        if(picture.length === 0){
            setErrPicture("アイコンを設定してください");
        }
        alert(JSON.stringify(data))
    };

    // const fileInput = useRef<HTMLInputElement | null>(null);
    // const [fileName, setFileName] = useState("");
    // const [imageData, setImageData] = useState("");


    const [picture, setPicture] = useState([]);
    const [errPicture,setErrPicture] = useState([]);

    const hundleChange=(e)=>{

        console.log("This is e.target.files")
        console.log(e.target.files)
        const file = e.target.files[0];
        if(!file){
            return;
        }

        new Compressor(file,{
            maxHeight: 150,
            maxWidth:150,
            convertTypes: 'image/png',
            success(result){
                console.log("Compressor is success")
                console.log(result);
                const reader = new FileReader();
                reader.onloadend = () => {
                    const compressedDataUrl = reader.result;
                    if (typeof compressedDataUrl !== "string") {
                        console.log("result is not correct type")
                        return;
                    }
                    console.log(compressedDataUrl)
                    console.log([compressedDataUrl])
                    setPicture([compressedDataUrl]);//[]で囲うと画像データとして認識される
                };
                reader.readAsDataURL(result);
            },
            error(err){
                console.log(err.message);
                setErrPicture(err.message);

            }
        })
    // }
    }

    const onClickLigin =()=>{
        Navigate("/login");
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
            <div>
                <input type="file" accept="image/jpeg, image/png" onChange={hundleChange}></input>
                <div>
                    <p>画像プレビュー</p>
                    <div>
                        {picture.length!==0 && <img className="preview" src={picture[0]}/>}
                        <p>{errPicture && errPicture}</p>
                    </div>
                </div>
            </div>
            <input type="submit" className="button" value="Sign Up"/>
        </form>
        <p></p>
        <button onClick={onClickLigin}>ログインページに移動</button>
        </>
    );
}

export default Signup;