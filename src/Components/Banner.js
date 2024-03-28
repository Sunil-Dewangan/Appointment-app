import React, { useState, useEffect } from "react"
import "./Styles.css"
import { Row, Col, Form, Modal } from 'react-bootstrap';
import Navigation from "./Navadmin";
import { FcPlus } from "react-icons/fc";
// import Url from '../Url';

const Banner = () => {

    // const url1 = Url()
    // const url = url1["url"]
    // const s3 = url1["s3"]

    const [addbannermodal, setAddbannermodal] = useState(false)

    // const [searchstudent, setSearchstudent] = useState(null)
    // const [projectapproved, setProjectapproved] = useState(false)
    // const [projectrejectmodal, setProjectrejectmodal] = useState(false)
    // const [project_comment, setProject_comment] = useState("")

    // const [projectid, setProjectid] = useState("")

    // const [approvedprojectonly, setApprovedprojectonly] = useState(0)

    // const [s3url, setS3url] = useState(s3 + 'projectupload/')

    // useEffect(() => {
    //     const api = url + "getAllPendingProjects/" + approvedprojectonly
    //     fetch(api, {
    //         method: 'GET',
    //     })
    //         .then((apidata1) => {
    //             return apidata1.json()
    //         })
    //         .then((actualdata1) => {
    //             //console.log(actualdata1)
    //             setPendingprojects(actualdata1)
    //         })
    // }, [projectapproved, approvedprojectonly])


    // const approveProject = (id, email, project_name, subject_name) => {
    //     const res = window.confirm("The project will be approved, are you sure?")
    //     if (res) {
    //         const api = url + "ApproveProjects/" + id
    //         fetch(api, {
    //             method: 'POST',
    //             body: JSON.stringify({ id }),
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //             .then((apidata) => {
    //                 //console.log(apidata)
    //                 return apidata.json()
    //             })
    //             .then((actualdata) => {
    //                 //console.log(actualdata)
    //                 if (actualdata["message"] === "project_approved") {
    //                     //toast.success('Project approved successfully ....', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    //                     //setProjectapproved(true)

    //                     const project_status = "approved"
    //                     const api = url + "SendMailForProject"
    //                     fetch(api, {
    //                         method: 'POST',
    //                         body: JSON.stringify({ email, project_name, subject_name, project_status }),
    //                         headers: { 'Content-Type': 'application/json' }
    //                     })
    //                         .then((apidata) => {
    //                             //console.log(apidata)
    //                             return apidata.json()
    //                         })
    //                         .then((actualdata) => {
    //                             //console.log(actualdata)
    //                             if (actualdata["message"] === "Mail Sent") {
    //                                 toast.success('Project approved successfully ....', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    //                                 setProjectapproved(true)

    //                             }
    //                         })
    //                 }
    //             })
    //     }
    // }

    // const rejectProject = (e) => {
    //     e.preventDefault()

    //     const res = window.confirm("The project will be rejected, are you sure?")
    //     if (res) {

    //         const api = url + "UpdateCommentById/" + projectid
    //         fetch(api, {
    //             method: 'POST',
    //             body: JSON.stringify({ project_comment }),
    //             headers: { 'Content-Type': 'application/json' }
    //         })
    //             .then((apidata) => {
    //                 //console.log(apidata)
    //                 return apidata.json()
    //             })
    //             .then((actualdata) => {
    //                 //console.log(actualdata)
    //                 if (actualdata["message"] === "career_detail_updated_successfully") {

    //                     const email = localStorage.getItem("student_email")
    //                     const project_name = localStorage.getItem("project_name")
    //                     const subject_name = localStorage.getItem("subject_name")
    //                     const project_status = "rejected"

    //                     const api = url + "SendMailForProject"
    //                     fetch(api, {
    //                         method: 'POST',
    //                         body: JSON.stringify({ email, project_name, subject_name, project_status }),
    //                         headers: { 'Content-Type': 'application/json' }
    //                     })
    //                         .then((apidata) => {
    //                             //console.log(apidata)
    //                             return apidata.json()
    //                         })
    //                         .then((actualdata) => {
    //                             //console.log(actualdata)
    //                             if (actualdata["message"] === "Mail Sent") {
    //                                 toast.success('Project rejected successfully ....', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    //                                 setProjectrejectmodal(false)
    //                                 setProjectapproved(true)

    //                             }
    //                         })
    //                 }
    //             })
    //     }

    // }

    return (

        <>
            <Modal
                size="lg"
                show={addbannermodal}
                onHide={() => setAddbannermodal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Row>
                    <Col xs={1}></Col>
                    <Col>
                        <Row className="homloginrect">
                            <Col className="mt-0">
                                <Row className="homereqmsghead mt-4">
                                    Add Banner
                                </Row>
                                <Row className="floating-label mt-4">
                                    <textarea className="floating-input" type="text" placeholder=" " style={{ height: '120px' }}
                                        required
                                    />
                                    <span className="highlight"></span>
                                    <label>Banner Name *</label>
                                </Row>

                                <Row className="floating-label mt-4">
                                    <input className="floating-input" type="date" placeholder=" "
                                        required
                                    />
                                    <span className="highlight"></span>
                                    <label>Start Date</label>
                                </Row>
                                <Row className="floating-label mt-4">
                                    <input className="floating-input" type="date" placeholder=" "
                                        required
                                    />
                                    <span className="highlight"></span>
                                    <label>End date</label>
                                </Row>
                                
                                <Row className="justify_content_left mt-5">
                                    <button className="homgreqmsgbtn">Submit</button>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={1}></Col>
                </Row>
            </Modal >

            <Row>
                <Navigation />
            </Row>
            <Row className="mt-5"></Row>
            <Row className="mt-5"></Row>
            <Row className="mt-5 ">
                <Col xs={1}></Col>
                <Col className="justify_content_left"><h3 align="center" ><b>Home Page Banner</b></h3></Col>
                <Col className="justify_content_right">
                <FcPlus onClick={() => { setAddbannermodal(true) }}           className="plusbannericon"/>
                    {/* <button className="navsearchmodalbtn"
                    onClick={() => { setAddbannermodal(true) }}
                >Add new</button> */}
                </Col>
                <Col xs={1}></Col>
                {/* <span className="mt-5">
                    <h3 align="center" ><b>Home Page Banner</b></h3>
                </span> */}
                {/* <span style={{ marginTop: 50, marginLeft: "50px", marginRight: "50px" }}>
                    <Form.Control type="text" className="form-control-CAstudentsearch ml-0"
                        placeholder="Search"                       
                    />
                </span> */}

            </Row>
            <Row>
                <table className="table table-striped tabledata" style={{ marginTop: 50, marginLeft: "50px", marginRight: "50px" }}>
                    <thead>
                        <tr>
                            <th>Banner Name</th>
                            <th>Start date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    {/* {
                        pendingprojects.length > 0 ?
                            pendingprojects.filter((item) => {
                                if (searchstudent === null || searchstudent === "All") { return item }
                                else if (item.student_email.toLowerCase().includes(searchstudent.toLowerCase()) ||
                                    item.project_category.toLowerCase().includes(searchstudent.toLowerCase()) ||
                                    item.project_name.toLowerCase().includes(searchstudent.toLowerCase()) ||
                                    item.project_link.toLowerCase().includes(searchstudent.toLowerCase())) { return item }
                            })
                                .map(item => (
                                    <tbody className="">
                                        <tr>
                                            <td>{item.student_email}</td>
                                            <td>{item.project_category}</td>
                                            <td>{item.project_name}</td>
                                            <td>{item.project_link === "NA" ? "-" : item.project_link}</td>
                                            {item.project_file.includes("not-found") ? "-" :
                                                <a href={s3url + item.project_file} target='_blank'>
                                                    <td>Download file</td>
                                                </a>
                                            }
                                            <td>
                                                <span>
                                                    {approvedprojectonly === 1 ?
                                                        <p className="approved ">Approved</p>

                                                        : <button className="projectapprovebutton"
                                                            onClick={() => approveProject(item.id, item.student_email, item.project_name, item.project_category)}
                                                        >Approved</button>
                                                    }
                                                </span>
                                                <span>
                                                    <button className="projectrejectbutton ml-5"
                                                        onClick={() => {
                                                            setProjectrejectmodal(true)
                                                            setProjectid(item.id)
                                                            localStorage.setItem("student_email", item.student_email)
                                                            localStorage.setItem("project_name", item.project_name)
                                                            localStorage.setItem("subject_name", item.project_category)
                                                        }}
                                                    >Reject</button></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))
                            :
                            <div>
                                No pending project
                            </div>
                    } */}
                </table>

            </Row>
        </>
    );
}

export default Banner