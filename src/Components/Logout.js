import React from 'react'
import logoutimg from "./Images/Logout.gif"
import {Row, Col} from "react-bootstrap"
 
const Logout=()=> {
    localStorage.clear();

    window.setTimeout(() => {
        window.location.href="/"
    }, 3000); 

    return (
        <>
          {/* Logout... */}
          <Row >
            <Col className="justify_content_center">
                <Row>
              <img src={logoutimg} className="logoutgif"/>
              </Row>
              </Col>
          </Row>
        </>
    )
}
export default Logout;