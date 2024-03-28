import React, { useEffect, useState } from "react";
import "./Styles.css"
import { Row, Col, } from "react-bootstrap";
//import BJP_logo from "./Images/BJP_logo.png"
import Appointment from './Images/CM appointment.png'
import CGgovtlogo from "./Images/CGgovtlogo.png"
import CM from "./Images/CM.png"
import Url from './Url';

const Homepage = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url["s3"]

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [mobileno, setMobileno] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [sentadmin, setSentadmin] = useState(false)
    const [sentuser, setSentuser] = useState(false)

    const [forgetpassword, setForgetpassword] = useState(false)
    const [newpass, setNewpass] = useState(false)

    const [mobilescr, setMobilescr] = useState(false)
    const [getdevwidth, setGetdevwidth] = useState("")

    const [rukjlk, setRukjlk] = useState(false)

    useEffect(() => {

        setGetdevwidth(window.innerWidth + 'px')

        if (window.innerWidth <= 500) {
            setMobilescr(true)
        }
        //console.log(getdevwidth)

    }, [getdevwidth])

    /*---------------------Login --------------------- */

    // const login = e => {
    //     e.preventDefault()
    //     const controller = "login"
    //     const api = url + controller
    //     //var api = "http://127.0.0.1:8000/api/login"
    //     fetch(api, {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password }),
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then((apidata) => {
    //             return apidata.json()
    //         })
    //         .then((actualdata) => {
    //             //console.log(actualdata)
    //             if (actualdata.token != "NA") {
    //                 localStorage.setItem("usertoken", actualdata.token)
    //                 localStorage.setItem("email", email)
    //                 if (actualdata.role === "admin")
    //                     setSentadmin(true)
    //                 if (actualdata.role === "user")
    //                     setSentuser(true)
    //             }
    //             if (actualdata.token === "NA") {
    //                 alert("Invalid Email or password")
    //                 // toast.error('Invalid Email or password', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    //             }
    //         })
    // }

    const login = e => {
        e.preventDefault()
        // alert(mobileno)
        // alert(password)
        // return
        if (mobileno === "6000000000" && password === "demo") {
            window.location = "#/Dashboardadmin"
        }
        else if (mobileno === "7000000000" && password === "demo") {
            window.location = "#/Dashboarduser"
        }

        else {
            alert("Invalid credentails")
        }
    }


    const forgetPass = (e) => {
        e.preventDefault()
        setRukjlk(true)
        const api = url + "sendMail/" + email
        //var api = "http://127.0.0.1:8000/api/login"
        fetch(api, {
            method: 'GET',
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata)
                if (actualdata.message != "Fail") {
                    alert("Email sent on " + email)
                    //setNewpass(true)
                    setRukjlk(false)
                    setForgetpassword(false)
                }
                else {
                    alert("Email not registered, please enter correct Email id")
                    setRukjlk(false)
                }

            })
    }

    const changePass = (e) => {
        e.preventDefault()
        const controller = ""
        const api = url + controller

        fetch(api, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((apidata) => {
                //console.log(apidata)
                return apidata.json()
            })
            .then((actualdata) => {

                if (actualdata.message != "Fail") {
                    alert("Password changed successfully")
                    setNewpass(false)
                    setForgetpassword(false)
                }

            })
    }

    if (sentadmin) {
        window.location = "#/Dashboardadmin"
    }

    if (sentuser) {
        window.location = "#/Dashboarduser"
    }




    ///////////////Render top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    /*---------------------Login end--------------------- */

    // useEffect(() => {
    //     Aos.init({ duration: 2000 })
    // }, [])

    // const callBack = () => {
    //     // var elmnt = document.getElementById("Callback");
    //     // elmnt.scrollIntoView();
    //     // window.scrollTo({ behavior: 'smooth' });
    //     window.scrollTo(0, 800)
    // }

    return (
        <>
            <Row className="hompagegradientbg">
                {/* <Widget/> */}

                {/* <Row className="mb-5">
                <Navigation />
            </Row> */}
                {/* <Row className="mt-5"></Row>
            <Row className="mt-5"></Row> */}
                {!mobilescr ?
                    <>
                        <Col sm className=" justify_content_ver_hor_center  ">
                            <Row className="mt-5">
                                <img src={CGgovtlogo} alt="" className="homegovtlogo" />
                            </Row>
                        </Col>

                        <Col sm className=" justify_content_ver_hor_center  ">
                            <Row className=" justify_content_ver_hor_center  mb-5">
                                <Row className="homreqmsgrect " >
                                    <Row >
                                        <Col className=" justify_content_center mt-4">
                                            <img src={Appointment} alt="" className="login_logo" />
                                        </Col>
                                    </Row>

                                    {/* <Row className="homereqmsghead justify_content_center mt-4">
                        Login
                    </Row> */}
                                    {/* <Row className="floating-label mt-4">
                        <input className="floating-input" type="email" placeholder=" "
                            required
                        />
                        <span className="highlight"></span>
                        <label>Email *</label>
                    </Row> */}
                                    {!forgetpassword ?

                                        <form onSubmit={login}>
                                            <Row className="loginhead mt-3">Login</Row>
                                            <Row className="floating-label mt-4">
                                                {/* <input className="floating-input" type="email" placeholder=" "
                                                    required
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Email</label> */}
                                                <input className="floating-input" type="text" placeholder=" "
                                                    pattern="[6-9]\d{9}"
                                                    required
                                                    onChange={e => setMobileno(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Mobile No</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="password" placeholder=" "
                                                    required
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Password</label>
                                            </Row>

                                            <Row className="justify_content_center mt-3 mb-3">
                                                <Col>
                                                    <button className="homgreqmsgbtn">Submit</button>
                                                </Col>
                                                <Col className="forgetpasstext justify_content_ver_hor_center"
                                                    onClick={() => setForgetpassword(true)}>
                                                    Register
                                                </Col>
                                                {/* <Col className="forgetpasstext justify_content_ver_hor_center"
                                                    onClick={() => setForgetpassword(true)}>
                                                    Forget Password?
                                                </Col> */}
                                            </Row>
                                        </form>
                                        :
                                        <>
                                            <Row className="loginhead mt-1">Register</Row>
                                            <Row className="floating-label mt-4">
                                                <input className="floating-input" type="mobile" placeholder=" "
                                                    pattern="[A-Za-z ]+"
                                                    required
                                                    onChange={e => setName(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Full Name*</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="mobile" placeholder=" "
                                                    pattern="[6-9]\d{9}"
                                                    required
                                                    onChange={e => setMobileno(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Mobile No*</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="email" placeholder=" "
                                                    //required
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Email Id</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="password" placeholder=" "
                                                    required
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Password*</label>
                                            </Row>
                                            <Row className="justify_content_center mt-3 mb-3">
                                                <Col>
                                                    {!rukjlk ?
                                                        <button className="homgreqmsgbtn">Submit</button>
                                                        :
                                                        <button className="homgreqmsgbtn" disabled>Submit</button>
                                                    }
                                                </Col>
                                                <Col className="forgetpasstext justify_content_ver_hor_center"
                                                    onClick={() => setForgetpassword(false)}>
                                                    Login
                                                </Col>
                                            </Row>

                                            {/* <form onSubmit={forgetPass}>
                                                <Row className="floating-label mt-4">
                                                    <input className="floating-input" type="email" placeholder=" "
                                                        //pattern="[1-9]{1}[0-9]{9}"
                                                        required
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                    <span className="highlight"></span>
                                                    <label>Email*</label>
                                                </Row>
                                                <Row className="justify_content_center mt-3 mb-3">
                                                    <Col>
                                                        {!rukjlk ?
                                                            <button className="homgreqmsgbtn">Submit</button>
                                                            :
                                                            <button className="homgreqmsgbtn" disabled>Submit</button>
                                                        }
                                                    </Col>
                                                    <Col className="forgetpasstext justify_content_ver_hor_center"
                                                        onClick={() => setForgetpassword(false)}>
                                                        Back to Login
                                                    </Col>
                                                </Row>
                                            </form> */}

                                        </>
                                    }
                                </Row>
                            </Row>
                        </Col>
                        <Col sm className=" justify_content_ver_hor_end  ">
                            <Row>
                                <img src={CM} alt="" className="" />
                            </Row>
                        </Col>
                    </>
                    :
                    <>

                        <Col sm className=" justify_content_center  ">
                            <Row className="   ">
                                <Row className="homreqmsgrect " >
                                    <Row >
                                        <Col className=" justify_content_center mt-4">
                                            <img src={Appointment} alt="" className="login_logo" />
                                        </Col>
                                    </Row>
                                    {!forgetpassword ?
                                        <form onSubmit={login}>
                                            <Row className="loginhead mt-3">Login</Row>
                                            <Row className=" justify_content_center  ">
                                                <Row className="floating-label mt-4">
                                                    <input className="floating-input" type="text" placeholder=" "
                                                        required
                                                        onChange={e => setMobileno(e.target.value)}
                                                    />
                                                    <span className="highlight"></span>
                                                    <label>Email</label>
                                                </Row>
                                                <Row className="floating-label mt-4">
                                                    <input className="floating-input" type="password" placeholder=" "
                                                        required
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                    <span className="highlight"></span>
                                                    <label>Password</label>
                                                </Row>

                                                <Row className="justify_content_center mt-3 mb-2">
                                                    <Col>
                                                        <button className="homgreqmsgbtn">Submit</button>
                                                    </Col>
                                                    <Col className="forgetpasstext justify_content_ver_hor_center"
                                                        onClick={() => setForgetpassword(true)}>
                                                        Register
                                                    </Col>
                                                    {/* <Col className="forgetpasstext justify_content_ver_hor_center"
                                                        onClick={() => setForgetpassword(true)}>
                                                        Forget Password?
                                                    </Col> */}
                                                </Row>
                                            </Row>
                                        </form>
                                        :
                                        <>
                                            <Row className="loginhead mt-1">Register</Row>
                                            <Row className="floating-label mt-4">
                                                <input className="floating-input" type="mobile" placeholder=" "
                                                    pattern="[A-Za-z ]+"
                                                    required
                                                    onChange={e => setName(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Full Name*</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="mobile" placeholder=" "
                                                    pattern="[6-9]\d{9}"
                                                    required
                                                    onChange={e => setMobileno(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Mobile No*</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="email" placeholder=" "
                                                    //required
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Email Id</label>
                                            </Row>
                                            <Row className="floating-label mt-3">
                                                <input className="floating-input" type="password" placeholder=" "
                                                    required
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                                <span className="highlight"></span>
                                                <label>Password*</label>
                                            </Row>
                                            <Row className="justify_content_center mt-3 mb-3">
                                                <Col>
                                                    {!rukjlk ?
                                                        <button className="homgreqmsgbtn">Submit</button>
                                                        :
                                                        <button className="homgreqmsgbtn" disabled>Submit</button>
                                                    }
                                                </Col>
                                                <Col className="forgetpasstext justify_content_ver_hor_center"
                                                    onClick={() => setForgetpassword(false)}>
                                                    Login
                                                </Col>
                                            </Row>

                                            {/* <form onSubmit={forgetPass}>
                                                <Row className="floating-label mt-4">
                                                    <input className="floating-input" type="email" placeholder=" "
                                                        //pattern="[1-9]{1}[0-9]{9}"
                                                        required
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                    <span className="highlight"></span>
                                                    <label>Email*</label>
                                                </Row>
                                                <Row className="justify_content_center mt-3 mb-2">
                                                    <Col>
                                                        {!rukjlk ?
                                                            <button className="homgreqmsgbtn">Submit</button>
                                                            :
                                                            <button className="homgreqmsgbtn" disabled>Submit</button>
                                                        }

                                                    </Col>
                                                    <Col className="forgetpasstext justify_content_ver_hor_center"
                                                        onClick={() => setForgetpassword(false)}>
                                                        Back to Login
                                                    </Col>
                                                </Row>
                                            </form> */}

                                        </>
                                    }
                                </Row>
                            </Row>
                        </Col>
                        <Col am className=" justify_content_ver_hor_end " style={{ marginTop: "00px" }}>
                            <Row>
                                <img src={CM} alt="" className="vidhayak_img" />
                            </Row>
                        </Col>
                        <Col sm={1}></Col>
                    </>
                }
                {/* <Row>123</Row> */}
            </Row >
        </>
    )
}

export default Homepage