import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NewPost from "./pages/newPost";
import Detail from "./pages/detail";
import TestPost from "./pages/testPost";
import Page404 from "./pages/Page404";

export default function App(){

  const auth = useSelector((state) => state.auth.isSignIn);

    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={auth ?<Navigate to="/"/>:<Login />} />
          <Route exact path="/signup" element={auth ?<Navigate to="/" />:<Signup />} />
          <Route exact path="/newPost" element={auth ?<NewPost />:<Navigate to="login" />} />
          <Route path="/detail/:id?" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Page1" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/testPost" element={<TestPost/>}/>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>

    )
}

