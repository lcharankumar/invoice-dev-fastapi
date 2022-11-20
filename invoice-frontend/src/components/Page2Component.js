import React, { useEffect, useState } from "react";
import { TestData } from "../data";
import { TestData2 } from "../data";
import { TestData3 } from "../data";
import SpinnerComponent from "./SpinnerComponent";
import original from "../img/original.png";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png"; 
import ZoomComponent from "./ZoomComponent";
import TableComponent from "./TableComponent";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ImageCropper from "./ImageCropperComponent";
import RectangleComponent from "./RectangleComponent";
import { Link } from "react-router-dom";

import { ArabicContext } from '../context/arabicContext';
import { useContext } from "react";
const Page2Component = (props) => {
  const { arabic } = useContext(ArabicContext);
  let label = ["Invoice number", "Address", "Date", "Total","Category","Bill of Materials"];
  let label1 = ["invono", "address", "date", "total","Category","table"];
  let label3 = ["رقم الفاتورة","تبوك","تاريخ","المجموع","فئة","فاتورة المواد"]
  const [crop, setCrop] = useState(null);
  const [prevTxt, setPrevTxt] = useState('');
  const [prevScore, setPrevScore] = useState('');
  const [rect, setRect] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [bill , setBill] = useState(false);
  const [prev, setPrev] = useState(null);
  const [predicted, setPredicted] = useState(true);
  const [imageFile,setImageFile] = useState(null)
  const [data, setData] = useState({
    address: ["", ""],

    date: ["", ""],
    invono: ["", ""],

    total: ["", ""],
    image: "",
    category:[
      "",
      ""
    ],
    headers:[],
    values:[]
  });
  const [edit, setEdit] = useState(-1);
  const [extract, setExtract] = useState('');
  const [collapse, setCollapse] = useState(false);
  const [disable, setDisable] = useState(false);
  const [spin, setSpin] = useState(false);
  const [dat, setDat] = useState(1);
  const [txt, setTxt] = useState("");
  let img = props.img;
  let setImg = props.setImg;
  const [zoom, setZoom] = useState(false);
  let setCoordinates = props.setCoordinates;
  let coordinates = props.coordinates;

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [currh, setCurrh] = useState(0);
  const [currw, setCurrw] = useState(0);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const setBg = (index) => {
    if (index == 0) {
      return data.invono[0] != "" && data.invono[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 1) {
      return data.address[0] != "" && data.address[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 2) {
      return data.date[0] != "" && data.date[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    if (index == 3) {
      return data.total[0] != "" && data.total[1] > 0.6
        ? { background: "green" }
        : { background: "red" };
    }
    return { background: "green" };
  };

  const predictlabel = async (event) => {
    setSpin(true);
    console.log(props.file);
    event.preventDefault();
    console.log(img);
    const formData1 = new FormData();
    formData1.append("file_input", props.file);
    formData1.append("token",localStorage.getItem('token'))
    let res = { data: {  address: ["", ""],

    date:  ["", ""],
    invono: ["", ""],

    total: ["", ""],
    image: "",
    category:[
      "",
      ""
    ],
    headers:[],
    values:[] } };
    //res.data=TestData3
    try {
      res = await axios.post("http://172.17.19.26:5000/predict", formData1);
    } catch (error) {
      window.alert("Some thing went wrong please try again")
      //window.location.reload();
    }
    // const byteCharacters = atob(res.data.image);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);

    // let image = new Blob([byteArray], { type: "image/jpeg" });
    // let imageUrl = URL.createObjectURL(image);
    // res.data.image = byteCharacters;
    // var image = new Image();
    // image.src = `data:image/png;base64,${res.data.image}`;
    // res.data.image = image;------

    console.log("RES",res);
   
    setDat(dat + 1);
    console.log(dat);
    event.preventDefault();

    setImg(props.org);
    //setImg(img1)

    setData(res.data);

    //setData(TestData3);
    setSpin(false);
    setPredicted(false);
    
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  const handleSubmit = async () => {
    setZoom(true);

    handleClose();
    setSpin(true);
    console.log("Helll", crop);
    var arr = crop.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
  let imageFile1= new File([u8arr], "cropped.png", {type:"image/png"});
  setImageFile(crop);

    var image = new Image();
    image.src = crop;
    //let im = URL.createObjectURL(crop);
    console.log("Imageee",imageFile1);
    const formData2 = new FormData();
    formData2.append("file_input", imageFile1);
    formData2.append("label_input", label1[edit]);
    formData2.append("token",localStorage.getItem('token'))
    // var reader = new FileReader();
    // reader.readAsDataURL(image); 
    // reader.onloadend = function() {
    //   var base64data = reader.result;                
    //   console.log("Base64",crop);
    // }
    console.log("BBBB")
    console.log( crop)
    let res={data:""}
    if(edit===5){
      res = { data: {headers:[],values:[]} };
    }
   
     try {
      res = await axios.post("http://172.17.19.26:5000/crop", formData2); 
     } catch (error) {
      window.alert("Some thing went wrong please try again")
     }
     console.log("Cropped",res)
   
    const txt = res.data;
    //const txt = "26/09/2022"
    setExtract(txt)
    console.log(res.data);
    if (edit == 0) {
      let temp = data;
      temp.invono= ["", ""]
      temp.invono[0] = txt;
      temp.invono[1] = "0.99";
      setTxt(txt);
      setData(temp);
    }
    if (edit == 1) {
      let temp = data;
      console.log(temp)
      setExtract(res.data)
      temp.address[0] = res.data;
      temp.address[1] = "0.99";
      setTxt(txt);
      setData(temp);
    }
    if (edit == 2) {
      let temp = data;
      console.log(temp)
      temp.date= ["", ""]
      temp.date[0] = txt;
      temp.date[1] = "0.99";
      setTxt(txt);
      setData(temp);
      console.log("DDDDATA",data)
    }
    if (edit == 3) {
      let temp = data;
      temp.total= ["", ""]
      setTxt(txt);
      temp.total[0] = txt;
      temp.total[1] = "0.99";
      setData(temp);
    }
    if (edit == 5) {
      let temp = data;
      setTxt(txt);
      temp.headers = res.data;
      temp.values = res.values;
      setData(temp);
    }
   
    setRect(true)
    setPrev(img);
    setSpin(false);
  };
  const revert = () => {setImg(prev);
    if (edit == 0) {
      let temp = data;
      temp.invono[0] = prevTxt;
      temp.invono[1] = prevScore;
      setData(temp);
    }
    if (edit == 1) {
      let temp = data;
      temp.address[0] = prevTxt;
      temp.address[1] = prevScore;
      setData(temp);
    }
    if (edit == 2) {
      let temp = data;
      temp.date[0] = prevTxt;
      temp.date[1] = prevScore;
      setData(temp);
    }
    if (edit == 3) {
      let temp = data;
      temp.total[0] = prevTxt;
      temp.total[1] = prevScore;
      setData(temp);
    }};
  const handleClose = () => setShow(false);
  const add = (text) => {
    const myArray = text.split("\n");
    console.log(myArray);
    return (
      <>
        {myArray.map((str, index) => {
          if (index === 0) {
            return (
              <p style={{ marginBottom: "0" }}>
                {str}
                {","}
                <span
                  class="ColBtn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => setCollapse(!collapse)}
                >
                  <iconify-icon icon="akar-icons:arrow-up"></iconify-icon>
                </span>
              </p>
            );
          } else {
            if (str != "" && str!="\f") {
              return (
                <p style={{ marginBottom: "0" }}>
                  {str} {myArray[index+1] === '\f' ? "." : ","}
                </p>
              );
            }
            return <></>;
          }
        })}
      </>
    );
  };
  return (
    <>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <button className="Predictbtn" onClick={handleSubmit}>
              {
                arabic?"استخراج النص":"Extract Text"
              }
            </button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageCropper
            img={img}
            setCoordinates={props.setCoordinates}
            setCrop={setCrop}
            currh={currh}
            currw={currw}
            setCurrh={setCurrh}
            setCurrw={setCurrw}
          /> 
          
        </Modal.Body>
      </Modal>
      {spin ? (
        <>
          <SpinnerComponent />
        </>
      ) : (
        <>
          <fieldset style={{ padding: "auto" }}>
            <div class="container" style={{ minHeight: "731px" }}>
              <div class="row">
                <div class="col">
                  <div class="">
                  
                    <div class="">
                      <div
                        style={arabic?{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row-reverse"
                        }:{
                          display: "flex",
                          justifyContent: "space-between",        
                        }}
                      >
                        {disable && edit!==4 ? (
                          <>
                            {" "}
                           {
                            arabic? <h5 class="card-title" style={{fontFamily: `Arial, "Helvetica Neue", Helvetica, sans-serif`,fontStyle:"italic"}}>
                            {"حدد قيمة"} {label3[edit]}
                          </h5>: <h5 class="card-title" style={{fontFamily: `Arial, "Helvetica Neue", Helvetica, sans-serif`,fontStyle:"italic"}}>
                              Select value for {label[edit]}
                            </h5>
                           }
                            <Button
                             style={{ color: "#ffffff",
                             border: "1px solid #f87115",
                             borderRadius: "15px",
                             padding: "8px 25px",
                             textTransform: "uppercase",
                             fontSize: "13px",
                             fontWeight: "500",
                             letterSpacing: "1px",
                             background: "#f87115"
                             }}
                              onClick={() => handleShow("xxl-down")}
                            >
                              {
                                arabic?"اختر نص":"Select Text"
                              }
                            </Button>
                           
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <br/>
                      {rect && (
                        <RectangleComponent
                          img={img}
                          coordinates={coordinates}
                          setImg={setImg}
                          setMyFinal={props.setMyFinal}
                          currh={currh}
                          currw={currw}
                          setCurrh={setCurrh}
                          setCurrw={setCurrw}
                          txt={label[edit]}
                          setRect={setRect}
                          revert={revert}
                          extract={extract}
                          label={label[edit]}
                          label1={label3[edit]}
                          cancel={cancel}
                          setCancel={setCancel}
                        />
                      ) 
}
                      {
                        img && ( 
                          <div class="member" data-aos="zoom-in" data-aos-delay="100">
                          <div class="about-img">
                          <img
                          class="card-img-top"
                          src={img}
                          alt="Card image cap"
                        />
                         <div class="member-info">
                <div class="member-info-content">
                  <h4> <button
                        type="button"
                        class="Predictbtn"
                        onClick={() => {
                          props.setIndex(0);
                          window.location.reload()
                        }}
                      >
                       {
                        arabic?"تغيير الملف":" Change File"
                       }
                      </button></h4>
                  <span>{props.name}</span>
                </div>
              
              </div>
                          </div>
                        </div>
                        )
                      }
                    </div>
                   
                  </div>
                </div>
                <div class="Tabcol col card" style={{ border: "none",background:"none",width:"fit-content" }}>
                  {predicted ? (
                    <div className="Empt">
                      <p>
                        {
                          arabic ? "اضغط على الزر لاستخراج التسمية والنص ...!" :"Tap the button to extract the label and text ...!"
                        }
                      </p>
                      <div class="col-lg-4 d-flex align-items-center justify-content-center position-relative" style={{width: "100%"}} data-aos="zoom-in" data-aos-delay="200">
                      <button className="glightbox play-btn" onClick={predictlabel}>
                        {" "}
                       
                      </button>
                      </div>
                    </div>
                  ) : (
                    <>
                    <div className="PredTab" style={bill ? {display:"none"} : {} }  >
                     {
                      arabic ?   <p className="TabHead">
                        {"المتوقعة"} {"  "}<span>{"التسميات"}</span>
                      </p> :  <p className="TabHead">
                      Predicted L<span>abels</span>
                    </p>
                     }
                      <div className="card-body Table" style={{width:"fit-content",padding:"0"}}>
                        <table class="Tab " style={arabic?{direction: "rtl",width:"-webkit-fill-available"}:{width:"-webkit-fill-available"}}>
                          <thead>
                            <th class="headcol"> <span style={{backgroundolor: "white"}}>
                              {
                                arabic?"ملصقات":"Label"
                              }
                              </span> </th>
                            <th>
                              {
                                arabic?"القيمة":"Text"
                              }
                            </th>
                            
                            <th >
                              {" "}
                              <span className="Pen"><iconify-icon  icon="uil:pen"></iconify-icon>{" "}</span> 
                            </th>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="headcol">
                                <span className="dot" style={setBg(0)}></span>
                                {
                                  arabic ? "رقم الفاتورة":"Invoice No"
                                }
                              </td>
                              <td>
                                <input
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.invono[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.invono[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.invono[0]);
                                  }}
                                  readOnly={
                                    edit === 0 && disable ? false : true
                                  }
                                />
                              </td>
                              
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPrevTxt(data.invono[0])
                                    setPrevScore(data.invono[1])
                                    setEdit(0);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 0 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="Add headcol" >
                                <span class="dot" style={setBg(1)}></span>
                                {
                                  arabic ? "تبوك":"Address"
                                }
                              </td>
                              <td>
                                {" "}
                                <p
                                  style={
                                    collapse
                                      ? {
                                          display: "none",
                                        }
                                      : { marginBottom: "0" }
                                  }
                                >
                                  {data.address[0] == ""
                                    ? "---"
                                    : data.address[0] && data.address[0].substring(0, 6) +
                                      "  ...  "}

                                  <span
                                    class="ColBtn"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                    onClick={() => setCollapse(!collapse)}
                                  >
                                    <iconify-icon icon="akar-icons:arrow-down"></iconify-icon>
                                  </span>
                                </p>
                                <div
                                  className={collapse ? "" : "collapse"}
                                  id="collapseExample"
                                >
                                  <div
                                    class="card card-body"
                                    style={{
                                      border: "none",
                                      padding: "0",
                                      background: "none",
                                    }}
                                  >
                                    {edit === 1 && disable ? (
                                      <>
                                        {" "}
                                        <textarea
                                          style={{
                                            border: "none",
                                            minHeight: "100px",
                                          }}
                                          className="typing-container"
                                          value={data.address[0]}
                                          onChange={(event) => {
                                            let temp = data;
                                            temp.address[0] =
                                              event.target.value;
                                            setTxt(event.target.value);
                                            setData(temp);
                                            console.log(temp.address[0]);
                                          }}
                                        />
                                      </>
                                    ) : (
                                      add(data.address[0])
                                    )}
                                  </div>
                                </div>
                              </td>
                              
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPrevTxt(data.address[0])
                                    setPrevScore(data.address[1])
                                    console.log(1);
                                    setEdit(1);
                                    setDisable(!disable);
                                    console.log(edit, 1);
                                  }}
                                >
                                  {edit === 1 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(2)}></span>
                                 {
                                  arabic?"تاريخ":"Date"
                                 }
                              </td>
                              <td>
                                <input
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.date[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.date=[{text:event.target.value},0.99]
                                    //temp.date[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.date[0]);
                                  }}
                                  readOnly={
                                    edit === 2 && disable ? false : true
                                  }
                                />
                              </td>
                            
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPrevTxt(data.date[0])
                                    setPrevScore(data.date[1])
                                    setEdit(2);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 2 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(3)}></span>
                                {
                                  arabic?"المجموع":"Total"
                                }
                              </td>
                              <td>
                                <input
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.total[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.total[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.total[0]);
                                  }}
                                  readOnly={
                                    edit === 3 && disable ? false : true
                                  }
                                />
                              </td>
                             
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPrevTxt(data.total[0])
                                    setPrevScore(data.total[1])
                                    setEdit(3);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 3 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td class="headcol">
                                <span class="dot" style={setBg(3)}></span>
                                {
                                  arabic ? "الفئة":"Category"
                                }
                              </td>
                              <td>
                                {
                                  edit === 4 && disable ? <select
                                  style={{ border: "none" }}
                                  className="typing-container"
                                  value={data.category[0]}
                                  onChange={(event) => {
                                    let temp = data;
                                    temp.category[0] = event.target.value;
                                    setTxt(event.target.value);
                                    setData(temp);
                                    console.log(temp.category[0]);
                                  }}
                                 
                                >
                                  <option>
                                    {
                                      arabic?"اختر تصنيف":"Select a Category"
                                    }
                                  </option>
                                  <option value="Automotive">Automotive</option>
                                  <option value="Retail">Retail</option>
                                  <option value="Food">Food</option>
                                  <option value="Appliances">Appliances</option>
                                  <option value="Health Care">Health Care</option>
                                  <option value="Industry">Industry</option>
                                  <option value="Electronics">Electronics</option>
                                </select> :  <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.category[0]}
                          readOnly={true}
                        />
                                }
                              
                               
                              </td>
                              
                              <td >
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(4);
                                    setDisable(!disable);
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 4 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </td>
                              
                            </tr>
                            
                            <br/>
                              
                          </tbody>
                        </table>
                        <table class="Tab " style={{marginTop:"0" ,width:"-webkit-fill-available"}} >
                          <thead>
                          
                            {
                                data.headers.map((item)=>{
                                    return <th style={{padding:"11px 11px",fontSize:"unset"}}>{item}</th>
                                })
                            }
                             <th>
                                <button
                                className="Pen"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setEdit(5);

                                    setBill(true)
                                    console.log(disable);
                                  }}
                                >
                                  {edit === 5 && disable ? (
                                    <iconify-icon  icon="charm:tick"></iconify-icon>
                                  ) : (
                                    <iconify-icon  icon="uil:pen"></iconify-icon>
                                  )}
                                </button>
                              </th>
                            
                          </thead>
                          <tbody>
                            
                            {
                               data.values.map((it,index)=>{
                                if(it.length>data.headers.length){
                                  return ''
                                }
                                if(it.length<data.headers.length){
                                  let le=data.headers.length - it.length   
                                  return <tr>  
                                                
                                    { data.headers.map((dat,ind)=> {
                                 
                                     if(ind<le){
                                      return  <td>  </td>
                                     }
                                     else{
                                      console.log(it)
                                      return  <td style={index!==data.values.length-1?{ padding: "15px",
                                        
                                        borderBottom: "1px solid #fff"}:{padding: "15px",
                                       
                                        borderBottom: "1px solid #fff"}}> {it[ind-le]} </td>
                                     }
                                     }
                                                       
                                                        
                                   )}
                                    <td></td>  
                                      </tr> 
                                }
                               
                                return <tr>
                                  
                                 { it.map((dat,ind)=> {
                                 
                                  return  <td style={ind!==it.length-1?{ padding: "15px",
                                  
                                  borderBottom: "1px solid #fff"}:{
                                  borderBottom: "1px solid #fff",
                                    }}> {dat} </td>
                                 }
                                                   
                                                    
                               )}
                               <td></td>
                                </tr>
                               })
                            }
                            </tbody>
                            </table>
                      </div>
                      </div>
                      <div style={bill ? {} : {display:"none"}}>
                      {
                        arabic?<p className="TabHead">
                       {" المواد"}{" "}<span>{"فاتورة"}</span>
                      </p>:<p className="TabHead">
                       Bill of M<span>aterials</span>
                      </p>
                      }
                      <button
                        className="Predictbtn"
                        onClick={(event) => {
                          event.preventDefault();
                          setBill(false)
                        }}
                      >
                        {" "}
                        <span> {
                          arabic?"يحفظ":"Save"
                          } </span>
                      </button>
                      <div className="card-body Table" style={{overflowX : "scroll"}}>
                        <TableComponent headers={data.headers} values={data.values} data={data} setData={setData} />
                       
                        </div>
                     
                      </div>
                     
                      <br />
                      <br />
                    </>
                  )}
                   <br/>
                        <br/>
                        <br/>
                  <div className="TabFooter">
                   
                    
                    {" "}
                    {predicted ? (
                      <></>
                    ) : (

                      <button
                        className="Predictbtn"
                        onClick={(event) => {
                          event.preventDefault();
                          props.setFinalData(data);
                          props.setIndex(2);
                        }}
                      >
                        {" "}
                        <span> {
                          arabic ? "حفظ التغييرات":"Save Changes"
                          } </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </>
      )}
    </>
  );
};

export default Page2Component;
