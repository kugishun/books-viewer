import React from "react";
import {useForm} from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { use } from "chai";

const NewPost = () =>{

    const {register, hundleSubmit,formState:{errors}} = useForm();
    const onSubmit = ()=>{
        const form = new FormData();
    }

    return(
        <>
        <h1>This is NewPost Page</h1>
        <form onSubmit={hundleSubmit(onSubmit)}>
            <div className="">
                <div>
                    <p>タイトル</p>
                    <input type="text" {...register('title',{
                        required: "タイトルを入力してください。"
                    })}/>
                    <p>{errors.title && errors.title.message}</p>
                </div>
                <div>
                    <p>Url</p>
                    <input type="url" {...register('url',{
                        required: "URLを入力してください。"
                    })}/>
                    <p>{errors.url && errors.url.message}</p>
                </div>
                <div>
                    <p>詳細</p>
                    <textarea cols="40" rows="8"{...register('detail',{
                        required: "詳細を入力してください。"
                    })}/>
                    <p>{errors.detail&& errors.detail.message}</p>
                </div>
                <div>
                    <p>レビュー</p>
                    <textarea cols="40" rows="8" {...register('review',{
                        required: "レビューを入力してください。"
                    })}/>
                    <p>{errors.review&& errors.review.message}</p>
                </div>
            </div>
            <input type="submit" value="登録"/>
        </form>
        </>
    )

}

export default NewPost;