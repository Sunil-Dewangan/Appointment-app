import React, { useState, useEffect } from "react"
import { Row, Col, OverlayTrigger, Tooltip, Modal } from "react-bootstrap"
import Url from "./Url"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component";
import Navigation from "./Navadmin"
import { IoCloseSharp } from "react-icons/io5"


const Boothmaster = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)


    const usertoken = localStorage.getItem("usertoken")
    //const [searchcontent, setSearchcontent] = useState("")

    const [mandal, setMandal] = useState("")
    const [booth, setBooth] = useState("")
    const [booth_no, setBooth_no] = useState("")

    const [getboothdetails, setGetboothdetails] = useState("")
    //const [deptbyid, setDeptbyid] = useState([])

    const [createboothmodal, setCreateboothmodal] = useState(false)
    const [updateboothmodal, setUpdateboothmodal] = useState(false)

    const [data, setData] = useState([])
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const column = [
        {
            name: "Mandal name",
            selector: row => row.mandal,
            sortable: true
        },
        {
            name: "Booth no",
            selector: row => row.booth_no,
            sortable: true
        },
        {
            name: "Booth name",
            selector: row => row.booth,
            sortable: true
        },

        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-primary" onClick={() => getBoothbyid(row.id)}>Edit</button>
            )
        },
        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-danger" onClick={() => delBooth(row.id)}>Delete</button>
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
        const api = url + "getbooth_master"

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

    const getBoothbyid = (id) => {
        const api = url + "getbooth_masterById/" + id

        fetch(api, {
            method: 'GET',
            headers: { Authorization: `Bearer ${usertoken}`, }
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                console.log(actualdata)
                if (actualdata.message != "Fail") {
                    setGetboothdetails(actualdata)
                    setUpdateboothmodal(true)
                }
            })
    }

    const createBooth = () => {

        var state_name = "छत्तीसगढ़"
        var district = "कवर्धा"
        var vidhansabha = "पंडरिया"

        const api = url + "createbooth_master"

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${usertoken}`, // Include the bearer token
            },
            body: JSON.stringify({ mandal, booth, booth_no, state_name, district, vidhansabha })
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata)
                if (actualdata["message"] === "success") {
                    alert("Mandal/Booth added successfully")
                    window.location.reload()
                }
            })
    }

    const updateBooth = (id) => {

        // alert(mandal)
        // return

        var state_name = "छत्तीसगढ़"
        var district = "कवर्धा"
        var vidhansabha = "पंडरिया"

        const api = url + "updatebooth_master/" + id

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${usertoken}`, // Include the bearer token
            },
            body: JSON.stringify({ mandal, booth, booth_no, state_name, district, vidhansabha })
        })
            .then((apidata) => {
                return apidata.json()
            })
            .then((actualdata) => {
                //console.log(actualdata)
                if (actualdata["message"] === "success") {
                    alert("Mandal/Booth updated successfully")
                    setUpdateboothmodal(false)
                    window.location.reload()
                }
            })
    }

    const delBooth = (id) => {
        const api = url + "delbooth_masterById/" + id

        var res = window.confirm("You want to delete this Mandal/Booth, are you sure?")
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
                        alert("Mandal/Booth Deleted")
                        window.location.reload()
                    }
                })
        }
    }




    useEffect(() => {
        const result = data.filter((item) => {
            return (item.mandal.toLowerCase().match(search.toLocaleLowerCase()) || item.booth_no.toLowerCase().match(search.toLocaleLowerCase()) || item.booth.toLowerCase().match(search.toLocaleLowerCase())
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
                show={createboothmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setCreateboothmodal(false) }}
                        style={{ cursor: "pointer", marginLeft: "-100px" }}
                    >
                        <IoCloseSharp />
                    </Col>
                </Row>
                <Row className="deptmodalhead">
                    <Col>Create Mandal/Booth</Col>
                </Row>
                <form onSubmit={createBooth}>
                    <Modal.Body>

                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Mandal Name*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Mandal Name" className="createdeptmodalinput"
                                        required
                                        onChange={e => setMandal(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Booth no*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter remarks" className="createdeptmodalinput"
                                        required
                                        onChange={e => setBooth_no(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                        <Row>
                            <Col sm={3}></Col>
                            <Col className="appointcentercols">
                                <Row className="appointsummarytype mt-2">
                                    Booth*
                                </Row>
                                <Row >
                                    <input type="text" placeholder="Enter Booth name" className="createdeptmodalinput"
                                        required
                                        onChange={e => setBooth(e.target.value)}
                                    />
                                </Row>
                            </Col>
                            <Col sm={3}></Col>
                        </Row>

                        <Row className="mt-4 mb-3">
                            <Col className="justify_content_center">
                                <button type="submit" className="serachdeptbtn"

                                >Create Mandal/Booth</button>
                            </Col>
                        </Row>

                    </Modal.Body>
                </form>
            </Modal>

            <Modal
                show={updateboothmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalbg"
            >
                <Row className="justify_content_center">
                    <Col className="appointmodalhead"></Col>
                    <Col xs={1} className="appointmodalhead"
                        onClick={() => { setUpdateboothmodal(false) }}
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
                                Mandal Name*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Mandal Name" className="createdeptmodalinput"
                                    defaultValue={getboothdetails.mandal}
                                    onChange={e => setMandal(e.target.value)}
                                />
                            </Row>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                    <Row>
                        <Col sm={3}></Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Booth no*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter remarks" className="createdeptmodalinput"
                                    defaultValue={getboothdetails.booth_no}
                                    onChange={e => setBooth_no(e.target.value)}
                                />
                            </Row>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                    <Row>
                        <Col sm={3}></Col>
                        <Col className="appointcentercols">
                            <Row className="appointsummarytype mt-2">
                                Booth*
                            </Row>
                            <Row >
                                <input type="text" placeholder="Enter Booth name" className="createdeptmodalinput"
                                    defaultValue={getboothdetails.booth}
                                    onChange={e => setBooth(e.target.value)}
                                />
                            </Row>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>


                    <Row className="mt-4 mb-3">
                        <Col className="justify_content_center">
                            <button type="submit" className="serachdeptbtn"
                                onClick={() => { updateBooth(getboothdetails.id) }}
                            >Update Mandal/Booth</button>
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

                            <Col className="justify_content_left">Mandal/Booth Master</Col>

                        </Row>

                        <Row>

                            <Col className="appointcentercols jus">

                            </Col>

                            <Col sm={2} className="justify_content_center">
                                <button className="btn btn-primary"
                                    onClick={() => {
                                        setCreateboothmodal(true)
                                    }}
                                >Add Mandal/Booth</button>
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
                                            onClick={() => JSONToCSVConvertor(data, "Mandal-Booth List", true)}
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


                        </Row>
                    </Row>

                </Col>
            </Row>
        </>
    )
}

export default Boothmaster