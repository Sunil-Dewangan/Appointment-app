import React, { useEffect, useState } from "react"
import { Row, Col, Card, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import Url from "./Url"
//import DataTable from "react-data-table-component";
import Navigation from "./Navuser"
import BJP_logo from "./Images/BJP_logo.png"
import { FaUserAlt } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";



const Dashboarduser = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)

    // const navigate = useNavigate();

    const usertoken = localStorage.getItem("usertoken")
    const email = localStorage.getItem("email")
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

    const [userdata, setUserdata] = useState()

    const [Complainant_name, setComplainant_name] = useState("")
    const [complaint_deparment, setComplaint_deparment] = useState("")
    const [dept_category, setDept_category] = useState("")
    const [compic, setCompic] = useState(null)
    const [complaint_description, setComplaint_description] = useState("")
    const [complaint_type, setComplaint_type] = useState("")
    const [complaint_remark, setComplaint_remark] = useState("")
    const [mobileno, setMobileno] = useState("")
    const [mandal, setMandal] = useState("")
    const [booth, setBooth] = useState("")

    const [mandallist, setMandallist] = useState([])
    const [boothlist, setBoothlist] = useState([])

    const [deptlist, setDeptlist] = useState([])
    const [categorylist, setCategorylist] = useState([])

    // const [addcomplaintmodal, setAddcomplaintmodal] = useState(false)

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
    //         name: "Document",
    //         selector: (row) =>
    //         (
    //             row.complaint_pic === "NA" ?
    //                 "No document uploded"
    //                 :
    //                 <a href={s3url + row.complaint_pic} target='_blank'>
    //                     Download
    //                 </a>
    //         )
    //         // {
    //         //     // row.complaint_pic.includes("png")  ?
    //         //     //     < img src={s3url + row.complaint_pic} height={70} width={70} />
    //         //     //     :
    //         //         <a href={s3url + row.complaint_pic} target='_blank'>
    //         //             {row.complaint_pic}
    //         //         </a>
    //         // }
    //     },

    //     {
    //         name: "View",
    //         cell: (row) => (
    //             <Link to={"/Viewcomplaintuser/" + row.id} target="_blank">
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


    //console.log(compic)

    //const [hideleftnav, setHideleftnav] = useState(false)

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
    //     const api = url + "getuser_infoByemail/" + email

    //     fetch(api, {
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${usertoken}`, }
    //     })
    //         .then((apidata) => {
    //             return apidata.json()
    //         })
    //         .then((actualdata) => {
    //             if (actualdata.message != "Fail") {
    //                 setUserdata(actualdata.name)
    //             }
    //         })
    // }, [])

    // useEffect(() => {
    //     const api = url + "getcomplaintByEmail/" + email

    //     fetch(api, {
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${usertoken}`, }
    //     })
    //         .then((apidata) => {
    //             return apidata.json()
    //         })
    //         .then((actualdata) => {
    //             if (actualdata.message != "Fail") {
    //                 setData(actualdata)
    //                 setFilter(actualdata)
    //             }
    //         })
    // }, [])


    // useEffect(() => {
    //     const api = url + "getmandalList"

    //     fetch(api, {
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${usertoken}`, }
    //     })
    //         .then((apidata) => {
    //             return apidata.json()
    //         })
    //         .then((actualdata) => {
    //             //console.log(actualdata[0])
    //             if (actualdata.message != "Fail") {
    //                 setMandallist(actualdata)
    //             }
    //         })
    // }, [])

    // const getBooth = (mandal) => {
    //     //alert(mandal)

    //     const api = url + "getboothByMandal_List/" + mandal

    //     fetch(api, {
    //         method: 'GET',
    //         headers: { Authorization: `Bearer ${usertoken}`, }
    //     })
    //         .then((apidata) => {
    //             return apidata.json()
    //         })
    //         .then((actualdata) => {
    //             // console.log(actualdata)
    //             if (actualdata.message != "Fail") {
    //                 const concatenatedBoothList = actualdata.map(item => `${item.booth_no} - ${item.booth}`);
    //                 setBoothlist(concatenatedBoothList)
    //             }
    //         })
    // }

    // useEffect(() => {
    //     const api = url + "geDpartmentlist"

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
    //                 setDeptlist(actualdata)
    //             }
    //         })
    // }, [])

    // const getCategory = (dept_name) => {
    //     //alert(mandal)

    //     const api = url + "getDeptCategory/" + dept_name

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

    //                 setCategorylist(actualdata)
    //             }
    //         })
    // }

    //console.log(boothlist)


    const handleOnChange = e => {
        // console.log(e.target.files[0]);
        setCompic(e.target.files[0]);
    };
    //console.log(compic)
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     //if await is removed, console log will be called before the uploadFile() is executed completely.
    //     //since the await is added, this will pause here then console log will be called
    //     let res = await createComplaint(compic);
    //     console.log(res.data);
    // };

    // const createComplaint = () => {
    //     ///////////////////////
    //     // return
    //     //console.log(compic)
    //     var compaintid
    //     setAddcomplaintmodal(false)
    //     setRukjlk(true)

    //     const formData = new FormData()
    //     formData.append("pic", compic)

    //     if (compic === null) {
    //         const complaint_pic = "NA"
    //         const User_email = email

    //         //const controller = "createcomplaint"
    //         const api = url + "createcomplaint"
    //         fetch(api, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${usertoken}`, // Include the bearer token
    //             },
    //             body: JSON.stringify({ User_email, complaint_deparment, dept_category, complaint_type, complaint_description, complaint_remark, complaint_pic, mobileno, Complainant_name, mandal, booth }),
    //         })
    //             .then((op) => {
    //                 return op.json()
    //             })
    //             .then((op1) => {
    //                 //console.log(op1)
    //                 if (op1["message"] === "success") {
    //                     alert("Complaint registered successfully")
    //                     //setAddcomplaintmodal(false)

    //                     sendSMS(op1["UCID"])
    //                     setRukjlk(false)
    //                 }
    //             })
    //     }
    //     else {
    //         fetch(url + 'picUpload', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 Authorization: `Bearer ${usertoken}`, // Include the bearer token
    //             }
    //         })
    //             .then((op) => {
    //                 return op.json()
    //             })
    //             .then((op1) => {
    //                 return op1
    //             })
    //             ///////////////////////////
    //             .then((op2) => {
    //                 console.log(op2)

    //                 const complaint_pic = op2["message"]
    //                 const User_email = email

    //                 //const controller = "createcomplaint"
    //                 const api = url + "createcomplaint"
    //                 fetch(api, {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${usertoken}`, // Include the bearer token
    //                     },
    //                     body: JSON.stringify({ User_email, complaint_deparment, dept_category, complaint_type, complaint_description, complaint_remark, complaint_pic, mobileno, Complainant_name, mandal, booth }),
    //                 })
    //                     .then((op) => {
    //                         return op.json()
    //                     })
    //                     .then((op1) => {
    //                         //console.log(op1)
    //                         if (op1["message"] === "success") {
    //                             alert("Complaint registered successfully")
    //                             sendSMS(op1["UCID"])
    //                             //setAddcomplaintmodal(false)
    //                             setRukjlk(false)
    //                         }
    //                     })
    //             })
    //     }
    // }

    // const sendSMS = async (UCID) => {

    //     const response = await fetch('http://alertbox.in/pushsms.php?username=rkrohit&api_password=8925bh6j3aalafjbx&sender=BHWANA&to=' + mobileno + '&message=%E0%A4%9C%E0%A4%A8%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%B9%E0%A5%80%20%E0%A4%AD%E0%A4%BE%E0%A4%B5%E0%A4%A8%E0%A4%BE%2C%20%0A%0A%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A4%BE%20%E0%A4%86%E0%A4%B5%E0%A5%87%E0%A4%A6%E0%A4%A8%20%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE%E0%A4%AF%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%96%E0%A5%8D%E0%A4%AF%E0%A4%BE%20' + UCID + '%20%E0%A4%95%E0%A5%87%20%E0%A4%B8%E0%A4%BE%E0%A4%A5%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%E0%A4%95%E0%A5%83%E0%A4%A4%20%E0%A4%95%E0%A4%B0%20%E0%A4%B2%E0%A4%BF%E0%A4%AF%E0%A4%BE%20%E0%A4%97%E0%A4%AF%E0%A4%BE%20%E0%A4%B9%E0%A5%88%7C%20%E0%A4%9C%E0%A4%B2%E0%A5%8D%E0%A4%A6%20%E0%A4%B9%E0%A5%80%20%E0%A4%86%E0%A4%AA%E0%A4%B8%E0%A5%87%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A4%B0%20%E0%A4%86%E0%A4%B5%E0%A5%87%E0%A4%A6%E0%A4%A8%20%E0%A4%95%E0%A5%80%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%97%E0%A4%A4%E0%A4%BF%20%E0%A4%8F%E0%A4%B5%E0%A4%82%20%E0%A4%B5%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%AE%E0%A4%BE%E0%A4%A8%20%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BF%E0%A4%A4%E0%A4%BF%20%E0%A4%95%E0%A5%80%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%8B%20%E0%A4%89%E0%A4%AA%E0%A4%B2%E0%A4%AC%E0%A5%8D%E0%A4%A7%20%E0%A4%95%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%88%20%E0%A4%9C%E0%A4%BE%E0%A4%B5%E0%A5%87%E0%A4%82%E0%A4%97%E0%A5%80%E0%A5%A4%20%0A%0A%E0%A4%A7%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%BE%E0%A4%A6%2C%20%0A%0A%E0%A4%AD%E0%A4%BE%E0%A4%B5%E0%A4%A8%E0%A4%BE%20%E0%A4%AC%E0%A5%8B%E0%A4%B9%E0%A4%B0%E0%A4%BE%20%0A%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%BE%E0%A4%AF%E0%A4%95%20-%20%E0%A4%AA%E0%A4%82%E0%A4%A1%E0%A4%B0%E0%A4%BF%E0%A4%AF%E0%A4%BE&unicode=1&priority=8&e_id=1701163127039127801&t_id=1707170722353964975');
    //     const data = await response.json();
    //     // Use the fetched data
    // };


    // Function to send SMS
    // function sendSMS() {

    //     fetch(smsApi, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${usertoken}`, // Include the bearer token
    //         },
    //         body: new URLSearchParams({
    //             username: 'rkrohit',
    //             password: '45c48lyq92mi56kf2', // Use either account password or api_password
    //             sender: 'YourSenderID',
    //             to: mobileno, // Replace with the recipient's number
    //             message: 'Your complaint has been registered successfully.',
    //             result_type: '2',
    //             priority: '11', // Replace with the appropriate route id
    //         }),
    //     })
    //         .then((smsResponse) => smsResponse.json())
    //         .then((smsResult) => {
    //             console.log('SMS sent successfully:', smsResult);
    //         })
    //         .catch((smsError) => {
    //             console.error('Error sending SMS:', smsError);
    //         });
    // }


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
                className="modal-backdrop"
            >
                <Modal.Body>
                    <Row className="">
                        <img src={BJP_logo} alt="" className="modalbgruk" />
                    </Row>
                    <Row className="Loginheading jstfy_all_cntr mt-2">
                        Please wait, Registering Complaint!
                    </Row>
                </Modal.Body>
            </Modal>
            {/*<Row className="Loginheading jstfy_all_cntr mt-2">
                Dashboard
            </Row>*/}

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

                {/*-----------------Add Complaint modal--------------------*/}
                {/* <Modal
                    show={addcomplaintmodal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="modalbg"
                >
                    <Row className="justify_content_center">
                        <Col className="appointmodalhead"></Col>
                        <Col xs={1} className="appointmodalhead"
                            onClick={() => { setAddcomplaintmodal(false) }}
                            style={{ cursor: "pointer", marginLeft: "-100px" }}
                        >
                            <IoCloseSharp />
                        </Col>
                    </Row>
                    <Row className="deptmodalhead">
                        <Col>Add Complaint</Col>
                    </Row>
                    <form onSubmit={createComplaint}>
                        <Modal.Body>
                            <Row>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complainant Name*
                                    </Row>
                                    <Row >
                                        <input type="text" placeholder="Enter Complainant Name" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplainant_name(e.target.value)}
                                        />
                                    </Row>
                                </Col>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Mobile no*
                                    </Row>
                                    <Row >
                                        <input type="text" placeholder="Enter mobile no" className="createdeptmodalinput"
                                            pattern="[1-9]{1}[0-9]{9}"
                                            required
                                            onChange={e => setMobileno(e.target.value)}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Mandal*
                                    </Row>
                                    <Row >
                                        <select className="createdeptmodalinput"
                                            required
                                            onChange={(e) => {
                                                setMandal(e.target.value)
                                                getBooth(e.target.value)
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
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Booth*
                                    </Row>
                                    <Row >
                                        <select className="createdeptmodalinput"
                                            required
                                            onChange={(e) => { setBooth(e.target.value) }}>
                                            <option value="">Select</option>
                                            {
                                                boothlist.length > 0 ?
                                                    boothlist.map(item => (
                                                        <option value={item}>{item}</option>
                                                    ))
                                                    :
                                                    null
                                            }
                                        </select>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>

                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complaint type*
                                    </Row>
                                    <Row >
                                        
                                        <select className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_type(e.target.value)}
                                        >
                                            <option value="">Select type</option>
                                            <option value="Demand">Demand</option>
                                            <option value="Complaint">Complaint</option>
                                            <option value="Suggestion">Suggestion</option>
                                        </select>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complaint department*
                                    </Row>
                                    <Row >
                                        
                                        <select className="createdeptmodalinput"
                                            required
                                            onChange={(e) => {
                                                setComplaint_deparment(e.target.value)
                                                getCategory(e.target.value)
                                            }}
                                        >
                                            <option value="">Select type</option>
                                            {
                                                deptlist.length > 0 ?
                                                    deptlist.map(item => (
                                                        <option value={item.dept_name
                                                        }>{item.dept_name
                                                            }</option>
                                                    ))
                                                    :
                                                    null
                                            }
                                            <option value="अन्य">अन्य</option>
                                        </select>
                                    </Row>
                                </Col>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complaint Category*
                                    </Row>
                                    <Row >
                                        <select className="createdeptmodalinput"
                                            required
                                            onChange={e => setDept_category(e.target.value)}
                                        >
                                            <option value="">Select type</option>
                                            {
                                                categorylist.length > 0 ?
                                                    categorylist.map(item => (
                                                        <option value={item.
                                                            dept_category}>{item.
                                                                dept_category}</option>
                                                    ))
                                                    :
                                                    null
                                            }
                                        </select>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Other details*
                                    </Row>
                                    <Row >
                                        <input type="text" placeholder="Enter Complaint deparment" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_deparment(e.target.value)}
                                        />

                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complaint description*
                                    </Row>
                                    <Row >
                                        <textarea style={{ height: "100px" }} placeholder="Enter description" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_description(e.target.value)}
                                        />
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complaint remark*
                                    </Row>
                                    <Row >
                                        <input type="text" placeholder="Enter remark" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_remark(e.target.value)}
                                        />
                                    </Row>
                                </Col>
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Complaint document
                                    </Row>
                                    <Row >
                                        <input type="file" placeholder="" className="createdeptmodalinput"
                                            accept=".png, .jpg, .jpeg,.doc,.docx ,.pdf"
                                            onChange={handleOnChange}
                                        />
                                    </Row>
                                </Col>

                            </Row>

                            <Row className="mt-4 mb-3">
                                <Col className="justify_content_center">
                                    <button type="submit" className="serachdeptbtn"

                                    >Create</button>
                                </Col>
                            </Row>

                        </Modal.Body>
                    </form>
                </Modal> */}
                {/*-----------------Add Complaint modal end--------------------*/}

                <Row className="dashrowbg">
                    <Row className="homereqmsghead justify_content_center">Welcome {" "} {userdata}</Row>
                    <div >
                        <Row className="mt-5">
                            {/* <Col sm={1}></Col> */}
                            <Col sm>
                                <Card
                                    bg="primary"
                                    className="dashtopcard mb-5"
                                >
                                    <Link to="/Viewuserprofile">
                                        <Card.Body>
                                            <Card.Title className="dashtopcardtitle mt-0">
                                                <span><FaUserAlt alt="" className="dashtopcardimg" /></span>
                                                <span className="mt-0">   Profile </span></Card.Title>
                                            {/* <Card.Text className="dashtopcardtext justify_content_right ">
                                                        8
                                                    </Card.Text> */}
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                            <Col sm>
                                <Card
                                    bg="danger"
                                    className="dashtopcard  mb-5"
                                >
                                    <Link to="/Appointmentsuser">
                                        <Card.Body bg="primary"
                                        >
                                            <Card.Title className="dashtopcardtitle">
                                                <span><FiPhoneCall alt="" className="dashtopcardimg" /></span>
                                                <span className="mt-0">My Appointment</span>
                                            </Card.Title>
                                            <Card.Text className="dashtopcardtext justify_content_right ">
                                                {/* 20 */}
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>

                            </Col>
                            <Col sm>
                                {/* <Card
                                    bg="danger"
                                    className="dashtopcard  mb-5"
                                >
                                    <Link to="/Userreportdash">
                                        <Card.Body bg="primary"
                                            className="dashtopcard "
                                        >
                                            <Card.Title className="dashtopcardtitle">
                                                <span><FiPhoneCall alt="" className="dashtopcardimg" /></span>
                                                <span className="mt-0">Reports</span>
                                            </Card.Title>
                                            <Card.Text className="dashtopcardtext justify_content_right ">
                                               
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card> */}

                            </Col>
                            <Col sm>

                            </Col>
                            {/* <Col sm={1}></Col> */}
                        </Row>

                        {/* <Row>
                           
                            <Col sm >
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
                            </Col>
                           
                        </Row> */}

                        <Row>
                            <Col sm={1}></Col>
                            <Col sm >
                                <Card
                                    bg=""
                                    className=" justify_content_center  mb-5"
                                >
                                    {/* <Bar data={bardata} options={options} /> */}

                                </Card>
                            </Col>
                            <Col sm={1}></Col>
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
    )
}

export default Dashboarduser