import { BrowserRouter, Route, Routes} from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Login from "./pages/login";
import Signup from "./pages/signup";
import TestPost from "./pages/testPost";
import Page404 from "./pages/Page404";

export default function App(){

  const auth = useSelector((state) => state.auth.isSignIn);

    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={auth ? <Home />:<Login />} />
          <Route exact path="signup" element={auth ? <Home />:<Signup />}/>
          <Route path="/Page1" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/testPost" element={<TestPost/>}/>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>

    )
}

