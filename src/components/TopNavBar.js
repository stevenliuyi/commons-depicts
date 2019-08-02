import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { GoMarkGithub } from 'react-icons/go'
import { Link } from 'react-router-dom'

class TopNavBar extends Component {
  render() {
    return (
      <Navbar bg="light" sticky="top">
        <Navbar.Brand>
          <span className="app-name"><Link to="/">Commons Depictions</Link></span>
        </Navbar.Brand>
        <Navbar.Collapse style={{ justifyContent: 'flex-end' }}>
          <Nav>
            <Nav.Link href="https://github.com/stevenliuyi/commons-depictions">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="source">source code</Tooltip>
                }
              >
                <GoMarkGithub size={18} />
              </OverlayTrigger>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default TopNavBar
