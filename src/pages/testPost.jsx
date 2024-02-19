import React, {useState} from "react";
import Compressor from 'compressorjs';

const TestPost = () =>{

    const [picture, setPicture] = useState([]);

    const hundleChange=(e)=>{

        console.log("This is e.target.files")
        console.log(e.target.files)
        const file = e.target.files[0];
        if(!file){
            return;
        }

        // new Compressor(file,{
        //     maxHeight: 400,
        //     maxWidth:400,
        //     convertTypes: 'image/png',
        //     success(result){
        //         console.log("Compressor is success")
        //         console.log("これはresultです。");
        //         console.log(result)
        //         console.log(result.name)
        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //             const result = reader.result;
        //             if (typeof result !== "string") {
        //             console.log("result is not correct type")
        //             return;
        //         }
        //         setPicture((prevImages) => [...prevImages, result]);
        //     };
        //     reader.readAsDataURL(file);
        //     },
        //     error(err){
        //         console.log(err.message);
        //     }
        // })

        new Compressor(file,{
            maxHeight: 200,
            maxWidth:200,
            convertTypes: 'image/png',
            success(result){
                console.log("Compressor is success")
                console.log(result);
                const reader = new FileReader();
                reader.onloadend = () => {
                    const compressedDataUrl = reader.result;
                    if (typeof compressedDataUrl !== "string") {
                        console.log("result is not correct type")
                        return;
                    }
                    console.log(compressedDataUrl)
                    console.log([compressedDataUrl])
                    setPicture([compressedDataUrl]);//[]で囲うと画像データとして認識される
                };
                reader.readAsDataURL(result);
            },
            error(err){
                console.log(err.message);
            }
        })
    // }
    }

    const onClickButton=()=>{
        console.log(picture);
    }

    return(
        <div>
            <input type="file" accept="image/jpeg, image/png" onChange={hundleChange}></input>
            <input type="button" value="提出" onClick={onClickButton}/>
            <div>
                <p>画像プレビュー</p>
                <div>
                    {picture.length!==0 && <img src={picture[0]}/>}
                </div>
            </div>
        </div>
    )

}

export default TestPost;