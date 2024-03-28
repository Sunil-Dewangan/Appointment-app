import React, { useState, useEffect } from "react"
import { Row, Col, Card } from "react-bootstrap"
import Url from "./Url"
import { Link } from "react-router-dom"
//import DataTable from "react-data-table-component";
import Navigation from "./Navadmin"
//import { Link } from "react-router-dom"

// import Leftvericalmenu from "./Leftverticalmenu"
// import department_vector from "./Images/department_vector.png"

const Summary = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    // const [s3url, setS3url] = useState(s3)

    const usertoken = localStorage.getItem("usertoken")
    //const [searchcontent, setSearchcontent] = useState("")

    var date = new Date();

    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
   

    const [reports, setReports] = useState([])
    const [mandalreport, SetMandalreport] = useState('');

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

    useEffect(() => {
        const api = url + "All_report/" + formattedDate

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata.mandal_wise)
                setReports(actualdata)
                SetMandalreport(actualdata.mandal_wise)
            })
    }, [])

    //console.log("mandalreport ", mandalreport)

    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Row className="">
                <Col>

                    <Row><Navigation /></Row>
                    <Row className="appointmentcard mt-2 ">

                        <Row className="appointcenterhead mt-3">
                            <Col sm={1} className="justify_content_left">
                                <Link to="/Dashboardadmin">Dashboard {">"}</Link>
                            </Col>
                            <Col className="justify_content_left">Summary</Col>
                            <Col className="justify_content_right">
                            <button button className="btn btn-primary no-print" onClick={() => window.print()}>Print</button>
                            </Col>
                        </Row>

                        <Row className="depttablebox mt-2">
                            <Row className="homereqmsghead justify_content_center">Summary</Row>
                            <Col >
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col sm={9}>
                                                <Card
                                                    bg=""
                                                    className="summarycard_1 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_1">
                                                            Today's Complaints
                                                            <br/>
                                                            {formattedDate}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={3}>
                                                <Card
                                                    bg=""
                                                    className="summarydatacard_1 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarydatacardtext_1">
                                                            {reports.today_complaint} 
                                                            
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="summaryhead justify_content_center mt-2">Mandal wise Complaint</Row>
                                        {/* <Row className="mt-2">
                                            <Col>
                                                <Row className="appointsummarytype mt-2">
                                                    Select Mandal*
                                                </Row>
                                                <Row >
                                                    <select className="createdeptmodalinput"
                                                        required
                                                        onChange={(e) => {
                                                            setMandal(e.target.value)
                                                        }}>
                                                        <option value="">Select</option>
                                                        {
                                                            mandallist.length > 0 ?
                                                                mandallist.map(item => (
                                                                    <option value={item.mandal}>{item.mandal}</option>
                                                                ))
                                                                :
                                                                null
                                                        }
                                                    </select>
                                                </Row>
                                            </Col>
                                        </Row> */}
                                        
                                        {
                                            mandalreport.length > 0 ?
                                            mandalreport.map(item => (
                                                    <Row className="mt-3">
                                                        <Col sm={9}>
                                                            <Card
                                                                bg=""
                                                                className="summarycard_2 "
                                                            >
                                                                <Card.Body>
                                                                    <Card.Title className="summarycardtitle_2">
                                                                        {item.mandal}
                                                                    </Card.Title>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                        <Col sm={3}>
                                                            <Card
                                                                bg=""
                                                                className="summarydatacard_2 "
                                                            >
                                                                <Card.Body>
                                                                    <Card.Title className="summarydatacardtext_2">
                                                                        {item.total_complaints}
                                                                    </Card.Title>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>

                                                    </Row>
                                                ))
                                                :
                                                null
                                        }
                                        
                                    </Col>

                                    <Col>
                                        <Row className="justify_content_center mt-5 mx-5">
                                            <Col>
                                                <Card
                                                    bg=""
                                                    className="summarycard_3 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_3">
                                                            Total Complaints
                                                        </Card.Title>
                                                        <Card.Text className="summarydatacardtext_3  ">
                                                            {reports.total_complaints}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col>
                                        <Row className="summaryhead justify_content_center">Complainant by Status</Row>
                                        <Row className="mt-3">
                                            <Col sm={9}>
                                                <Card
                                                    bg=""
                                                    className="summarycard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_4">
                                                            Solved Complaints
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={3}>
                                                <Card
                                                    bg=""
                                                    className="summarydatacard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarydatacardtext_4">
                                                            {reports.solved_complaint}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm={9}>
                                                <Card
                                                    bg=""
                                                    className="summarycard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_4">
                                                            Unsolved Complaints
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={3}>
                                                <Card
                                                    bg=""
                                                    className="summarydatacard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarydatacardtext_4">
                                                            {reports.unsolved_complaint}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm={9}>
                                                <Card
                                                    bg=""
                                                    className="summarycard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_4">
                                                            Ongoing Complaints
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={3}>
                                                <Card
                                                    bg=""
                                                    className="summarydatacard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarydatacardtext_4">
                                                            {reports.Ongoing_complaint}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm={9}>
                                                <Card
                                                    bg=""
                                                    className="summarycard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_4">
                                                            Not Relevant Complaints
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={3}>
                                                <Card
                                                    bg=""
                                                    className="summarydatacard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarydatacardtext_4">
                                                            {reports.notrel_complaint}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm={9}>
                                                <Card
                                                    bg=""
                                                    className="summarycard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarycardtitle_4">
                                                            Deleted Complaints
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col sm={3}>
                                                <Card
                                                    bg=""
                                                    className="summarydatacard_4 "
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="summarydatacardtext_4">
                                                            {reports.deleted_complaint}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </Row>
                </Col>
            </Row>






        </>
    )
}

export default Summary