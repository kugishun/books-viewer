import { useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import '../CSS/home.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { Container ,Nav, Navbar, NavDropdown } from "react-bootstrap";

import PagiNation from "./PagiNation";
import { signOut } from "../authSlice";
// import Button from 'react-bootstrap/Button'; // React BootstrapのButtonコンポーネントをインポート

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignIn);
  const [userName,setUserName] = useState();
  const [userIcon,setUserIcon] = useState();
  const [checkPopOut,setCheckPopOut] = useState(false);

  const upPagi =()=> {
    const newOffset = offset+10;
    setOffest(newOffset);
  }

  const downPagi=()=>{
    if(offset>0){
      const newOffset = offset-10;
      setOffest(newOffset);
    }
  }

  const [cookies, _, removeCookiee] = useCookies();
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
        axios
        .get(`https://railway.bookreview.techtrain.dev/users`,{
          headers:{
            authorization: `Bearer ${cookies.token}`,
          },
        }).then((response)=>{
          console.log("This is UserName"+response.data.name);
          setUserName(response.data.name);
          setUserIcon(response.data.iconUrl);
        })
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
        removeCookiee("token")
        dispatch(signOut());
        })
      })
    }
    else{
      axios
      .get(`https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`)
      .then((response)=>{
        setBookLists(response.data);
        console.log(auth)
        })
    }
    },[offset]);

    const setting = () =>{
      navigate('/profile');
    }

    const popUp = () =>{
      setCheckPopOut(true);
    }

    const cancelButton=()=>{
      setCheckPopOut(false);
    }

    const logOut=()=>{
      removeCookiee("token");
      dispatch(signOut());
      setCheckPopOut(false);
      navigate('/login')
    }

  return (
    <div>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Book-reviews</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {auth?
            <Nav.Link>新規登録</Nav.Link>
            :
            <></>
          }
          </Nav>
        </Navbar.Collapse>
        <Nav className="me-auto">
        { auth ?
        <NavDropdown title={userName}>
          <NavDropdown.Item onClick={setting}><img src={userIcon} width={50} height={50} alt="userIcon" /></NavDropdown.Item>
          <NavDropdown.Item onClick={popUp}>LogOut</NavDropdown.Item>
        </NavDropdown>
        :
        <NavDropdown title="GestUser">
          <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
          <NavDropdown.Item href="/login">LogIn</NavDropdown.Item>
        </NavDropdown>
        }
        </Nav>
      </Container>
    </Navbar>

    <div className="Home">
      <div className="popup-menu-container">
      <div className={`popup-menu ${checkPopOut ? 'shown' : ''}`}>
        <div>
          <p className="popup-menu__text">ログアウトしますか？</p>
        </div>
        <div>
          <Button className="popup-menu__button" onClick={logOut}>ログアウト</Button>
          <Button className="popup-menu__button" onClick={cancelButton}>キャンセル</Button>
        </div>
      </div>
      </div>
      <div className="Home-bookLists">{bookLists.map((bookList)=>{
        return(
          <div className="bookList" key={bookList.id}>
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
      {/* <button className="Home__button" onClick={onClickLogin}>Login</button>
      <p></p>
      <button className="Home__button" onClick={onClickSignUp}>Signup</button> */}
    </div>
    </div>
  );
};

export default Home;