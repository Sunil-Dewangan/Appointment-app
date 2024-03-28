import React, { useState, useEffect } from "react"
import { Row, Col,  Modal } from "react-bootstrap"
import Url from "./Url"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component";
import Navigation from "./Navadmin"
import { IoCloseSharp } from "react-icons/io5"

const Departmentmaster = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)


    const usertoken = localStorage.getItem("usertoken")
    //const [searchcontent, setSearchcontent] = useState("")

    const [dept_name, setDept_name] = useState("")
    const [dept_category, setDept_category] = useState("")
    const [dept_remark, setDept_remark] = useState("")
    const [deptbyid, setDeptbyid] = useState("")

    const [createdeptmodal, setCreatedeptmodal] = useState(false)
    const [updatedeptmodal, setUpdatedeptmodal] = useState(false)

    const [data, setData] = useState([])
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const column = [
        {
            name: "Department name",
            selector: row => row.dept_name,
            sortable: true
        },
        {
            name: "Department name",
            selector: row => row.dept_category,
            sortable: true
        },
        {
            name: "Remark",
            selector: row => row.dept_remark,
            sortable: true
        },

        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-primary" onClick={() => getDeptbyid(row.id)}>Edit</button>
            )
        },
        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-danger" onClick={() => delDept(row.id)}>Delete</button>
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


    useEffect(() => {
        const api = url + "getDepartment_master"

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

    const getDeptbyid = (id) => {

        const api = url + "getDepartment_masterById/" + id

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
                    setDeptbyid(actualdata)
                    setUpdatedeptmodal(true)
                }
            })
    }

    const createDepartment = () => {

        const specialCharsRegex = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;

        if (specialCharsRegex.test(dept_name)) {
            alert("Department name should not contain special characters")
            return; // Name contains special characters
        }

        const api = url + "createDepartment_master"

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
                    alert("Department category added successfully")
                    window.location.reload()
                }
            })
    }

    const updateDepartment = (id) => {
        const api = url + "updateDepartment_master/" + id

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
                    alert("Department category updated successfully")
                    window.location.reload()
                }
            })
    }

    const delDept = (id) => {
        const api = url + "delDepartment_masterById/" + id

        var res = window.confirm("You want to delete this department category, are you sure?")
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
                    if (actualdata1.message === "success") {
                        alert("Department Deleted")
                        window.location.reload()
                    }
                })
        }
    }

    useEffect(() => {
        const result = data.filter((item) => {
            return (item.dept_name.toLowerCase().match(search.toLocaleLowerCase()) || item.dept_category.toLowerCase().match(search.toLocaleLowerCase()) || item.dept_remark.toLowerCase().match(search.toLocaleLowerCase())
            );
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
    }, [])

    return (
        <>
            <Modal
                show={createdeptmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
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
                                <input type="text" placeholder="Enter Department Name" className="createdeptmodalinput"
                                    required
                                    onChange={e => setDept_name(e.target.value)}
                                />
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

            </Modal>

            <Modal
                show={updatedeptmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setUpdatedeptmodal(false) }}
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
                                <input type="text" placeholder="Enter Department Name" className="createdeptmodalinput"
                                    defaultValue={deptbyid.dept_name}
                                    onChange={e => setDept_name(e.target.value)}
                                />
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
                                    defaultValue={deptbyid.dept_category}
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
                                    defaultValue={deptbyid.dept_remark}
                                    onChange={e => setDept_remark(e.target.value)}
                                />
                            </Row>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>

                    <Row className="mt-4 mb-3">
                        <Col className="justify_content_center">
                            <button type="submit" className="serachdeptbtn"
                                onClick={() => updateDepartment(deptbyid.id)}
                            >Update Department</button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>


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

                            <Col className="justify_content_left">Department Master</Col>

                        </Row>

                        <Row>

                            <Col className="appointcentercols jus">

                            </Col>

                            <Col sm={2} className="justify_content_center">
                                <button className="btn btn-primary"
                                    onClick={() => {
                                        setCreatedeptmodal(true)
                                    }}
                                >Add Department Category</button>
                            </Col>
                        </Row>


                        <Row className="depttablebox mt-5 mb-3">

                            <Row>
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
                                            onClick={() => JSONToCSVConvertor(data, "Department List", true)}
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

export default Departmentmaster