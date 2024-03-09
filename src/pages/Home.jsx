import { useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import React,{useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import '../CSS/home.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import { Button, Nav } from "react-bootstrap";

import PagiNation from "./PagiNation";
import { signOut } from "../authSlice";
// import Button from 'react-bootstrap/Button'; // React BootstrapのButtonコンポーネントをインポート

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickLogin = () =>{
    navigate("/login");
  }

  const onClickSignUp = () => {
    navigate("/signup");
  }

  // const onClickUrl = (url) =>{
  //   // console.log(url);
  //   window.open(url);
  // }

  const upPagi =()=> {
    const newOffset = offset+10;
    setOffest(newOffset);
    // console.log(offset);
    // upDate(newOffset);
  }

  const downPagi=()=>{
    if(offset>0){
      const newOffset = offset-10;
      setOffest(newOffset);
      // console.log(offset);
      // upDate(newOffset);
    }
  }

  const [cookies] = useCookies();
  const [bookLists,setBookLists] = useState([]);
  const [offset,setOffest] = useState(0);

  useEffect(() =>{
    if(cookies.token){
      console.log("token existe: "+cookies.token);
      axios
      .get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`,{
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response)=>{
        setBookLists(response.data);
        if(!response.data.length){
          downPagi();
        }
      })
      .catch((err)=>{
        console.log(err);
        axios
      .get(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`)
      .then((response)=>{
        setBookLists(response.data);
        dispatch(signOut());
        })
      })
    }
    },[offset]);

  return (
    <div className="Home">
      <Nav></Nav>
    <div className="Home-bookLists">{bookLists.map((bookList)=>{
      return(
        <div className="bookList">
          <p className="bookList__title font-size-L">{bookList.title}</p>
          <p className="bookList__url font-size-S">URL: <a target="_blank" href={`${bookList.url}`}>{bookList.url}</a></p>
          <p className="bookList__detail font-size-M">{bookList.detail}</p>
          <p className="bookList__review font-size-M">{bookList.review}</p>
          <p className="bookList__reviewer font-size-S">{`レビュワー: ${bookList.reviewer}`}</p>
        </div>
      )
    })
      }
    </div>
      <PagiNation offset={offset} downPagi={downPagi} upPagi={upPagi} />
      <button className="Home__button" onClick={onClickLogin}>Login</button>
      <p></p>
      <button className="Home__button" onClick={onClickSignUp}>Signup</button>
    </div>
  );
};

export default Home;