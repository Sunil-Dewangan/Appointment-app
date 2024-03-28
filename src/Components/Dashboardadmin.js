import React, { useEffect, useState } from "react"
import { Row, Col, Card, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
//import DataTable from "react-data-table-component";
import Url from "./Url"
import Navigation from "./Navadmin"
import loadinggif from "./Images/giphy.gif"
import { FaUserAlt } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { TbReport } from "react-icons/tb";


const Dashboardadmin = () => {

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

    //const [hideleftnav, setHideleftnav] = useState(false)

    // const [data, setData] = useState([])
    // const [search, SetSearch] = useState('');
    // const [filter, setFilter] = useState([]);

    // const column = [
    //     {
    //         name: "S. no.",
    //         selector: row => row.id,
    //         sortable: true
    //     },
    //     {
    //         name: "Compliant ID",
    //         selector: row => row.UCID,
    //         sortable: true
    //     },
    //     {
    //         name: "Name",
    //         selector: row => row.Complainant_name,
    //         sortable: true
    //     },
    //     {
    //         name: "Mobile no",
    //         selector: row => row.mobileno,
    //         sortable: true
    //     },
    //     {
    //         name: "User Email",
    //         selector: row => row.User_email,
    //         sortable: true
    //     },
    //     {
    //         name: "Mandal",
    //         selector: row => row.mandal,
    //         sortable: true
    //     },
    //     {
    //         name: "Booth",
    //         selector: row => row.booth,
    //         sortable: true
    //     },
    //     {
    //         name: "Complaint Deparment",
    //         selector: row => row.complaint_deparment,
    //         sortable: true
    //     }
    //     ,
    //     {
    //         name: "Complaint Type",
    //         selector: row => row.complaint_type,
    //         sortable: true
    //     },
    //     {
    //         name: "Complaint Description",
    //         selector: row => row.complaint_description,
    //         sortable: true
    //     },
    //     {
    //         name: "Remark",
    //         selector: row => row.complaint_remark,
    //         sortable: true
    //     },
    //     {
    //         name: "Created on",
    //         selector: row => row.created_at,
    //         sortable: true
    //     },
    //     {
    //         name: "Status",
    //         selector: row => (row.solved==="No"? "New Complaint": row.solved==="Yes"? "Complaint solved": row.solved==="NR"? "Not relevant": "Ongoing"),
    //         sortable: true
    //     },
    //     {
    //         name: "Document",
    //         selector: (row) => (
    //             row.complaint_pic === "NA" ?
    //                 "No document uploded"
    //                 :
    //                 <a href={s3url + row.complaint_pic} target='_blank'>
    //                     Download
    //                 </a>
    //         )
    //     },

    //     {
    //         name: "View",
    //         cell: (row) => (
    //             <Link to={"/Viewcomplaintadmin/" + row.id} target="_blank">
    //                 <button className="btn btn-primary" >View</button>
    //             </Link>
    //         )
    //     },
    //     // {
    //     //     name: "Action",
    //     //     cell: (row) => (
    //     //         <button className="btn btn-danger" onClick={() => delUser(row.id)}>Delete</button>
    //     //     )
    //     // }
    // ]

    // useEffect(() => {
    //     const api = url + "getcomplaint"

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
    //                 setData(actualdata)
    //                 setFilter(actualdata)
    //             }
    //         })
    // }, [])

    // const tableHeaderstyle = {
    //     headCells: {
    //         style: {
    //             fontWeight: "bold",
    //             fontSize: "14px",
    //             backgroundColor: "#ccc"

    //         },
    //     },
    // }

    // useEffect(() => {
    //     const result = data.filter((item) => {
    //         return item.User_email.toLowerCase().match(search.toLocaleLowerCase());
    //     });
    //     setFilter(result);
    // }, [search]);

    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
        /*setRukjlk(true)
        window.setTimeout(() => {
            setRukjlk(false)
        }, 5000)*/
    }, [])

    // if (usertoken !== null || usertoken === null) {
    //     //history.push("/Employerdashboard")
    //     var today = new Date();
    //     var x = (today.getDate() + today.getMonth() + today.getFullYear() + "/")
    //     // if (usertoken === btoa(x)) {
    //     //     history.push("/")
    //     // }
    //     if (x !== atob(usertoken)) {
    //         alert("")
    //         history.push("/")
    //     }
    // }

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


                    {/* {!mobilescr ?
                            <Col sm={1} className="dashsidemenu mx-1">
                                <Leftvericalmenu />
                            </Col>
                            :
                            <Col xs={2} className="dashsidemenu mx-1">
                                <Leftvericalmenu />
                            </Col>
                        } */}
                    <Row>
                        {/* <Row><img src={logo} alt="beamslogo" className="beamslogonew mt-2 mb-2" /></Row> */}
                        <Row><Navigation /></Row>
                        {/* <Row className="mt-5"></Row>
                            <Row className="mt-5"></Row> */}
                        {/*!hideleftnav ?
                                <Row onClick={() => { setHideleftnav(true) }}>
                                    {"<---"}
                                </Row>
                                :
                                <Row onClick={() => { setHideleftnav(false) }}>
                                    {"--->"}
                                </Row>
                            */}

                        <Row className="dashrowbg">
                            <div >
                                <Row>
                                    {/* <Col sm>
                                        <Card
                                            bg="primary"
                                            className="dashtopcard  mb-5"
                                        >
                                            <Link to="/Todaycomplaint">
                                                <Card.Body bg="primary"
                                                    className="dashtopcard ">
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><FiPhoneCall alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">Today's Complaint </span>
                                                    </Card.Title>
                                                    
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col> */}
                                    <Col sm>
                                        <Card
                                            bg="primary"
                                            className="dashtopcard  mb-5"
                                        >
                                            <Link to="/Adminallappointments">
                                                <Card.Body bg="secondary"
                                                    className="dashtopcard ">
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><FiPhoneCall alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">All Appointments </span>
                                                    </Card.Title>
                                                    
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col>
                                    <Col sm></Col>
                                    <Col sm>
                                        {/* <Card
                                            bg="info"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Adduser">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle mt-0">
                                                        <span><FaUserAlt alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0">   Add User </span></Card.Title>
                                                    
                                                </Card.Body>
                                            </Link>
                                        </Card> */}
                                    </Col>
                                    
                                    <Col sm>
                                        {/* <Card
                                            bg="danger"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Adminreportdash">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><TbReport alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0"> Reports</span>
                                                    </Card.Title>
                                                   
                                                </Card.Body>
                                            </Link>
                                        </Card> */}
                                    </Col>
                                    </Row>
                                    <Row>
                                    {/* <Col sm>
                                         <Card
                                            bg="secondary"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Adminassigncomplaint">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><TbReport alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0"> Booth Master</span>
                                                    </Card.Title>
                                                    <Card.Text className="dashtopcardtext justify_content_right ">
                                                        2
                                                    </Card.Text>
                                                </Card.Body>
                                            </Link>
                                        </Card>
                                    </Col> */}
                                    <Col sm>
                                         {/* <Card
                                            bg="warning"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Departmentmaster">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><TbReport alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0"> Department Master</span>
                                                    </Card.Title>
                                                    <Card.Text className="dashtopcardtext justify_content_right ">
                                                        2
                                                    </Card.Text>
                                                </Card.Body>
                                            </Link>
                                        </Card> */}
                                    </Col>
                                    <Col sm>
                                        {/* <Card
                                            bg="success"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Boothmaster">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><TbReport alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0"> Mandal/Booth Master</span>
                                                    </Card.Title>
                                                    
                                                </Card.Body>
                                            </Link>
                                        </Card> */}
                                        </Col>
                                    <Col sm>
                                    {/* <Card
                                            bg="dark"
                                            className="dashtopcard mb-5"
                                        >
                                            <Link to="/Deletedcomplaint">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><TbReport alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0"> Deleted Complaints</span>
                                                    </Card.Title>
                                                   
                                                </Card.Body>
                                            </Link> 
                                        </Card>*/}
                                    </Col>
                                    <Col sm>
                                    {/* <Card
                                            bg=""
                                            
                                            className="dashtopcard_2 mb-5"
                                        >
                                            <Link to="/Summary">
                                                <Card.Body>
                                                    <Card.Title className="dashtopcardtitle">
                                                        <span><TbReport alt="" className="dashtopcardimg" /></span>
                                                        <span className="mt-0"> Summary</span>
                                                    </Card.Title>
                                                    
                                                </Card.Body>
                                            </Link>
                                        </Card> */}
                                    </Col>
                                </Row>
                                <Row>
                                    {/* <Col sm={1}></Col> */}
                                    {/* <Col sm >
                                        <Card
                                            bg=""
                                            className=" justify_content_center  mb-5"
                                        >
                                        

                                            <DataTable
                                                customStyles={tableHeaderstyle}
                                                columns={column}
                                                data={filter}
                                                pagination
                                                // selectableRows
                                                fixedHeader
                                                selectableRowsHighlight
                                                highlightOnHover
                                                // actions={
                                                //     <button className="btn btn-success"
                                                //         onClick={() => JSONToCSVConvertor(data, "_User List", true)}
                                                //     >Export Excel</button>
                                                // }
                                                subHeader
                                                subHeaderComponent={
                                                    <input type="text"
                                                        className="w-100 form-control"
                                                        placeholder="Search..."
                                                        value={search}
                                                        onChange={(e) => SetSearch(e.target.value)}

                                                    />
                                                }
                                                subHeaderAlign="left"

                                            />

                                        </Card>
                                    </Col> */}
                                    {/* <Col sm={1}></Col> */}
                                </Row>
                            </div>

                            {/* <div>
                                <DonutChart value={value} />
                            </div> */}


                            {/* <div className="dashmenubg mt-0">
                                    <div className="justify_content_left" >

                                        <span >
                                            <Link to="/Dashboardadmin">
                                                <Row className=" dashiconbg justify_content_center">
                                                    <IoShirt className="" alt="" style={{color:"blue", fontSize:"40px"}}/>
                                                </Row>
                                                <Row className="dashcardhead justify_content_center mt-1">
                                                    Master
                                                </Row>
                                            </Link>
                                        </span>

                                        <span >
                                            <Row className="dashiconbg justify_content_center">
                                                <img src={user_icon} className="" alt="" />
                                            </Row>
                                            <Row className="dashcardhead justify_content_center mt-1">
                                                Create Users
                                            </Row>
                                        </span>


                                    </div>

                                    
                                </div> */}

                        </Row>

                    </Row>

                </>
                :
                null
            }

        </>
    )
}

export default Dashboardadmin