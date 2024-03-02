import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // BootstrapのCSSをインポート
import { Button } from "react-bootstrap";
import '../CSS/PagiNation.css'

const PagiNation = (props) =>{
    return(
        <div className="PagiChange">
            <Button className="PagiChange__button btn-secondary" onClick={props.downPagi}>&lt;</Button>
            <p className="PagiChange__text font-size-S">{props.offset+1}</p>
            <Button className="PagiChange__button btn-secondary" onClick={props.upPagi}>&gt;</Button>
        </div>
    )
}

export default PagiNation;