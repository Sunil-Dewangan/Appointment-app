import React, { useState, useEffect } from "react"
import { Row, Col, OverlayTrigger, Tooltip, Modal } from "react-bootstrap"
import Url from "./Url"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component";
import Navigation from "./Navadmin"
import { IoCloseSharp } from "react-icons/io5"

const Adduser = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)

    const usertoken = localStorage.getItem("usertoken")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [mobileno, setMobileno] = useState("")
    const [address, setAddress] = useState("")
    const [area, setArea] = useState("")
    const [jdate, setJdate] = useState("")
    const [remark, setRemark] = useState("")
    const [mandallist, setMandallist] = useState([])

    const [getuserbyid, setGetuserbyid] = useState([])

    const [addusermodal, setAddusermodal] = useState(false)
    const [editusermodal, setEditusermodal] = useState(false)

    //const [searchcontent, setSearchcontent] = useState("")
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);


    const [data, setData] = useState([])

    const column = [
        {
            name: "Name",
            selector: row => row.User_name,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.User_email,
            sortable: true
        },
        {
            name: "Mobile No",
            selector: row => row.User_mob,
            sortable: true
        }        ,
        {
            name: "Address",
            selector: row => row.User_address,
            sortable: true
        },
        {
            name: "Mandal",
            selector: row => row.User_area,
            sortable: true
        },
        {
            name: "Joining date",
            selector: row => row.User_joindt,
            sortable: true
        },
        {
            name: "Remark",
            selector: row => row.remark,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-primary" onClick={() => getUserbyid(row.id)}>Edit</button>
            )
        },
        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-danger" onClick={() => delUser(row.id)}>Delete</button>
            )
        }
    ]

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

    /*---------------------Add user --------------------- */

    const addUser = e => {
        e.preventDefault()
        const controller = "createUser"
        const api = url + controller
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${usertoken}`, // Include the bearer token
            },
            body: JSON.stringify({ name, email, password })
        })
            .then((apidata) => {
                //console.log(apidata)
                return apidata.json()
            })
            .then((actualdata) => {
                if (actualdata["Message"] === "User_created") {

                    const controller1 = "createuser_info"
                    const api1 = url + controller1

                    const User_name = name
                    const User_email = email
                    const User_address = address
                    const User_mob = mobileno
                    const User_area = area
                    const User_joindt = jdate

                    fetch(api1, {
                        method: 'POST',
                        body: JSON.stringify({ User_name, User_email, User_address, User_mob, User_area, User_joindt, remark }),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${usertoken}`, // Include the bearer token
                        }
                    })
                        .then((apidata1) => {
                            return apidata1.json()
                        })
                        .then((actualdata1) => {
                            if (actualdata1["message"] === "success") {
                                alert("User Created")
                                setAddusermodal(false)
                                window.location.reload()
                            }

                        })

                }

            })
    }

    useEffect(() => {
        const api = url + "getuser_info"

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

    const getUserbyid = (id) => {
        const api = url + "getuser_infoById/" + id
        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata1) => {
                return apidata1.json()
            })
            .then((actualdata1) => {
                //console.log(actualdata1)
                if (actualdata1["message"] !== "Fail") {
                    setGetuserbyid(actualdata1)
                    setEditusermodal(true)
                }
            }
            )
    }

    const updateUser = (id) => {

        const controller = "updateuser_info/" + id
        const api = url + controller

        const User_name = name
        const User_email = email
        const User_address = address
        const User_mob = mobileno
        const User_area = area
        const User_joindt = jdate

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${usertoken}`, // Include the bearer token
            },
            body: JSON.stringify({ User_name, User_email, User_address, User_mob, User_area, User_joindt, remark })
        })
            .then((apidata) => {
                //console.log(apidata)
                return apidata.json()
            })
            .then((actualdata) => {
                if (actualdata["message"] === "success") {
                    alert("User Updated successfully")
                    setEditusermodal(false)
                    window.location.reload()
                }

            })
    }

    const delUser = (id) => {

        const api = url + "deluser_infoById/" + id

        var res = window.confirm("You want to delete this user, are you sure?")
        if (res) {
            fetch(api, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${usertoken}`, // Include the bearer token
                },
            })
                .then((actualdata) => {
                    return actualdata.json()
                })
                .then((actualdata1) => {
                    //console.log(actualdata1)
                    if (actualdata1["message"] === "success") {
                        alert("User Deleted")
                        window.location.reload()
                    }
                })
        }
    }

    useEffect(() => {
        const result = data.filter((item) => {
            return item.User_name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    }, [search]);


    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc"
            },
        },
    }

    /*--------------------------- Generate CSV ---------------------------*/
    const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
        // If JSONData is not an object then JSON.parse will parse the JSON string into an Object
        var arrData =
            typeof JSONData !== "object" ? JSON.parse(JSONData) : JSONData;
    
        var CSV = "";
    
        // This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
    
            // This loop will extract the label from the 1st index of the array
            for (var index in arrData[0]) {
                // Now convert each value to a string and comma-separated
                row += index + ",";
            }
    
            row = row.slice(0, -1);
    
            // Append Label row with line break
            CSV += row + "\r\n";
        }
    
        // 1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
    
            // 2nd loop will extract each column and convert it to a string, comma-separated
            for (var index in arrData[i]) {
                // Ensure that the value is properly encoded in UTF-8
                var cellValue = arrData[i][index];
                cellValue = encodeURIComponent(cellValue).replace(/%0A/g, ''); // Remove line breaks
                row += '"' + cellValue + '",';
            }
    
            row = row.slice(0, -1);
    
            // Add a line break after each row
            CSV += row + "\r\n";
        }
    
        if (CSV === "") {
            alert("Invalid data");
            return;
        }
    
        // Generate a file name
        var fileName = "";
        // This will remove the blank spaces from the title and replace them with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
    
        // Initialize file format you want csv or xls
        var uri = "data:text/csv;charset=utf-8,\uFEFF" + CSV; // Add UTF-8 BOM character (\uFEFF)
    
        // Now the little tricky part.
        // You can use either window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension
    
        // This trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;
    
        // Set the visibility hidden so it will not affect your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
    
        // This part will append the anchor tag and remove it after an automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    /*--------------------------- Generate CSV ---------------------------*/

    // const onSubmit = (data) => {
    //     ///////////////////////

    //     const formData = new FormData()
    //     formData.append("org_logo", data.org_logo[0])
    //     if (!data.org_logo[0]) {
    //       alert('Please select a image....')
    //     }
    //     fetch(url + '', {
    //       method: 'POST',
    //       body: formData
    //     })
    //       .then((op) => {
    //         return op.json()
    //       })
    //       .then((op1) => {
    //         return op1
    //       })
    //       ///////////////////////////
    //       .then((op2) => {

    //         const pic = op2["message"]   

    //         const controller = "/"
    //         const api = url + controller
    //         fetch(api, {
    //           method: 'POST',
    //           body: JSON.stringify({  }),
    //           headers: { 'Content-Type': 'application/json' }
    //         })
    //           .then((op) => {
    //             return op.json()
    //           })
    //           .then((op1) => {
    //             //console.log(op1)

    //           })
    //       })


    //   }


    // const [filterdata, setFilterdata] = useState({ copiedArray: [] })

    // const copyArray = () => {
    //     setFilterdata({ copiedArray: [...data] });
    //   };

    // console.log("filterdata",filterdata)

    // const handleFilter = (e) => {

    //     setFilterdata(data)

    //     var newData= data.filter(row => {
    //                  return row.User_name.toLowerCase().includes(e.target.value.toLowerCase())
    //              })
    //     //  console.log(e.target.value)
    //     // if (e.target.value != "") {
    //     //     newData = data.filter(row => {
    //     //         return row.User_name.toLowerCase().includes(e.target.value.toLowerCase())
    //     //     })
    //     // }
    //     // if(e.target.value === "") {
    //     //     newData = data(row => {
    //     //         return row
    //     //     })
    //     // }
    //     setFilterdata(newData)
    // }



    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {/*-----------------Add user modal--------------------*/}
            <Modal
                show={addusermodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setAddusermodal(false) }}
                        style={{ cursor: "pointer", marginLeft: "-100px" }}
                    >
                        <IoCloseSharp />
                    </Col>
                </Row>
                <Row className="deptmodalhead">
                    <Col>Add New User</Col>
                </Row>
                <Modal.Body>

                    <Row>

                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Name*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Name" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Email Id*
                            </Row>
                            <Row >
                                <input type="email" placeholder="Enter Email" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </Row>
                        </Col>

                    </Row>

                    <Row>

                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Password*
                            </Row>
                            <Row >
                                <input type="password" placeholder="Enter Password" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Mobile No.*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter mobile no" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setMobileno(e.target.value) }}
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
                                <input type="text" placeholder="Enter Address" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Mandal*
                            </Row>
                            <Row >
                                <select className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setArea(e.target.value) }}>
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
                                {/* <input type="text" placeholder="Enter Area" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setArea(e.target.value) }}
                                /> */}
                            </Row>
                        </Col>
                    </Row>
                    <Row>

                        <Col sm className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Joining Date*
                            </Row>
                            <Row >
                                <input type="date" placeholder="Enter Joing Date" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setJdate(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Remarks*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Renarks" className="createdeptmodalinput"
                                    required
                                    onChange={(e) => { setRemark(e.target.value) }}
                                />
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4 mb-3">
                        <Col className="justify_content_center">
                            <button className="serachdeptbtn"
                                onClick={addUser}
                            >Create</button>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
            {/*-----------------Add User modal end--------------------*/}

            {/*-----------------Edit user modal--------------------*/}
            <Modal
                show={editusermodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setEditusermodal(false) }}
                        style={{ cursor: "pointer", marginLeft: "-100px" }}
                    >
                        <IoCloseSharp />
                    </Col>
                </Row>
                <Row className="deptmodalhead">
                    <Col>Edit New User</Col>
                </Row>
                <Modal.Body>

                    <Row>

                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Name*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Name" className="createdeptmodalinput"
                                    defaultValue={getuserbyid.User_name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Mobile No.*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter mobile no" className="createdeptmodalinput"
                                    defaultValue={getuserbyid.User_mob}
                                    onChange={(e) => { setMobileno(e.target.value) }}
                                />
                            </Row>
                        </Col>

                    </Row>

                    <Row>

                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Address*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Address" className="createdeptmodalinput"
                                    defaultValue={getuserbyid.User_address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Mandal*
                            </Row>
                            <Row >
                            <select className="createdeptmodalinput"
                                    required
                                    defaultValue={getuserbyid.User_area}
                                    onChange={(e) => { setArea(e.target.value) }}>
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
                    </Row>
                    <Row>

                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Joining Date*
                            </Row>
                            <Row >
                                <input type="date" placeholder="Enter Joing Date" className="createdeptmodalinput"
                                    defaultValue={getuserbyid.User_joindt}
                                    onChange={(e) => { setJdate(e.target.value) }}
                                />
                            </Row>
                        </Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Remarks*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Renarks" className="createdeptmodalinput"
                                    defaultValue={getuserbyid.remark}
                                    onChange={(e) => { setRemark(e.target.value) }}
                                />
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-4 mb-3">
                        <Col className="justify_content_center">
                            <button className="serachdeptbtn"
                                onClick={() => { updateUser(getuserbyid.id) }}
                            >Update</button>
                        </Col>
                    </Row>

                </Modal.Body>
            </Modal>
            {/*-----------------Edit User modal end--------------------*/}



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

                            <Col className="justify_content_left">Add User</Col>
                            <Col className="justify_content_right">
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add New User</Tooltip>}>
                                    <span className="d-inline-block">
                                        <button className="homgreqmsgbtn"
                                            onClick={() => { setAddusermodal(true) }}
                                        >
                                            Add new user
                                            {/* <BiPlusMedical /> */}
                                        </button>
                                    </span>
                                </OverlayTrigger>
                            </Col>
                        </Row>

                        <Row>

                            <Col className="appointcentercols jus">
                                {/*<Row className="deptinputhead mt-5">
                                    <Col>Department Name</Col>
    </Row>*/}

                                <Row className=" mt-3">
                                    {/* <Col>
                                        <input type="text" className="createdeptinput" placeholder="Search user"
                                        //onChange={handleFilter}

                                        />
                                    </Col>
                                    <Col>
                                        <button className="serachdeptbtn"

                                        >Search</button>
                                    </Col> */}
                                    {/* <Col>
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add New User</Tooltip>}>
                                            <span className="d-inline-block">
                                                <button className="adddeptbtn"
                                                    onClick={() => { setAddusermodal(true) }}
                                                >
                                                    Add new user
                                                    
                                                </button>
                                            </span>
                                        </OverlayTrigger>
                                    </Col> */}
                                </Row>
                            </Col>

                            <Col sm={5} className="justify_content_center">
                                {/* <img src={department_vector} alt="" className="deptvector" /> */}
                            </Col>
                        </Row>
                        { /*<Row className="mt-4 mb-3">
                            <Col className="jstfy_all_cntr">
                                <button className="appointmentcreatebtn"
                                    onClick={createDepartment}
                                >Create</button>
                            </Col>
    </Row>*/}

                        {/* <Row className="deptmodalhead">
                            <Col>Add New User</Col>
                        </Row>


                        <Row>
                            <Col sm={1}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Name*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Name" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setName(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Email Id*
                                </Row>
                                <Row >
                                    <input type="email" placeholder="Enter Email" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                        <Row>
                            <Col sm={1}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Password*
                                </Row>
                                <Row >
                                    <input type="password" placeholder="Enter Password" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Mobile No.*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter mobile no" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setMobileno(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                        <Row>
                            <Col sm={1}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Address*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Address" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setAddress(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Area*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Area" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setArea(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                        <Row>
                            <Col sm={1}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Joining Date*
                                </Row>
                                <Row >
                                    <input type="date" placeholder="Enter Joing Date" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setJdate(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Remarks*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Renarks" className="createdeptmodalinput"
                                        required
                                        onChange={(e) => { setRemark(e.target.value) }}
                                    />
                                </Row>
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                        <Row className="mt-4 mb-3">
                            <Col className="justify_content_center">
                                <button className="serachdeptbtn"
                                    onClick={addUser}
                                >Create</button>
                            </Col>
                        </Row> */}

                        <Row className="depttablebox mt-5 mb-3">
                            <Row className="homereqmsghead justify_content_center">Users</Row>
                            <Row>
                                <DataTable
                                    customStyles={tableHeaderstyle}
                                    columns={column}
                                    data={filter}
                                    pagination
                                    // selectableRows
                                    fixedHeader
                                    selectableRowsHighlight
                                    highlightOnHover
                                    actions={
                                        <button className="btn btn-success"
                                            onClick={() => JSONToCSVConvertor(data, "_User List", true)}
                                        >Export Excel</button>
                                    }
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
                            </Row>
                            {/* <div className="deptheadbg">
                                <Row>
                                    <DataTable
                                        columns={column}
                                        data={data}
                                        selectableRows
                                        fixedHeader
                                        pagination
                                    />
                                </Row>
                            </div> */}

                            {/* <div className="deptheadbg">
                                <Row>
                                    
                                    <Col  className="deptlisthead justify_content_center">S.No.</Col>
                                    <Col  className="deptlisthead justify_content_center">Name</Col>
                                    
                                    <Col  className="deptlisthead justify_content_center">Email</Col>
                                    <Col  className="deptlisthead justify_content_center">Mobile no</Col>
                                    <Col  className="deptlisthead justify_content_center">Area</Col>
                                    <Col  className="deptlisthead justify_content_center">Address</Col>
                                    <Col  className="deptlisthead justify_content_center">Joining Date</Col>
                                    <Col  className="deptlisthead justify_content_center">
                                        Edit
                                    </Col>
                                    <Col  className="deptlisthead justify_content_center">
                                        Delete
                                    </Col>
                                    
                                </Row>
                            </div> */}

                            {/* <Row className=" mt-1 mb-3">
                                {
                                    data.length ?
                                        data.filter((item) => {
                                            if (searchcontent === null) { return item }
                                            else if (item.User_name.toLowerCase().includes(searchcontent.toLowerCase())) { return item }{console.log(item)}
                                        })
                                            .map((item, srno) => (
                                                <Row className=" mt-1 mb-2" >
                                                    

                                                    <Col  className="deptlistitem  justify_content_center">{srno + 1}</Col>
                                                    <Col  className="deptlistitem justify_content_center">{item.User_name}</Col>
                                                    <Col  className="deptlistitem justify_content_center">{item.User_email}</Col>
                                                    <Col  className="deptlistitem justify_content_center">{item.User_mob}</Col>
                                                    <Col  className="deptlistitem justify_content_center">{item.User_area}</Col>
                                                    <Col  className="deptlistitem justify_content_center">{item.User_address}</Col>
                                                    <Col  className="deptlistitem justify_content_center">{item.User_joindt}</Col>
                                                    <Col  className="editicon justify_content_center">
                                                        <FaEdit className="deleteicon justify_content_center"
                                                        //onClick={() => { getDeptbyid(item.id) }}
                                                        />
                                                    </Col>
                                                    <Col  className="deleteicon justify_content_center">
                                                        <RiDeleteBinLine className="deleteicon justify_content_center"
                                                        //onClick={() => { delDept(item.id) }}
                                                        />
                                                    </Col>
                                                    
                                                </Row>
                                            ))
                                        :
                                        null
                                }
                            </Row> */}


                        </Row>
                    </Row>

                </Col>
            </Row>
        </>
    )
}

export default Adduser