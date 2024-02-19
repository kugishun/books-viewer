import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onClickPage1 = () => {
    navigate("/Page1");
  };

  const onClickPage2 = () => {
    navigate("/Page2");
  };

  const onClickLogin = () =>{
    navigate("/login");
  }

  const onClickSignUp = () => {
    navigate("/signup");
  }

  const onClickPage404 = () => {
    // 適当なURLに飛んでみる
    const str = Math.random().toString(32).substring(2);
    navigate(`/${str}`);
  };

  return (
    <div className="Home">
      <h1>Home Page</h1>
      <button onClick={onClickLogin}>Login</button>
      <p></p>
      <button onClick={onClickSignUp}>Signup</button>
      <p></p>
      <button onClick={onClickPage1}>Page1</button>
      <p></p>
      <button onClick={onClickPage2}>Page2</button>
      <p></p>
      <button onClick={onClickPage404}>Page404</button>
    </div>
  );
};

export default Home;