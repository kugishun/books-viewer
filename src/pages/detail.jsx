import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Loading from "./loading";
import { Button } from "react-bootstrap";
import '../CSS/detail.css';

const Detail =()=> {

    const {id} = useParams();
    const [cookie] = useCookies();
    const [isLoading,setIsLoading] = useState(true);

    const [data,setData] = useState({
        id: "",
        title: "",
        url: "",
        detail: "",
        review: "",
        reviewer: "",
        inMine: false,
    })



    useEffect(()=>{
        axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`,{
            headers: {
                Authorization: `Bearer ${cookie.token}`,
            },
        }).then((res)=>{
            const response = res.data;
            console.log(response.isMine)
            setData({
                id: response.id,
                title: response.title,
                url: response.url,
                detail: response.detail,
                review: response.review,
                reviewer: response.reviewer,
                isMine: response.isMine
            })
            setIsLoading(false);
            console.log(data);
        })
    },[])



    const View = (props) =>{
        const {data} = props
        // console.log(data)
        return(
            <div className="Home">
                <h1>This is edit page</h1>
                <div className="bookDetail">
                    <p className="bookDetail__title font-size-L">{data.title}</p>
                    <p className="bookDetail__url font-size-S">URL: <a target="_blank" href={`${data.url}`}>{data.url}</a></p>
                    <p className="bookDetail__detail font-size-M">{data.detail}</p>
                    <p className="bookDetail__review font-size-M">{data.review}</p>
                    <p className="bookDetail__reviewer font-size-S">{`レビュワー: ${data.reviewer}`}</p>
                </div>
            </div>
        )
    }

    return(
        <div>
            <h1>This is detail page</h1>
            {isLoading?
            <Loading />:
            <View data={data}/>
            }
        </div>
    )

}

export default Detail;