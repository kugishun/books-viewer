import React from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button } from "react-bootstrap";
import axios from "axios";

const NewPost = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://railway.bookreview.techtrain.dev/books", data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        navigate("/");
      });
  };

  return (
    <>
      <h1>This is NewPost Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div>
            <p>タイトル</p>
            <input
              type="text"
              {...register("title", {
                required: "タイトルを入力してください。",
              })}
            />
            <p>{errors.title && errors.title.message}</p>
          </div>
          <div>
            <p>Url</p>
            <input
              type="url"
              {...register("url", {
                required: "URLを入力してください。",
              })}
            />
            <p>{errors.url && errors.url.message}</p>
          </div>
          <div>
            <p>詳細</p>
            <textarea
              cols="40"
              rows="8"
              {...register("detail", {
                required: "詳細を入力してください。",
              })}
            />
            <p>{errors.detail && errors.detail.message}</p>
          </div>
          <div>
            <p>レビュー</p>
            <textarea
              cols="40"
              rows="8"
              {...register("review", {
                required: "レビューを入力してください。",
              })}
            />
            <p>{errors.review && errors.review.message}</p>
          </div>
        </div>
        <input type="submit" value="登録" />
      </form>
    </>
  );
};

export default NewPost;
