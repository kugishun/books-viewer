import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page404 from "./pages/Page404";

export default function App(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Page1" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/*" element={<Page404 />} />

        </Routes>
      </BrowserRouter>

    )
}

