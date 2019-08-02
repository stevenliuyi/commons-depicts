import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

class Home extends Component {

  render() {

    return (
          <Container>
            <div className="info">
            This tool is designed for displaying depictions of Wikidata items on Wikimedia Commons. For example, the link <Link to="/Q41994">/Q41994</Link> shows all the images on Commons that depict <a href="https://www.wikidata.org/wiki/Q41994" target="_blank" rel="noopener noreferrer">Q41994</a> (<i>Phoenicopterus</i>, or flamingos).
            </div>
          </Container>
    )
  }
}

export default Home
