import { useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import React,{useEffect, useState} from "react";
import '../CSS/home.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import { Button } from "react-bootstrap";
// import Button from 'react-bootstrap/Button'; // React BootstrapのButtonコンポーネントをインポート

const Home = () => {
  const navigate = useNavigate();

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

  const upPage =()=> {
    const newOffset = offset+10;
    setOffest(newOffset);
    // console.log(offset);
    upDate(newOffset);
  }

  const downPage=()=>{
    if(offset>0){
      const newOffset = offset-10;
      setOffest(newOffset);
      // console.log(offset);
      upDate(newOffset);
    }
  }

  const upDate=(newOffset)=>{
    console.log(newOffset);
    axios
    .get(`https://railway.bookreview.techtrain.dev/books?offset=${newOffset}`,{
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    })
    .then((response)=>{
      setBookLists(response.data);
      console.log(response.data.length);
      if(!response.data.length){
        downPage();
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const [cookies] = useCookies();
  const [bookLists,setBookLists] = useState([]);
  const [offset,setOffest] = useState(0);

  useEffect(() =>{
    axios
    .get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`,{
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    })
    .then((response)=>{
      setBookLists(response.data) ;
    })
  },[]);

  return (
    <div className="Home">
      <h1>Home Page</h1>
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
    <div className="Home__offsetChange">
      <Button className="Home__offsetChange__button btn-secondary" onClick={downPage}>&lt;</Button>
      <p className="Home__offsetChange__text font-size-S">{offset+1}</p>
      <Button className="Home__offsetChange__button btn-secondary" onClick={upPage}>&gt;</Button>
    </div>

      <button className="Home__button" onClick={onClickLogin}>Login</button>
      <p></p>
      <button className="Home__button" onClick={onClickSignUp}>Signup</button>
    </div>
  );
};

export default Home;