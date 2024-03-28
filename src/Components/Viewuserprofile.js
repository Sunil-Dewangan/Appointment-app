import React, { useState, useEffect } from "react"
import { Row, Col, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Url from "./Url"
import { Link } from "react-router-dom"
import Dummyprofilepic from "./Images/Dummyprofilepic.png"
import pandummy from "./Images/pandummy.png"
//import DataTable from "react-data-table-component";
import Navigation from "./Navuser"
import { IoCloseSharp } from "react-icons/io5"



const Viewuserprofile = () => {

    const { id } = useParams()

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)

    const usertoken = localStorage.getItem("usertoken")
    const email = localStorage.getItem("email")

    const [updateprofilemodal, setUpdateprofilemodal] = useState("")


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


    // useEffect(() => {
    //     const api = url + "getcomplaintById/" + id

    //     fetch(api, {
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${usertoken}`, }
    //     })
    //         .then((apidata) => {
    //             return apidata.json()
    //         })
    //         .then((actualdata) => {
    //             //console.log(actualdata)
    //             if (actualdata.message != "Fail") {
    //                 setComplaintdetails(actualdata)
    //             }
    //         })
    // }, [])

    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {/*-----------------Update profile modal end--------------------*/}
            <Modal
                show={updateprofilemodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"

            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setUpdateprofilemodal(false) }}
                        style={{ cursor: "pointer", marginLeft: "-100px" }}
                    >
                        <IoCloseSharp />
                    </Col>
                </Row>
                <Row className="deptmodalhead">
                    <Col>Update Profile</Col>
                </Row>
                <Modal.Body>
                    <Row>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Name*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Complainant Name" className="createdeptmodalinput"
                                    required
                                //onChange={e => setComplainant_name(e.target.value)}
                                />
                            </Row>
                        </Col>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Email
                            </Row>
                            <Row >
                                <input type="email" placeholder="Enter email" className="createdeptmodalinput"
                                    //pattern="[1-9]{1}[0-9]{9}"
                                    required
                                //onChange={e => setMobileno(e.target.value)}
                                />
                            </Row>
                        </Col>
                    </Row>

                    <Row>

                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Address*
                            </Row>
                            <Row >
                                <textarea style={{ height: "100px" }} placeholder="Enter address" className="createdeptmodalinput"
                                    required
                                //onChange={e => setComplaint_description(e.target.value)}
                                />
                                {/* <select className="createdeptmodalinput"
                                        required
                                        onChange={e => setComplaint_type(e.target.value)}
                                    >
                                        <option value="">Select type</option>
                                        <option value="Demand">Demand</option>
                                        <option value="Complaint">Complaint</option>
                                        <option value="Suggestion">Suggestion</option>
                                    </select> */}
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Passport Size Photograph*
                            </Row>
                            <Row >
                                <input type="file" placeholder="" className="createdeptmodalinput"
                                    accept=".png, .jpg, .jpeg"
                                //onChange={handleOnChange}
                                />
                            </Row>
                            {/* <Row>File size must be less than 19MB</Row> */}
                        </Col>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                ID Proof*
                            </Row>
                            <Row >
                                <input type="file" placeholder="" className="createdeptmodalinput"
                                    accept=".png, .jpg, .jpeg, .pdf"
                                //onChange={handleOnChange}
                                />
                            </Row>
                            {/* <Row>File size must be less than 19MB</Row> */}
                        </Col>

                    </Row>

                    <Row className="mt-4 mb-3">
                        <Col className="justify_content_center">
                            <button type="submit" className="serachdeptbtn"

                            >Update</button>
                        </Col>
                    </Row>

                </Modal.Body>

            </Modal>
            {/*-----------------Update profile modal end--------------------*/}

            <Row className="">
                {/* <Col sm={1}>
                    <Leftvericalmenu />
                </Col> */}
                <Col>
                    <Row><Navigation /></Row>
                    <Row className="appointmentcard mt-2 ">

                        <Row className="appointcenterhead mt-3">

                            <Col sm={1} className="justify_content_left">
                                <Link to="/Dashboarduser">Dashboard {">"}</Link>
                            </Col>

                            <Col className="justify_content_left">Profile</Col>

                        </Row>
                        <Row className="homereqmsghead justify_content_center mt-1">
                            Profile
                        </Row>
                        <Row>
                            <Col className="appointcentercols jus">
                            </Col>

                            <Col sm={2} className="justify_content_center">
                                <button className="btn btn-primary"
                                    onClick={() => {
                                        setUpdateprofilemodal(true)
                                    }}
                                >Update Profile</button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col sm={1}></Col>
                            <Col sm>
                                <Row className="">
                                    <Col xs={8}>
                                        <Row>
                                            <Col xs={3} className="homfeatureheading mx-2">Name:</Col>
                                            <Col className="homfeaturetext">Dummy User</Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xs={3} className="homfeatureheading mx-2">Mobile No:</Col>
                                            <Col className="homfeaturetext">7000000000</Col>
                                        </Row >
                                        <Row className="mt-3">
                                            <Col xs={3} className="homfeatureheading mx-2">User Email:</Col>
                                            <Col className="homfeaturetext">dummyuser@dummy.com</Col>
                                        </Row >
                                        <Row className="mt-3">
                                            <Col xs={3} className="homfeatureheading mx-2">Address:</Col>
                                            <Col className="homfeaturetext">Dummy address</Col>
                                        </Row >
                                        <Row className="mt-3">
                                            <Col xs={2} className="homfeatureheading mx-2">ID Proof:</Col>
                                            <Col className="homfeaturetext"><img src={pandummy} alt="" className="idimg" /></Col>
                                        </Row >
                                    </Col>

                                    <Col>
                                        <img src={Dummyprofilepic} alt="" className="profilepic" />
                                    </Col>

                                </Row>

                            </Col>
                            {/* <Col>
                                <img src={s3url + complaintdetails.complaint_pic} alt="" className="complaintdetailpic" />
                            </Col> */}
                            <Col sm={1}>
                                
                            </Col>
                        </Row>
                    </Row >

                </Col >
            </Row >
        </>
    )
}

export default Viewuserprofile