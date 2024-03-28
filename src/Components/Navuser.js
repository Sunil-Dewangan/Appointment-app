import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Row, Col, Navbar, Nav, Modal, Container, Form, Button, NavDropdown, Offcanvas } from "react-bootstrap"
import logo from "./Images/CGgovtlogo.png"
//import logo from "./Images/Janseva_hi_bhavna.png"
//import logo from "./Images/Samadhan_sahayak_hindi.png"
//import logo from "./Images/Ishaan_imgs/beamslogonew.png"
// import { RiArrowDropDownLine } from "react-icons/ri"
import { FaUserAlt, FaSistrix, FaSearch, FaHome } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import Url from "./Url"

const Navuser = () => {

    const url1 = Url()
    const url = url1["url"]

    const usertoken = localStorage.getItem("usertoken")
    const email = localStorage.getItem("email")

    const [password, setPassword] = useState("")
    const [newpassword, setNewpassword] = useState("")

    const [changepasswordmodal, setChangepasswordmodal] = useState(false)


    const [mobilescr, setMobilescr] = useState(false)
    const [getdevwidth, setGetdevwidth] = useState("")

    useEffect(() => {
        setGetdevwidth(window.innerWidth + 'px')
        if (window.innerWidth <= 500) {
            setMobilescr(true)
        }
        //console.log(getdevwidth)
    }, [getdevwidth])

    useEffect(() => {
        const fetchCSRFToken = async () => {
            try {
                const response = await fetch('your-laravel-api-url/sanctum/csrf-cookie', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch CSRF token');
                }

                // CSRF token is now set in cookies, and you're ready to make authenticated requests
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        fetchCSRFToken();
    }, []); // Run once on component mount


    const changePassword = () => {

        const controller = "changePassword"
        const api = url + controller

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${usertoken}`, // Include the bearer token
            },
            body: JSON.stringify({ email, password, newpassword })
        })
            .then((apidata) => {
                //console.log(apidata)
                return apidata.json()
            })
            .then((actualdata) => {
                if (actualdata["message"] === "Incorrect-Password") {
                    alert("Current password is incorrect")
                }
                if (actualdata["message"] === "Password-updated") {
                    alert("Password changed successfully")
                    setChangepasswordmodal(false)
                }

            })
    }



    return (

        <div className="">

            {/*-----------------Change password--------------------*/}
            <Modal
                show={changepasswordmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setChangepasswordmodal(false) }}
                        style={{ cursor: "pointer", marginLeft: "-100px" }}
                    >
                        <IoCloseSharp />
                    </Col>
                </Row>
                <Row className="deptmodalhead">
                    <Col>Change Password</Col>
                </Row>
                <form onSubmit={changePassword}>
                    <Modal.Body>

                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Current Password*
                                </Row>
                                <Row >
                                    <input type="password" placeholder="Enter current password" className="createdeptmodalinput"
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    New Password*
                                </Row>
                                <Row >
                                    <input type="password" placeholder="Enter new password" className="createdeptmodalinput"
                                        required
                                        onChange={e => setNewpassword(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>

                        <Row className="mt-4 mb-3">
                            <Col className="justify_content_center">
                                <button type="submit" className="serachdeptbtn"

                                >Change Password</button>
                            </Col>
                        </Row>

                    </Modal.Body>
                </form>
            </Modal>
            {/*-----------------modal end--------------------*/}

            {!mobilescr ?
                <Navbar bg="" variant="" expand="sm" sticky="top" className='navbg_white'>

                    <Link to="/Dashboarduser">
                        <img src={logo} alt="beamslogo" className="navlogonew1" />
                    </Link>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                            {/* <Link to="/Banner" className='nav-link-black mt-1'>Banner</Link> */}
                            <FaUserAlt className="navuser_black" style={{ marginLeft: "-50px" }} />
                            <NavDropdown title={FaUserAlt} id="basic-nav-dropdown">
                                {/* <NavDropdown.Item href="" onClick={() => setChangepasswordmodal(true)}>Change Password</NavDropdown.Item> */}
                                <NavDropdown.Item href="#/Logout">
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/* <Link to="" className="nav-link-black navigation_dropdown justify_content_right mt-0" ><FaUserAlt className="navuser_black" />
                                <div className="dropdown-content">
                                    <Nav.Link to="" className="nav-link-black dropdown_menu" onClick={() => setChangepasswordmodal(true)}>Change Password</Nav.Link>

                                    <Nav.Link to="/Logout" className="nav-link-black dropdown_menu">Logout</Nav.Link>
                                </div>
                            </Link> */}
                            {/* <Link to="" className="justify_content_right ">
                                <FaUserAlt className="navuser_black" onClick={() => setShowlogin(true)} />
                            </Link> */}
                        </Nav>

                    </Navbar.Collapse>

                </Navbar>

                :
                <>
                    <Navbar expand="sm" className="bg-body-tertiary mb-3" style={{ background: "none" }}>
                        <Container fluid>
                            <Link to="/Dashboarduser">
                                <img src={logo} alt="beamslogo" className="navlogonew" />
                            </Link>
                            <Navbar.Toggle aria-controls="nav-link-black" />
                            <Navbar.Offcanvas

                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title >
                                        <Link to="/Dashboarduser">
                                            <img src={logo} alt="beamslogo" className="navlogonew" />
                                        </Link>
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">

                                        {/* <Nav.Link to="" className="nav-link-black navigation_dropdown mt-0" >Hand weaving sarees{""}<RiArrowDropDownLine style={{ fontSize: "30px" }} />
                                            <div className="dropdown-content">
                                                <Nav.Link to="/" className="nav-link-black dropdown_menu">Pure silk sarees</Nav.Link>
                                                <Nav.Link to="/" className="nav-link-black">Tussar silk</Nav.Link>
                                                <Nav.Link to="/" className="nav-link-black">Art silk</Nav.Link>
                                                <Nav.Link to="/" className="nav-link-black">Semi silk </Nav.Link>
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link to="" className="nav-link-black navigation_dropdown mt-0" >Hand Weaving Salwar suit{""}<RiArrowDropDownLine style={{ fontSize: "30px" }} />
                                            <div className="dropdown-content">
                                                <Nav.Link to="/" className="nav-link-black">Tussar silk</Nav.Link>
                                                <Nav.Link to="/" className="nav-link-black">Art silk</Nav.Link>
                                                <Nav.Link to="/" className="nav-link-black">Semi silk </Nav.Link>
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link to="" className="nav-link-black navigation_dropdown mt-0" >Hand Weaving Kurta{""}<RiArrowDropDownLine style={{ fontSize: "30px" }} />
                                            <div className="dropdown-content">
                                                <Link to="/" className="nav-link-black">Tussar silk</Link>
                                            </div>
                                        </Nav.Link>
                                        <Link to="/Contactus" className='nav-link-black mt-1'>Contact Us</Link>
                                        <Nav.Link to="" className="nav-link-black ">
                                            <FaSistrix className="" />
                                        </Nav.Link> */}
                                        {/* <Nav.Link to="" className="nav-link-black navigation_dropdown mt-0" ><FaUserAlt style={{ fontSize: "30px" }} />
                                            <div className="dropdown-content">
                                                <Link to="" className="nav-link-black"
                                                    onClick={() => setChangepasswordmodal(true)}
                                                >Change Password</Link>
                                                <Link to="/Logout" className="nav-link-black">Logout</Link>
                                            </div>
                                        </Nav.Link> */}
                                        <FaUserAlt className="navuser_black" />
                                        <NavDropdown title={FaUserAlt} id="basic-nav-dropdown">
                                            {/* <NavDropdown.Item href="" onClick={() => setChangepasswordmodal(true)}>Change Password</NavDropdown.Item> */}
                                            <NavDropdown.Item href="#/Logout">
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                    </Nav>

                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>

                    {/* <Navbar bg="light" fixed="bottom" data-bs-theme="dark" style={{ background: "none" }}>
                        <Container>
                            <Nav className="">
                                <Row>
                                    <Col className="">
                                        <Row className="">
                                            <Link to="/" className="nav-link-black justify_content_center">
                                                <FaHome className="bottomnavuser_black" /></Link>
                                        </Row>
                                    </Col>

                                    <Col className="">
                                        <Row>
                                            <Link to="/" className="nav-link-black justify_content_center"><FaSearch className="bottomnavuser_black" /></Link>
                                        </Row>
                                    </Col>
                                    <Col className="">
                                        <Row>
                                            <Link to="/" className="nav-link-black justify_content_center"><FaUserAlt className="bottomnavuser_black" /></Link>
                                        </Row>
                                    </Col>
                                </Row>
                            </Nav>
                        </Container>
                    </Navbar> */}
                </>
            }

        </div >
    )

}

export default Navuser