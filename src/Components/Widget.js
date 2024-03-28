import React from 'react'

import { FaWhatsapp } from "react-icons/fa"


const Widget = () => {

    return (
        <>
            <div className="widgets-wrapper">

                <a href="https://api.whatsapp.com/send?phone=917884033338&text=Hi,%20I%20need%20more%20details%20about%20your%20work" target="_blank">
                    <button className="widgets" >
                        <FaWhatsapp />
                    </button>
                </a>

            </div>
        </>
    )
}

export default Widget