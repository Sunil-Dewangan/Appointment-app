import React from 'react';

export default function Url() {

    const checklocal = window.location.href

    var url
    var url1
    var s3

    // url = "http://127.0.0.1:8000/api/"
    // //url = "http://3.88.161.177/api/"
    // url1 = "http,localhost,api"
    // s3 = "https://pandariya-file-upload.s3.ap-south-1.amazonaws.com/"

    if (checklocal.includes("localhost")) {
        url = "http://127.0.0.1:8000/api/"
        url1 = "http,localhost,api"
        s3 = "https://pandariya-file-upload.s3.ap-south-1.amazonaws.com/"
    }

    if (checklocal.includes("54.147.140.100")) {
        url = "http://54.147.140.100/api/"
        url1 = "http,localhost,api"
        s3 = "https://pandariya-file-upload.s3.ap-south-1.amazonaws.com/"
    }

    return (

        { url, url1, s3 }

    );
}
