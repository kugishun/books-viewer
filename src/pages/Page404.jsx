import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const sec = time - 1;
      setTime(sec);
      if (sec === 0) {
        navigate("/");
      }
    }, 1000);
  });

  return (
    <div className="Page404">
      <h1>Page404</h1>
      {time}秒後自動でHomeへ移る
    </div>
  );
};

export default Page404;