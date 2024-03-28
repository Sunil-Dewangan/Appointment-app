import React, { useState, useEffect } from "react"
import { Row, Col, Modal } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Url from "./Url"
import { Link } from "react-router-dom"
import { IoCloseSharp } from "react-icons/io5"
//import DataTable from "react-data-table-component";
import Navigation from "./Navadmin"


const Viewcomplaintadmin = () => {

    const { id } = useParams()

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)

    const usertoken = localStorage.getItem("usertoken")
    const email = localStorage.getItem("email")

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
    const [complaintid, setComplaintid] = useState("")
    const [complaintucid, setComplaintucid] = useState("")

    const [mandallist, setMandallist] = useState([])
    const [boothlist, setBoothlist] = useState([])

    const [deptlist, setDeptlist] = useState([])
    const [categorylist, setCategorylist] = useState([])
    const [dept_remark, setDept_remark] = useState("")

    const [createdeptmodal, setCreatedeptmodal] = useState(false)

    const [complaintdetails, setComplaintdetails] = useState("")
    const [editcomplaintmodal, setEditcomplaintmodal] = useState(false)
    const [deletecomplaintmodal, setDeletecomplaintmodal] = useState(false)

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
        const api = url + "getcomplaintById/" + id

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata.dept_category)
                if (actualdata.message != "Fail") {
                    setComplaintdetails(actualdata)

                    var arr = []
                    arr[0] = actualdata.booth
                    setBoothlist(arr)

                    var cat = []
                    cat[0] = actualdata.dept_category
                    // console.log(cat["dept_category"])
                    setCategorylist(cat)

                }
            })
    }, [])

    useEffect(() => {
        const api = url + "getmandalList"

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata[0])
                if (actualdata.message != "Fail") {
                    setMandallist(actualdata)
                }
            })
    }, [])

    const getBooth = (mandal) => {
        //alert(mandal)
        const api = url + "getboothByMandal_List/" + mandal

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                // console.log(actualdata)
                if (actualdata.message != "Fail") {
                    const concatenatedBoothList = actualdata.map(item => `${item.booth_no} - ${item.booth}`);
                    setBoothlist(concatenatedBoothList)
                }
            })
    }

    useEffect(() => {
        const api = url + "geDpartmentlist"

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata)
                if (actualdata.message != "Fail") {
                    setDeptlist(actualdata)
                }
            })
    }, [complaint_deparment])

    const getCategory = (dept_name) => {
        //alert(mandal)

        //const api = url + "getDeptCategory/" + dept_name

        const new_dept_name = dept_name.replace(/\//g, '$');
        const api = url + "getDeptCategory/" + new_dept_name;

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata)
                if (actualdata.message != "Fail") {
                    const department_category = actualdata.map(item => `${item.dept_category}`);
                    setCategorylist(department_category)
                }
            })
    }

    const otherDept = (dept) => {
        if (dept === "अन्य") {
            setCreatedeptmodal(true)
        }
    }

    const createDepartment = () => {
        const specialCharsRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;

        if (specialCharsRegex.test(dept_name)) {
            alert("Department name should not contain special characters")
            return; // Name contains special characters
        }

        const api = url + "createDepartment_master"

        const dept_name = complaint_deparment

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${usertoken}`, // Include the bearer token
            },
            body: JSON.stringify({ dept_name, dept_category, dept_remark })
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata)
                if (actualdata["message"] === "success") {
                    setComplaint_deparment("")
                    setDept_category("")
                    alert("Department category added successfully")

                    setCreatedeptmodal(false)
                }
            })
    }

    const handleOnChange = e => {
        // console.log(e.target.files[0]);        
        setCompic(e.target.files[0]);
    };


    const updateComplaint = (id, User_email) => {

        //e.preventDefault();

        const formData = new FormData()
        formData.append("pic", compic)

        if (compic === null) {
            //alert("document")
            //const complaint_pic = "NA"
            const complaint_pic = complaintdetails.complaint_pic
            // alert(complaint_pic)
            // return

            const api = url + "updatecomplaint/" + id
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${usertoken}`, // Include the bearer token
                },
                body: JSON.stringify({ User_email, complaint_deparment, dept_category, complaint_type, complaint_description, complaint_remark, complaint_pic, mobileno, Complainant_name, mandal, booth }),
            })
                .then((op) => {
                    return op.json()
                })
                .then((op1) => {
                    //console.log(op1)
                    if (op1["message"] === "success") {
                        alert("Complaint updated successfully")
                        //setAddcomplaintmodal(false)
                        window.location.reload()

                    }
                })
        }
        else {
            //alert("no document")
            fetch(url + 'picUpload', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${usertoken}`, // Include the bearer token
                }
            })
                .then((op) => {
                    return op.json()
                })
                .then((op1) => {
                    return op1
                })
                ///////////////////////////
                .then((op2) => {
                    //console.log(op2)

                    const complaint_pic = op2["message"]

                    //const controller = "createcomplaint"
                    const api = url + "updatecomplaint/" + id
                    fetch(api, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${usertoken}`, // Include the bearer token
                        },
                        body: JSON.stringify({ User_email, complaint_deparment, dept_category, complaint_type, complaint_description, complaint_remark, complaint_pic, mobileno, Complainant_name, mandal, booth }),
                    })
                        .then((op) => {
                            return op.json()
                        })
                        .then((op1) => {
                            //console.log(op1)
                            if (op1["message"] === "success") {
                                alert("Complaint updated successfully")
                                window.location.reload()
                            }
                        })
                })
        }

        // const api = url + "updatecomplaint/" + id
        // fetch(api, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${usertoken}`, // Include the bearer token
        //     },
        //     body: JSON.stringify({ User_email, complaint_deparment, dept_category, complaint_type, complaint_description, complaint_remark, complaint_pic, mobileno, Complainant_name, mandal, booth }),
        // })
        //     .then((actualdata) => {
        //         return actualdata.json()
        //     })
        //     .then((actualdata) => {
        //         //console.log(actualdata.message)
        //         if (actualdata.message === "success") {
        //             alert("Complaint updated successfully")
        //             setEditcomplaintmodal(false)
        //             window.location.reload()
        //         }
        //     })
    }

    const solveComplaint = (id, status) => {

        const api = url + "updatecomplaintSolved/" + id + "/" + status

        var res = window.confirm("You want to change the status of this complaint?")
        if (res) {
            fetch(api, {
                method: 'GET',
                headers: { Authorization: `Bearer ${usertoken}`, }
            })
                .then((actualdata) => {
                    return actualdata.json()
                })
                .then((actualdata) => {
                    //console.log(actualdata.message)
                    if (actualdata.message === "Success") {
                        alert("Complaint status updated successfully")
                        window.location.reload()
                    }
                })
        }
    }

    const delComplaint = (id, User_email_1, complaint_deparment_1, dept_category_1, complaint_type_1, complaint_description_1, complaint_remark_1, complaint_pic_1, mobileno_1, Complainant_name_1, mandal_1, booth_1, solved_1, UCID_1) => {

        //alert(typeof(complaintdetails.User_email))

        // var id = complaintdetails.id
        // var UCID_1 = complaintucid.UCID
        // const User_email_1 = new String(complaintucid.User_email)
        // //User_email_1 = complaintucid.User_email

        // var complaint_deparment_1 = complaintucid.complaint_deparment
        // var dept_category_1 = complaintucid.dept_category
        // var complaint_type_1 = complaintucid.complaint_type
        // var complaint_description_1 = complaintucid.complaint_description
        // var complaint_remark_1 = complaintucid.complaint_remark
        // var complaint_pic_1 = complaintucid.complaint_pic
        // var mobileno_1 = complaintucid.mobileno
        // var Complainant_name_1 = complaintucid.Complainant_name
        // var mandal_1 = complaintucid.mandal
        // var booth_1 = complaintucid.booth
        // var solved_1 = complaintucid.solved    


        //    return
        if (UCID_1 === "" || typeof UCID_1 === 'undefined') {
            UCID_1 = "NA"
        }

        if (dept_category_1 === "") {
            dept_category_1 = "NA"
        }

        if (solved_1 === "") {
            solved_1 = "NA"
        }

        //alert(UCID_1)

        //return

        const api = url + "delcomplaintById"

        var res = window.confirm("You want to delete this complaint, are you sure?")
        if (res) {
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${usertoken}`, // Include the bearer token
                },
                body: JSON.stringify({ User_email_1, complaint_deparment_1, dept_category_1, complaint_type_1, complaint_description_1, complaint_remark_1, complaint_pic_1, mobileno_1, Complainant_name_1, mandal_1, booth_1, solved_1, id, UCID_1 }),
            })
                .then((actualdata) => {
                    return actualdata.json()
                })
                .then((actualdata1) => {
                    //console.log(actualdata1)
                    if (actualdata1.message === "success") {
                        alert("Complaint Deleted")
                        window.location = "#/Adminallcomplaints"
                    }
                })
        }
    }



    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>

            {/*-----------------Update Complaint modal--------------------*/}
            <Modal
                show={editcomplaintmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setEditcomplaintmodal(false) }}
                        style={{ cursor: "pointer", marginLeft: "-100px" }}
                    >
                        <IoCloseSharp />
                    </Col>
                </Row>
                <Row className="deptmodalhead">
                    <Col>Update Complaint</Col>
                </Row>

                <Modal.Body>
                    <Row>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Complainant Name*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Complainant Name" className="createdeptmodalinput"
                                    defaultValue={complaintdetails.Complainant_name}
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
                                    defaultValue={complaintdetails.mobileno}
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
                                    defaultValue={complaintdetails.mandal}
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
                                    defaultValue={complaintdetails.booth}
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
                                {/* <input type="text" placeholder="Enter Complaint type" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_type(e.target.value)}
                                        /> */}
                                <select className="createdeptmodalinput"
                                    defaultValue={complaintdetails.complaint_type}
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
                                {/* <input type="text" placeholder="Enter Complaint deparment" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_deparment(e.target.value)}
                                        /> */}
                                <select className="createdeptmodalinput"
                                    defaultValue={complaintdetails.complaint_deparment}
                                    onChange={(e) => {
                                        setComplaint_deparment(e.target.value)
                                        getCategory(e.target.value)
                                        otherDept(e.target.value)
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
                                    defaultValue={categorylist}
                                    onChange={e => {
                                        setDept_category(e.target.value)
                                        otherDept(e.target.value)
                                    }}
                                >
                                    <option value="">Select type</option>
                                    {
                                        categorylist.length > 0 ?
                                            categorylist.map(item => (
                                                <option value={item}>{item}</option>
                                            ))
                                            :
                                            null
                                    }
                                    <option value="अन्य">अन्य</option>
                                </select>
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
                                    defaultValue={complaintdetails.complaint_description}
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
                                    defaultValue={complaintdetails.complaint_remark}
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
                            <Row>File size must be less than 19MB</Row>
                        </Col>

                    </Row>

                    <Row className="mt-4 mb-3">
                        <Col className="justify_content_center">
                            <button type="submit" className="serachdeptbtn"
                                onClick={() => updateComplaint(complaintdetails.id, complaintdetails.User_email)}
                            >Update</button>
                        </Col>
                    </Row>

                </Modal.Body>

            </Modal>
            {/*-----------------Update Complaint modal end--------------------*/}

            {/*-----------------Add Department Category modal--------------------*/}

            <Modal
                show={createdeptmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
                style={{ marginTop: "-100px" }}
            >
                <Row style={{ background: "lightgray" }}>
                    <Row className="justify_content_center" >
                        <Col className="appointmodalhead"></Col>
                        <Col xs={1} className="appointmodalhead"
                            onClick={() => { setCreatedeptmodal(false) }}
                            style={{ cursor: "pointer", marginLeft: "-100px" }}
                        >
                            <IoCloseSharp />
                        </Col>
                    </Row>
                    <Row className="deptmodalhead">
                        <Col>Create Department</Col>
                    </Row>

                    <Modal.Body>

                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Department Name*
                                </Row>
                                <Row >
                                    {complaint_deparment === "अन्य" ?
                                        <input type="text" placeholder="Enter Department Name" className="createdeptmodalinput"
                                            required
                                            onChange={e => setComplaint_deparment(e.target.value)}
                                        />
                                        :
                                        <input type="text" placeholder="Enter Department Name" className="createdeptmodalinput"
                                            required
                                            defaultValue={complaint_deparment}
                                            onChange={e => setComplaint_deparment(e.target.value)}
                                        />}
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Category*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Category" className="createdeptmodalinput"
                                        required
                                        onChange={e => setDept_category(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Remarks
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter remarks" className="createdeptmodalinput"

                                        onChange={e => setDept_remark(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>

                        <Row className="mt-4 mb-3">
                            <Col className="justify_content_center">
                                <button type="submit" className="serachdeptbtn"
                                    onClick={() => createDepartment()}
                                >Create Department</button>
                            </Col>
                        </Row>



                    </Modal.Body>

                </Row>
            </Modal>
            {/*-----------------Add Department Category modal--------------------*/}



            <Row className="">
                {/* <Col sm={1}>
                    <Leftvericalmenu />
                </Col> */}
                <Col>
                    <Row><Navigation /></Row>
                    <Row className="appointmentcard mt-2 ">

                        <Row className="appointcenterhead mt-3">

                            <Col sm={1} className="justify_content_left">
                                <Link to="/Dashboardadmin">Dashboard {">"}</Link>
                            </Col>

                            <Col className="justify_content_left">Complaint details</Col>

                        </Row>
                        <Row className="homereqmsghead justify_content_center mt-1">
                            Complaint details
                        </Row>

                        <Row className="mt-5">
                            <Col sm={1}></Col>
                            <Col sm>
                                <Row className="">
                                    <Col>
                                        <span className="homfeatureheading mx-2">Complaint ID:</span>
                                        <span className="homfeaturetext">{complaintdetails.UCID}</span>
                                    </Col>
                                    <Col>
                                        <span className="homfeatureheading mx-2">User Email:</span>
                                        <span className="homfeaturetext">{complaintdetails.User_email}</span>
                                    </Col>

                                </Row>
                                <Row className="mt-3">
                                    <Col >
                                        <span className="homfeatureheading mx-2">Name:</span>
                                        <span className="homfeaturetext">{complaintdetails.Complainant_name}</span>
                                    </Col>
                                    <Col >
                                        <span className="homfeatureheading mx-2">Mobile No:</span>
                                        <span className="homfeaturetext">{complaintdetails.mobileno}</span>
                                    </Col>

                                </Row>

                                <Row className="mt-3">
                                    <Col>
                                        <span className="homfeatureheading mx-2">Mandal:</span>
                                        <span className="homfeaturetext">{complaintdetails.mandal}</span>
                                    </Col>
                                    <Col>
                                        <span className="homfeatureheading mx-2">Booth:</span>
                                        <span className="homfeaturetext">{complaintdetails.booth}</span>
                                    </Col>

                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <span className="homfeatureheading mx-2">Complaint type:</span>
                                        <span className="homfeaturetext">{complaintdetails.complaint_type}</span>
                                    </Col>
                                    <Col>
                                        <span className="homfeatureheading mx-2">Complaint department:</span>
                                        <span className="homfeaturetext">{complaintdetails.complaint_deparment}</span>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col>
                                        <span className="homfeatureheading mx-2">Category:</span>
                                        <span className="homfeaturetext">{complaintdetails.dept_category}</span>
                                    </Col>
                                    <Col >
                                        <span className="homfeatureheading mx-2">Description:</span>
                                        <span className="homfeaturetext">{complaintdetails.complaint_description}</span>
                                    </Col>

                                </Row>
                                <Row className="mt-3" >
                                    <Col>
                                        <span className="homfeatureheading mx-2">Remark:</span>
                                        <span className="homfeaturetext">{complaintdetails.complaint_remark}</span>
                                    </Col>
                                    <Col >
                                        <span className="homfeatureheading mx-2">Status:</span>
                                        <span className="homfeaturetext">{complaintdetails.solved === "No" ? "New Complaint" : complaintdetails.solved === "Yes" ? "Complaint solved" : complaintdetails.solved === "NR" ? "Not relevant" : "Ongoing"}</span>

                                    </Col>

                                </Row>
                                <Row className="mt-3" >

                                    <Col>
                                        <span className="homfeatureheading mx-2">Document:</span>
                                        <span className="homfeaturetext">
                                            {complaintdetails.complaint_pic === "NA" ?
                                                "No document uploded"
                                                :
                                                <a href={s3url + complaintdetails.complaint_pic} target='_blank'>
                                                    Download
                                                </a>}
                                        </span>
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Col className="justify_content_center">
                                        <button className="btn btn-primary" onClick={() => setEditcomplaintmodal(true)}>Update complaint</button>
                                    </Col>
                                    <Col className="justify_content_center">
                                        <button button className="btn btn-success" onClick={() => solveComplaint(complaintdetails.id, "Yes")}>Set status Solved</button>
                                    </Col>
                                    <Col className="justify_content_center">
                                        <button button className="btn btn-secondary" onClick={() => solveComplaint(complaintdetails.id, "Ongoing")}>Set status ongoing</button>
                                    </Col>
                                    <Col className="justify_content_center">
                                        <button button className="btn btn-warning" onClick={() => solveComplaint(complaintdetails.id, "No")}>Set status Unsolved</button>
                                    </Col>
                                    <Col className="justify_content_center">
                                        <button button className="btn btn-dark" onClick={() => solveComplaint(complaintdetails.id, "NR")}>Set status Not relevant</button>
                                    </Col>
                                    <Col className="justify_content_center">
                                        <button className="btn btn-danger" onClick={() => delComplaint(complaintdetails.id, complaintdetails.User_email, complaintdetails.complaint_deparment, complaintdetails.dept_category, complaintdetails.complaint_type, complaintdetails.complaint_description, complaintdetails.complaint_remark, complaintdetails.complaint_pic, complaintdetails.mobileno, complaintdetails.Complainant_name, complaintdetails.mandal, complaintdetails.booth, complaintdetails.solved, complaintdetails.UCID)}>Delete complaint</button>
                                    </Col>

                                </Row>
                            </Col>

                            {/* <Col>
                                <img src={s3url + complaintdetails.complaint_pic} alt="" className="complaintdetailpic" />
                            </Col> */}
                            <Col sm={1}></Col>
                        </Row>
                    </Row >

                </Col >
            </Row >
        </>
    )
}

export default Viewcomplaintadmin