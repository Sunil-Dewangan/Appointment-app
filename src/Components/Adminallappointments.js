import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Url from "./Url"
import { Link } from "react-router-dom"
import DataTable from "react-data-table-component";
import Navigation from "./Navadmin"
//import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dummyprofilepic from "./Images/Dummyprofilepic.png"
import pandummy from "./Images/pandummy.png"

const Adminallappointments = () => {

    const url1 = Url()
    const url = url1["url"]
    const s3 = url1["s3"]
    const [s3url, setS3url] = useState(s3)

    const usertoken = localStorage.getItem("usertoken")

    const [data, setData] = useState([])
    const [search, SetSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const column = [
        // {
        //     name: "S. no.",
        //     selector: row => row.id,
        //     sortable: true
        // },
        {
            name: "Name",
            selector: row => row.Name,
            sortable: true
        },
        {
            name: "Mobile no",
            selector: row => row.Mobile_No,
            sortable: true
        },
        // {
        //     name: "User Email",
        //     selector: row => row.Email,
        //     sortable: true
        // },
        {
            name: "Address",
            selector: row => row.Address,
            sortable: true
        },
        {
            name: "Photo",
            selector: (row) => <img src={Dummyprofilepic} height={70} width={70} />,
            sortable: true
        },
        {
            name: "ID proof",
            selector: (row) => (<a href={pandummy} target='_blank'>
                Download
            </a>),
            sortable: true
        },
        
        {
            name: "Status",
            selector: row => row.Status ,
            sortable: true
        },
        {
            name: "Appointment Date",
            selector: row => row.Appointmentdate,
            sortable: true
        },
        {
            name: "Time slot",
            selector: row => row.Time_slot,
            sortable: true
        },
        {
            name: "Purpose",
            selector: row => row.Purpose,
            sortable: true
        },
        {
            name: "No of persons",
            selector: row => row.No_of_persons,
            sortable: true
        },
        {
            name: "Action",
            cell: (row) => (                
                    <button className="btn btn-primary" >Accept</button>                    
            )
        },
        {
            name: "Action",
            cell: (row) => (
                <button className="btn btn-danger" >Reject</button>
                                )
        },
        {
            name: "View",
            cell: (row) => (
                <Link to={"/Viewappointmentuser"} target="_blank">
                    <button className="btn btn-secondary" >View</button>
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

    const dummydata = [
        {
            id: 1,
            Name: 'Dummy User',
            Mobile_No: '7000000000',
            Email: "dummyuser@dummy.com",
            Address: "Dummy address",
            ID_Proof: { pandummy },
            Photo: {Dummyprofilepic},
            Status: "New appointment",
            Appointmentdate: "30-03-2024",
            Time_slot: "9am-9:30am",
            Purpose: "Sadak nirman",
            No_of_persons: "5",
        },

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
        const api = url + "getcomplaint"

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

    // useEffect(() => {
    //     const result = data.filter((item) => {
    //         return (item.id.toString().toLowerCase().includes(search.toLowerCase()) || item.User_email.toLowerCase().match(search.toLocaleLowerCase()) || item.UCID.toLowerCase().match(search.toLocaleLowerCase()) || item.Complainant_name.toLowerCase().match(search.toLocaleLowerCase()) || item.mobileno.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_deparment.toLowerCase().match(search.toLocaleLowerCase()) || item.dept_category.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_type.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_description.toLowerCase().match(search.toLocaleLowerCase()) || item.complaint_remark.toLowerCase().match(search.toLocaleLowerCase()) || item.mandal.toLowerCase().match(search.toLocaleLowerCase()) || item.booth.toLowerCase().match(search.toLocaleLowerCase())
    //         );
    //     });
    //     setFilter(result);
    // }, [search]);


    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#ccc"

            },
        },
    }

    // const generatePDF = async () => {

    //     // Create a new jsPDF instance
    //     const doc = new jsPDF({
    //         orientation: "landscape",
    //         unit: "pt",
    //         format: "A4",
    //         encoding: "Unicode"
    //     });

    //     // Add the font directly using base64 encoded string   

    //     const totalPagesExp = "{total_pages_count_string}";

    //     const tableRows = [];
    //     data.forEach((item, index) => {
    //         const rowData = [
    //             index + 1,
    //             item.UCID,
    //             item.Complainant_name,
    //             item.mobileno,
    //             item.User_email,
    //             item.mandal,
    //             item.booth,
    //             item.complaint_type,
    //             item.complaint_deparment,
    //             item.dept_category,
    //             item.complaint_description,
    //             item.complaint_remark,
    //         ];
    //         tableRows.push(rowData);
    //     });

    //     doc.autoTable({
    //         head: [
    //             [
    //                 "S.No.",
    //                 "Compliant ID",
    //                 "Name",
    //                 "Mobile no",
    //                 "User Email",
    //                 "Mandal",
    //                 "Booth",
    //                 "Complaint Type",
    //                 "Complaint Deparment",
    //                 "Category",
    //                 "Complaint Description",
    //                 "Remark",
    //             ],
    //         ],
    //         body: tableRows,
    //         didDrawPage: (data) => {
    //             const { pageCount } = data;
    //             const pageSize = doc.internal.pageSize;
    //             const pageHeight =
    //                 pageSize.height ?? pageSize.getHeight() - 20;
    //             const footerY = pageHeight - 10;

    //             doc.setTextColor(150);
    //             doc.setFontSize(10);
    //             doc.text(
    //                 `Page ${doc.internal.getNumberOfPages()} of ${totalPagesExp}`,
    //                 data.settings.margin.left,
    //                 footerY,
    //                 { align: "left" }
    //             );
    //             doc.text(
    //                 new Date().toLocaleString(),
    //                 pageSize.width - 50,
    //                 footerY,
    //                 { align: "right" }
    //             );
    //         },
    //     });

    //     // Save the PDF
    //     doc.save("complaints.pdf");
    // };

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


    ///////////////Render from top/////////////////////
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>

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

                            <Col className="justify_content_left">All Appointments</Col>
                            {/* <Col className="justify_content_right">
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Add New User</Tooltip>}>
                                    <span className="d-inline-block">
                                        <button className="homgreqmsgbtn"
                                            onClick={() => { setAddusermodal(true) }}
                                        >
                                            Add new user
                                            
                                        </button>
                                    </span>
                                </OverlayTrigger>
                            </Col> */}
                        </Row>
                        <Row className="homereqmsghead justify_content_center mt-1">
                            All Appointments
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col sm={2}>
                                {/* <button className="btn btn-primary"
                                    onClick={() => generatePDF()}
                                >Export PDF</button> */}
                            </Col>
                            <Col sm={2}>
                                <button className="btn btn-success"
                                    onClick={() => JSONToCSVConvertor(data, "All Appointments", true)}
                                >Export Excel</button>
                            </Col>
                        </Row>

                        <Row className="depttablebox mt-5 mb-3">
                            {/* <Row className="homereqmsghead justify_content_center">{formattedDate}</Row> */}
                            <Row>
                                <DataTable
                                    customStyles={tableHeaderstyle}
                                    columns={column}
                                    // data={filter}
                                    data={dummydata}
                                    pagination
                                    // selectableRows
                                    fixedHeader
                                    selectableRowsHighlight
                                    highlightOnHover
                                    // actions={

                                    //     <button className="btn btn-success"
                                    //         onClick={() => JSONToCSVConvertor(data, "Datewise complaint List", true)}
                                    //     >Export Excel</button>
                                    // }

                                    subHeader
                                    subHeaderComponent={
                                        <input type="text"
                                            className="w-100 form-control"
                                            placeholder="Search "
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

export default Adminallappointments