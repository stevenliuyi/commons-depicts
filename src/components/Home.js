import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <Container>
        <div className="info">
          <p>
            This tool is designed for displaying depictions of Wikidata items on
            Wikimedia Commons. For example, the link{' '}
            <Link to="/Q41994">/#/Q41994</Link> shows all the images on Commons
            that depict{' '}
            <a
              href="https://www.wikidata.org/wiki/Q41994"
              target="_blank"
              rel="noopener noreferrer"
            >
              Q41994
            </a>{' '}
            (<i>Phoenicopterus</i>, or flamingo).
          </p>
          <p>
            You may also add{' '}
            <span className="source-code">
              mw.loader.load(
              '//www.wikidata.org/w/index.php?title=User:Stevenliuyi/depicts.js&action=raw&ctype=text/javascript'
              );
            </span>{' '}
            to{' '}
            <a
              href="https://www.wikidata.org/wiki/Special:MyPage/common.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              your personal common.js file
            </a>{' '}
            on Wikidata, so that you can directly link to this tool from the
            sidebar on item's page.
          </p>
        </div>
      </Container>
    )
  }
}

export default Home
