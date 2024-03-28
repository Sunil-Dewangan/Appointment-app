import React, { useEffect, useState } from "react"
import { Row, Col, Card, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import Url from "./Url"
import Navigation from "./Navadmin"
import loadinggif from "./Images/giphy.gif"
import { FiPhoneCall } from "react-icons/fi";
import { GrCompliance } from "react-icons/gr";



const Adminreportdash = () => {

    // const navigate = useNavigate();

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)


    const usertoken = localStorage.getItem("usertoken")
    //const userimage = localStorage.getItem("userimage")
    //const user_name = localStorage.getItem("user_name")

    const [mobilescr, setMobilescr] = useState(false)
    const [getdevwidth, setGetdevwidth] = useState("")

    useEffect(() => {

        setGetdevwidth(window.innerWidth + 'px')

        if (window.innerWidth <= 500) {
            setMobilescr(true)
        }
        //console.log(getdevwidth)

    }, [getdevwidth])

    const [rukjlk, setRukjlk] = useState(false)


    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
        /*setRukjlk(true)
        window.setTimeout(() => {
            setRukjlk(false)
        }, 5000)*/
    }, [])



    return (
        <>

            <Modal
                size="sm"
                show={rukjlk}
                centered
                aria-labelledby="example-modal-sizes-title-sm"

            >
                <Modal.Header className="">
                    <img src={loadinggif} alt="" className="modalbgruk" />
                </Modal.Header>

            </Modal>
            {/*<Row className="Loginheading jstfy_all_cntr mt-2">
                Dashboard
            </Row>*/}

            {!rukjlk ?
                <>

                    <Row>

                        <Row><Navigation /></Row>

                        <Row className="dashrowbg">
                            <div >
                                <Row className="appointcenterhead mt-3">

                                    <Col sm={1} className="justify_content_left">
                                        <Link to="/Dashboardadmin">Dashboard {">"}</Link>
                                    </Col>

                                    <Col className="justify_content_left">Reports</Col>

                                </Row>

                                <Row className="homereqmsghead justify_content_center mt-1">
                                    Reports
                                </Row>

                                <Row className="mt-5">
                                    <Col sm>

                                        <Card
                                            bg="dark"
                                            className="dashtopcard  mb-5"
                                        >
                                            <Link to="/Adminunsolvedcomp">
                                                <Card.Body bg="primary"
                                                    className="dashtopcard ">
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><FiPhoneCall alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">Unsolved Complaints </span>
                                                    </Card.Title>
                                                    {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                    20
                                                </Card.Text> */}
                                                </Card.Body>
                                            </Link>
                                        </Card>

                                    </Col>
                                    <Col sm>
                                        <Card
                                            bg="success"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Adminsolvedcomp">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle mt-0">
                                                        <span><GrCompliance alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">  Solved Complaints </span></Card.Title>
                                                    {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                        8
                                                    </Card.Text> */}
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                    <Col sm>
                                        <Card
                                            bg="warning"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Admindatebtwncomp">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><GrCompliance alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">   Complaints by date</span>
                                                    </Card.Title>
                                                    {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                        16
                                                    </Card.Text> */}
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                    <Col sm>
                                        <Card
                                            bg="info"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Adminmandalcomp">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><GrCompliance alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">Complaints by Mandal/ Booth</span>
                                                    </Card.Title>
                                                    {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                        16
                                                    </Card.Text> */}
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col sm>
                                        <Card
                                            bg="secondary"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Admincompbystatus">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><GrCompliance alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">Complaints by Status</span>
                                                    </Card.Title>
                                                    {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                        16
                                                    </Card.Text> */}
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                    <Col sm>
                                        <Card
                                            bg="danger"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Admincompbyuser">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><GrCompliance alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">Complaints by User</span>
                                                    </Card.Title>
                                                    {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                        16
                                                    </Card.Text> */}
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                    <Col sm></Col>
                                    <Col sm></Col>
                                </Row>
                            </div>

                        </Row>

                    </Row>

                </>
                :
                null
            }

        </>
    )
}

export default Adminreportdash