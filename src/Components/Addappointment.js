import React, { useEffect, useState } from "react"
import { Row, Col, Card, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import Url from "./Url"
import DataTable from "react-data-table-component";
import Navigation from "./Navuser"
import BJP_logo from "./Images/BJP_logo.png"
import { IoCloseSharp } from "react-icons/io5"

const Addappointment = () => {

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

    // const [dept_name, setDept_name] = useState("")
    const [dept_remark, setDept_remark] = useState("")

    const [addcomplaintmodal, setAddcomplaintmodal] = useState(false)
    const [createdeptmodal, setCreatedeptmodal] = useState(false)

    const [data, setData] = useState([])
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const column = [
        {
            name: "S. no.",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Compliant ID",
            selector: row => row.UCID,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.Complainant_name,
            sortable: true
        },
        {
            name: "Mobile no",
            selector: row => row.mobileno,
            sortable: true
        },
        {
            name: "User Email",
            selector: row => row.User_email,
            sortable: true
        },
        {
            name: "Mandal",
            selector: row => row.mandal,
            sortable: true
        },
        {
            name: "Booth",
            selector: row => row.booth,
            sortable: true
        },
        {
            name: "Complaint Type",
            selector: row => row.complaint_type,
            sortable: true
        },
        {
            name: "Complaint Deparment",
            selector: row => row.complaint_deparment,
            sortable: true
        },
        {
            name: "Category",
            selector: row => row.dept_category,
            sortable: true
        },
        {
            name: "Complaint Description",
            selector: row => row.complaint_description,
            sortable: true
        },
        {
            name: "Remark",
            selector: row => row.complaint_remark,
            sortable: true
        },
        {
            name: "Created on",
            selector: row => row.created_at,
            sortable: true
        },
        {
            name: "Status",
            selector: row => (row.solved === "No" ? "New Complaint" : row.solved === "Yes" ? "Complaint solved" : row.solved === "NR" ? "Not relevant" : "Ongoing"),
            sortable: true
        },
        {
            name: "Document",
            selector: (row) => (
                row.complaint_pic === "NA" ?
                    "No document uploded"
                    :
                    <a href={s3url + row.complaint_pic} target='_blank'>
                        Download
                    </a>
            )
        },
        {
            name: "View",
            cell: (row) => (
                <Link to={"/Viewcomplaintuser/" + row.id} target="_blank">
                    <button className="btn btn-primary" >View</button>
                </Link>
            )
        },
        // {
        //     name: "Action",
        //     cell: (row) => (
        //         <button className="btn btn-danger" onClick={() => delUser(row.id)}>Delete</button>
        //     )
        // }
    ]


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

    useEffect(() => {
        const api = url + "getuser_infoByemail/" + email

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                if (actualdata.message != "Fail") {
                    setUserdata(actualdata.name)
                }
            })
    }, [])

    useEffect(() => {
        const api = url + "getcomplaintByEmail/" + email

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                if (actualdata.message != "Fail") {
                    setData(actualdata)
                    setFilter(actualdata)
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

                    setCategorylist(actualdata)
                }
            })
    }

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

    const otherDept = (dept) => {
        if (dept === "अन्य") {

            setCreatedeptmodal(true)
        }
    }

    const createComplaint = (e) => {
        e.preventDefault();
        setRukjlk(true)
        // alert("")
        ///////////////////////
        // return
        //console.log(compic)
        //alert("")
        // var compaintid

        setAddcomplaintmodal(false)

        // var res = window.confirm("You want to add this complaint, are you sure?")
        // if (res) {


        if (compic === null) {
            //alert("document")
            const complaint_pic = "NA"
            const User_email = email

            //const controller = "createcomplaint"
            const api = url + "createcomplaint"
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
                        alert("Complaint registered successfully")
                        //setAddcomplaintmodal(false)
                        sendSMS(op1["UCID"])
                        setRukjlk(false)
                        window.location.reload()
                    }
                })
        }
        else {
            //alert("no document")
            //setRukjlk(true)
            const formData = new FormData()
            formData.append("pic", compic)

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
                    if (op2["message"] === "File size must be less than 19MB")
                        return
                    const complaint_pic = op2["message"]

                    const User_email = email

                    //const controller = "createcomplaint"
                    const api = url + "createcomplaint"
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
                                alert("Complaint registered successfully")
                                sendSMS(op1["UCID"])
                                //setAddcomplaintmodal(false)
                                setRukjlk(false)
                                window.location.reload()
                            }
                        })
                })

        }
    }

    const sendSMS = async (UCID) => {

        const response = await fetch('http://alertbox.in/pushsms.php?username=rkrohit&api_password=8925bh6j3aalafjbx&sender=BHWANA&to=' + mobileno + '&message=%E0%A4%9C%E0%A4%A8%E0%A4%B8%E0%A5%87%E0%A4%B5%E0%A4%BE%20%E0%A4%B9%E0%A5%80%20%E0%A4%AD%E0%A4%BE%E0%A4%B5%E0%A4%A8%E0%A4%BE%2C%20%0A%0A%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A4%BE%20%E0%A4%86%E0%A4%B5%E0%A5%87%E0%A4%A6%E0%A4%A8%20%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE%E0%A4%AF%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%96%E0%A5%8D%E0%A4%AF%E0%A4%BE%20' + UCID + '%20%E0%A4%95%E0%A5%87%20%E0%A4%B8%E0%A4%BE%E0%A4%A5%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%E0%A4%95%E0%A5%83%E0%A4%A4%20%E0%A4%95%E0%A4%B0%20%E0%A4%B2%E0%A4%BF%E0%A4%AF%E0%A4%BE%20%E0%A4%97%E0%A4%AF%E0%A4%BE%20%E0%A4%B9%E0%A5%88%7C%20%E0%A4%9C%E0%A4%B2%E0%A5%8D%E0%A4%A6%20%E0%A4%B9%E0%A5%80%20%E0%A4%86%E0%A4%AA%E0%A4%B8%E0%A5%87%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%95%20%E0%A4%95%E0%A4%B0%20%E0%A4%86%E0%A4%B5%E0%A5%87%E0%A4%A6%E0%A4%A8%20%E0%A4%95%E0%A5%80%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%97%E0%A4%A4%E0%A4%BF%20%E0%A4%8F%E0%A4%B5%E0%A4%82%20%E0%A4%B5%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%AE%E0%A4%BE%E0%A4%A8%20%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BF%E0%A4%A4%E0%A4%BF%20%E0%A4%95%E0%A5%80%20%E0%A4%9C%E0%A4%BE%E0%A4%A8%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%86%E0%A4%AA%E0%A4%95%E0%A5%8B%20%E0%A4%89%E0%A4%AA%E0%A4%B2%E0%A4%AC%E0%A5%8D%E0%A4%A7%20%E0%A4%95%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%88%20%E0%A4%9C%E0%A4%BE%E0%A4%B5%E0%A5%87%E0%A4%82%E0%A4%97%E0%A5%80%E0%A5%A4%20%0A%0A%E0%A4%A7%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%BE%E0%A4%A6%2C%20%0A%0A%E0%A4%AD%E0%A4%BE%E0%A4%B5%E0%A4%A8%E0%A4%BE%20%E0%A4%AC%E0%A5%8B%E0%A4%B9%E0%A4%B0%E0%A4%BE%20%0A%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%BE%E0%A4%AF%E0%A4%95%20-%20%E0%A4%AA%E0%A4%82%E0%A4%A1%E0%A4%B0%E0%A4%BF%E0%A4%AF%E0%A4%BE&unicode=1&priority=8&e_id=1701163127039127801&t_id=1707170722353964975');
        const data = await response.json();
        // Use the fetched data
    };

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


    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc"

            },
        },
    }

    useEffect(() => {
        const result = data.filter((item) => {
            return (item.id.toString().toLowerCase().includes(search.toLowerCase()) || item.User_email.toLowerCase().match(search.toLocaleLowerCase()) || item.UCID.toLowerCase().match(search.toLocaleLowerCase()) || item.Complainant_name.toLowerCase().match(search.toLocaleLowerCase()) || item.mobileno.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_deparment.toLowerCase().match(search.toLocaleLowerCase()) || item.dept_category.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_type.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_description.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_remark.toLowerCase().match(search.toLocaleLowerCase()) || item.mandal.toLowerCase().match(search.toLocaleLowerCase()) || item.booth.toLowerCase().match(search.toLocaleLowerCase())
            );
        });
        setFilter(result);
    }, [search]);

    /*--------------------------- Generate CSV ---------------------------*/
    const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData =
            typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;

        var CSV = "";

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ",";
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + "\r\n";
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + "\r\n";
        }

        if (CSV === "") {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = "data:text/csv;charset=utf-8,\uFEFF" + CSV;

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    /*--------------------------- Generate CSV ---------------------------*/



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

            <Row>

                {/*-----------------Add Complaint modal--------------------*/}
                <Modal
                    show={addcomplaintmodal}
                    size="md"
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
                        <Col>New Appointment</Col>
                    </Row>
                    <form onSubmit={(e) => createComplaint(e)}>
                        <Modal.Body>
                            <Row>
                                
                                <Col sm className="appointcentercols">
                                    <Row className="appointsummarytype mt-2">
                                        Appointment Date
                                    </Row>
                                    <Row >
                                        <input type="date" placeholder="Enter mobile no" className="createdeptmodalinput"
                                            
                                            required
                                            onChange={e => setMobileno(e.target.value)}
                                        />
                                    </Row>
                                    <Row className="appointsummarytype mt-2">
                                        Time slot
                                    </Row>
                                    <Row >
                                        {/* <input type="text" placeholder="Enter mobile no" className="createdeptmodalinput"
                                            
                                            required
                                            onChange={e => setMobileno(e.target.value)}
                                        /> */}
                                        <select className="createdeptmodalinput"
                                            required
                                            //onChange={(e) => { setBooth(e.target.value) }}
                                            >
                                            <option value="">9AM - 10AM</option>
                                            <option value="">10AM - 11AM</option>
                                            <option value="">5PM - 6PM</option>
                                            <option value="">7PM - 8PM</option>
                                            <option value="">8PM - 9PM</option>
                                        </select>
                                    </Row>
                                    <Row className="appointsummarytype mt-2">
                                        Purpose
                                    </Row>
                                    <Row >
                                        <textarea type="Text" placeholder="Enter Purpose" className="createdeptmodalinput"
                                            
                                            required
                                            onChange={e => setMobileno(e.target.value)}
                                        />
                                    </Row>
                                    <Row className="appointsummarytype mt-2">
                                        Number of Persons
                                    </Row>
                                    <Row >
                                        <input type="number" placeholder="Enter number" className="createdeptmodalinput"
                                            
                                            required
                                            onChange={e => setMobileno(e.target.value)}
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
                </Modal>
                {/*-----------------Add Complaint modal end--------------------*/}

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
                                    <Link to="/Dashboarduser">Dashboard{">"}</Link>
                                </Col>

                                <Col className="justify_content_left">Appointments</Col>

                            </Row>

                            <Row>
                                <Col className="appointcentercols jus">
                                </Col>

                                <Col sm={2} className="justify_content_center">
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            setAddcomplaintmodal(true)
                                        }}
                                    >New Appointment</button>
                                </Col>
                            </Row>


                            <Row className="depttablebox mt-5 mb-3">

                                <Row>
                                    <Row className="loginhead justify_content_center">My Appointments</Row>
                                    <DataTable
                                        customStyles={tableHeaderstyle}
                                        columns={column}
                                        data={filter}
                                        pagination
                                        //selectableRows
                                        fixedHeader
                                        selectableRowsHighlight
                                        highlightOnHover
                                        actions={
                                            <button className="btn btn-success"
                                                onClick={() => JSONToCSVConvertor(data, "Complaint List", true)}
                                            >Export Excel</button>
                                        }
                                        subHeader
                                        subHeaderComponent={
                                            <input type="text"
                                                className="w-100 form-control"
                                                placeholder="Search by S.no., Complaint id, User email, Name, Mobile no, Complaint type, Department, Category, Mandal, Booth, Description"
                                                value={search}
                                                onChange={(e) => SetSearch(e.target.value)}

                                            />
                                        }
                                        subHeaderAlign="left"
                                    />
                                </Row>


                            </Row>
                        </Row>

                    </Col>
                </Row>
            </Row>



        </>
    )
}

export default Addappointment