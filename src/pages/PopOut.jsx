import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

const PopOut = () =>{

    return(
        <div>
            <div>
                <p>ログアウトしますか？</p>
            </div>
            <div>
                <Button>ログアウト</Button>
                <Button>キャンセル</Button>
            </div>
        </div>
    )
}

export default PopOut;