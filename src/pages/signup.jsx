import { useState } from "react";

const Signup =()=>{

    const [userName, setUserName] = useState();
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();

    const changeName = (e) =>{
        setUserName(e.target.value);
    }
    const changeEmail =(e)=>{
        setEmail(e.target.value);
    }
    const changePass =(e)=>{
        setPass(e.target.value);
    }

    const onSignUp=()=>{
        const data={
            name: userName,
            email: email,
            password: pass
        };

        
    }

    return(
        <>
        <h1>This is signup page</h1>
        <div className="userName">
            <p className="userName-text">user name</p>
            <input type="text" className="userName-input" onChange={changeName}></input>
        </div>
        <div className="email">
            <p className="email-text">email</p>
            <input type="email" className="email-input" onChange={changeEmail}></input>
        </div>
        <div className="passWord">
            <p className="passWord-text">pass word</p>
            <input type="password" className="passWord-input" onChange={changePass}></input>
        </div>
        <input type="button" className="button" value="Sign Up" onClick={onSignUp}/>
        </>
    );
}

export default Signup;