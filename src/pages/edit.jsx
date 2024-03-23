import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const Edit = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [cookie] = useCookies();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://railway.bookreview.techtrain.dev/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        );
        const response = res.data;
        if (response.isMine === undefined) navigate("/");
        console.log(response.isMine);
        setValue("title", response.title);
        setValue("url", response.url);
        setValue("detail", response.detail);
        setValue("review", response.review);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const onSubmit = (data) => {
    axios
      .put(`https://railway.bookreview.techtrain.dev/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div>
            <label>タイトル</label>
            <input
              type="text"
              {...register("title", {
                required: "タイトルを入力してください。",
              })}
            />
            <p>{errors.title && errors.title.message}</p>
          </div>
          <div>
            <label>Url</label>
            <input
              type="url"
              {...register("url", {
                required: "URLを入力してください。",
              })}
            />
            <p>{errors.url && errors.url.message}</p>
          </div>
          <div>
            <label>詳細</label>
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
            <label>レビュー</label>
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
    </div>
  );
};

export default Edit;
