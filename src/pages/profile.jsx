import { useState,useEffect} from "react";
import {useForm} from "react-hook-form";
import { Navigate,useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import axios from 'axios';
import '../CSS/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Profile = () =>{

    const [cookie] = useCookies();
    const navigate = useNavigate();
    const [userIcon,setUserIcon] = useState();
    // const [userName,setUserName] = useState();
    const [saveName,setSaveName] = useState();
    const [newName, setNewName] = useState();
    const [message,setMessage] = useState();
    const [error,setError] = useState();
    const [flag,setFlag] = useState(false);


    useEffect(()=>{
        axios
        .get(`https://railway.bookreview.techtrain.dev/users`,{
            headers:{
                Authorization: `Bearer ${cookie.token}`,
            },
        })
        .then((response)=>{
            setUserIcon(response.data.iconUrl);
            // setUserName(response.data.name);
            setNewName(response.data.name);
            // console.log(response.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const ChangeName = (e) =>{
        setSaveName(e.target.value);
    }

    const setName = () =>{
        setFlag(true);
        if(saveName){
            setNewName(saveName);
            setMessage(`ユーザー名を${newName}として一時保存しました`)
        }
        else setMessage("変更するユーザー名を入力してください");
    }

    const submitChnageName = () =>{
        axios
        .put(`https://railway.bookreview.techtrain.dev/users`, {
            name: newName
        },{
            headers:{
                Authorization: `Bearer ${cookie.token}`,
            },
        })
        .then((response)=>{
            console.log(response.data.name);
            navigate("/");
        })
        .catch((err)=>{
            setError(err);
        })
    }

    const cancelButton=()=>{
        navigate("/");
    }

    return(
        <div className="profile">
                <img src={userIcon} alt="userIcon" className="profile__image"/>
                <div>
                <p className="profile__changeName__nowName font-size-L">ユーザー名:{newName}</p>
                    <div className="profile__chnageName">
                        <input type="text" onChange={ChangeName}></input>
                        <Button className="profile__chnageName__changeButton primary" onClick={setName}>変更</Button>
                        {/* <p>{newName}</p> */}
                    </div>
                    {/* {flag ? <input type="text"/>:<></>} */}
                {message}
                {error}
                </div>
                <div className="profile__saveButton">
                    <Button className="profile__saveButton__button" onClick={submitChnageName}>OK</Button>
                    <Button className="profile__saveButton__button" onClick={cancelButton}>キャンセル</Button>
                </div>
        </div>
    )

}

export default Profile;