import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../img/img2.png";
import axios, * as others from 'axios';
import { TestData3 } from "../data";
import { ArabicContext } from '../context/arabicContext';
import { useContext } from "react";
const Page3Component = (props) => {
  const { arabic } = useContext(ArabicContext);
  const navigate = useNavigate();
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
const config = {
  headers: {
  "Content-Type": "application/json",
  },
  };

today = mm + '/' + dd + '/' + yyyy;
  const [data, setData] = useState({
    address: ["", ""],
    date: ["", ""],
    invono: ["", ""],

    total: ["", ""],
    category:[
      "Retail",
      "NA"
    ],
    headers:[],
    values:[[],[]]
  });
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    if (props.finalData) {
      setData(props.finalData);
    }
    console.log(props.finalData);

  }, [props.finalData]);
  const fetch= async ()=>{
    let subt=0;
    let tax=0;
    data.values.map((item)=>{
      if(item.length<data.headers.length){
        item.map((it)=>{
          if(it.includes("subtotal") || it.includes("Subtotal")){
             subt=item[item.length-1]
          }
          if(it.includes("%") || it.includes("tax")){
            tax=item[item.length-1]
         }
        })
      }
    })
    try {
     
     //  const formData1 = new FormData();
     //  formData1.append("name", "admin");
     //  formData1.append("uid", "admin001");
     //  formData1.append("role", "admin");
     //  formData1.append("password", "admin001");

     const formData1 = new FormData();
     const data1= {
       category:data.category[0],
       invono:data.invono[0],
       submittedDate:today,
       invoiceDate:data.date[0],
       address:data.address[0],
       total:data.total[0],
       tax:tax,
       subtotal:subt,
       taxamount:"30",
       currency:"$",
       headers:data.headers,
     values:data.values,

     }
     console.log(data1)
      formData1.append("id", "cl/"+(Math.floor(Math.random() * 10000)).toString());
      formData1.append("name", localStorage.getItem("name"));
      formData1.append("uid", localStorage.getItem("uid"));
      formData1.append("role", localStorage.getItem("role"));
      formData1.append("status", "waiting");
      formData1.append("l1", "no");
      formData1.append("l2", "no");
      formData1.append("l3", "no");
      formData1.append("data", JSON.stringify(data1));
      formData1.append("token", localStorage.getItem("token"));
   
      let res = await axios.post("http://172.17.19.26:5000/request", formData1);
      console.log(res)
    } catch (error) {
      window.alert("Some thing went wrong please try again")
      console.log(error)
      window.location.reload();
    }
  }
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
      <fieldset>
        <div class="container" style={{ minHeight: "731px" }}>
          <div class="row">
            <div class="col">
              <div class="card">
                
                <div class="card-body">
                  
                  {/* <img
                    class="card-img-top"
                    src={props.final}
                    alt="Card image cap"
                  /> */}
                   <img
                    class="card-img-top"
                    src={props.org}
                    alt="Card image cap"
                  />
                </div>
              </div>
            </div>
            <div class="Tabcol col card" style={{ border: "none" , background:"none"}}>
               {
                      arabic ?   <p className="TabHead">
                        {"المتوقعة"} {"  "}<span>{"التسميات"}</span>
                      </p> :  <p className="TabHead">
                      Predicted L<span>abels</span>
                    </p>
                     }
              <div className="card-body">
                <table class="Tab " style={arabic?{direction: "rtl"}:{}}>
                  <thead>
                    <th>
                    {
                                arabic?"ملصقات":"Label"
                              }
                    </th>
                    <th>{
                                arabic?"القيمة":"Text"
                              }</th>
                  </thead>
                  <tbody>
                  <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                       {
                        arabic?"المستعمل":"User"
                       }
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={localStorage.getItem("name")}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                        {
                          arabic?"تاريخ تقديمه":"Submitted date"
                        }
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={today}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                        {
                          arabic?"فئة":"Category"
                        }
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.category[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                        {
                                  arabic ? "رقم الفاتورة":"Invoice No"
                                }
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.invono[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                       {
                                  arabic?"تاريخ":"Date"
                                 }
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.date[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="Add" style={{background:"none"}}>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
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
                                  background:"none"
                                }
                              : { marginBottom: "0" , background:"none"}
                          }
                        >
                          {data.address[0] == ""
                            ? "---"
                            : data.address[0].substring(0, 6) + "  ...  "}

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
                            {add(data.address[0])}
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                         {
                                  arabic?"المجموع":"Total"
                                }
                      </td>
                      <td>
                        <input
                          style={{ border: "none" }}
                          className="typing-container"
                          value={data.total[0]}
                          readOnly={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          class="dot"
                          style={{ background: "orange" }}
                        ></span>
                      {
                        arabic?"فاتورة المواد":" Bill of materials"
                      }
                      </td>
                     
                    </tr>
                    
                    <br/>
                  </tbody>
                </table>
                <div style={{overflowX : "scroll"}}>
                <table class="Tab " style={{marginTop:"0",marginLeft:"40px" ,     background: "#eee",
    borderBottom: "2px solid #adb5bd",boxShadow:"2px 2px 4px 4px #adb5bd",color:"black"}} >
                          <thead>
                            {
                                data.headers.map((item)=>{
                                    return <th style={{borderTop:"none",padding:"11px 11px",fontSize:"unset"}}>{item}</th>
                                })
                            }
                           
                            
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
                                      background: "#eee",
                                      borderBottom: "1px solid #fff"}:{padding: "15px",
                                      background: "rgb(30 30 30 / 85%)",
                                      color: "#ffffff",
                                      borderBottom: "1px solid #fff"}}> {it[ind-le]} </td>
                                     }
                                     }
                                                       
                                                        
                                   )}
                                      </tr> 
                                }
                               
                                return <tr>
                                 { it.map((dat,ind)=> {
                                 
                                  return  <td style={ind!==it.length-1?{ padding: "15px",
                                  background: "#eee",
                                  borderBottom: "1px solid #fff"}:{color:"black",
                                  borderBottom: "1px solid #fff",
                                    background: "#ddd"}}> {dat} </td>
                                 }
                                                   
                                                    
                               )}
                                </tr>
                               })
                            }
                            </tbody>
                            </table>
                            <br/>
                            </div>
              </div>
              <br/>
              <br/>
              <br/>

              <div className="TabFooter">
                {" "}
                <button
                  className="Predictbtn"
                  style={{ background: "#ffffff",
  border: "1px solid #f87115",
  borderRadius: "15px",
  padding: "8px 25px",
  textTransform: "uppercase",
  fontSize: "13px",
  fontWeight: "500",
  letterSpacing: "1px",
  color: "#f87115",
  marginRight:"40px"
  }}
                  onClick={(event) => {
                    event.preventDefault();

                    props.setIndex(1);
                  }}
                >
                  {" "}
                  <span> {
                    arabic?"خلف":"Back"
                    } </span>
                </button>
                <button
                  className="Predictbtn"
                  onClick={(event) => {
                    event.preventDefault();
                    fetch();
                    navigate("/dashboard");
                    //window.location.reload();
                  }}
                >
                  {" "}
                  <span> {
                    arabic?"مراجعة وإرسال":"Review & Submit"
                    } </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default Page3Component;
