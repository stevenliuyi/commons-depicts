import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import OnImagesLoaded from 'react-on-images-loaded'
import Measure from 'react-measure'
import Gallery from 'react-photo-gallery'
import { IoIosWarning } from 'react-icons/io'
import Lightbox from 'react-images'
import Message from './Message'
import Image from './Image'
import { validateQID, fetchDepictions } from '../utils/api'
import { lightboxTheme } from '../utils/gallery'

class ImageGallery extends Component {

  state = {
    qid: null,
    status: false,
    images: [],
    totalhits: 0,
    width: -1,
    loadingStatus: null, // loading or loaded
    currentImage: 0,
    lightboxIsOpen: false
  }

  fetchImages = () => {
    if (this.state.qid == null) return
    fetchDepictions(this.state.qid).then(({ images, totalhits }) => this.setState({
        images,
        totalhits,
        loadingStatus: images.length > 0 ? 'loading' : 'loaded' }))
  }

  handleImagesLoaded = () => {
    // obtain heights and widths of the images
    let new_images = []
    this.state.images.forEach((img, i) => {
      const imgElement = document.getElementById(`img${i}`)      
      if (imgElement.naturalWidth > 0)
        new_images.push({
          ...this.state.images[i],
          width: imgElement.naturalWidth,
          height: imgElement.naturalHeight
        })
    })
    this.setState({ images: new_images, loadingStatus: 'loaded' })
  }
    
  componentDidMount() {
    const qid = this.props.match.params.qid.toUpperCase()
    validateQID(qid).then(status => this.setState({ qid, status }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.qid !== this.state.qid) this.fetchImages()
  }

  openLightbox = (event, obj) => this.setState({ currentImage: obj.index, lightboxIsOpen: true })

  closeLightbox = () => this.setState({ currentImage: 0, lightboxIsOpen: false })

  gotoPrevious = () => this.setState({ currentImage: this.state.currentImage - 1 })

  gotoNext = () => this.setState({ currentImage: this.state.currentImage + 1 })

  onClickImage = e => {
    window.open(this.state.images[this.state.currentImage].url, '_blank')
  }

  lightboxCaption = image => {
      const linkString = renderToString(<a href={image.url}>a</a>)
    return `<span>${image.title}${linkString}</span>`
  }
    
  render() {
    const { qid, status, images, totalhits, width, loadingStatus, currentImage, lightboxIsOpen } = this.state
    if (qid == null) return <div />
    return (
          <Container>
        {
        !status  &&  <Message
            icon={IoIosWarning}
            info={`Wikidata item ${qid} cannot be found`} />
        }
        {
        status && loadingStatus === 'loading' &&
          <Message
            icon="spinner"
            info={`Loading images depicting Wikidata item ${qid}`} />
        }
        {
        status  && loadingStatus === 'loaded' && images.length > 0 &&
          <Measure bounds onResize={contentRect => this.setState({ width: contentRect.bounds.width})}>
          {({ measureRef }) => {
            if (width < 1)  return <div ref={measureRef} />
            let columns = 1
            if (width >= 320) columns = 2
            if (width >= 750) columns = 3
            if (width >= 1200) columns = parseInt(width / 300, 10)
            return (<div ref={measureRef}>
              <Row><div className="depict-title"><span>{`Depictions of ${qid} on Wikimedia Commons`}</span><span className="depict-hits">{`${totalhits} images found${totalhits > 100 ? ', only the first 100 are shown' : ''}`}</span></div></Row>
              <Gallery
                photos={images}
                ImageComponent={Image}
                columns={columns}
                margin={5}
                onClick={this.openLightbox}
              />
              <Lightbox
                images={images}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClickImage={this.onClickImage}
                currentImage={currentImage}
                isOpen={lightboxIsOpen}
                theme={lightboxTheme}
                spinnerColor={'#aaa'}
                backdropClosesModal={true}
                />
            </div>)
          }}
          </Measure>
        }
        {
          status && loadingStatus === 'loaded' && images.length === 0 &&
            <Message icon={IoIosWarning} info={`Cannot find any depictions of ${qid} on Wikimedia Commons.`} />
        }
        {/* load tiny thumbs to obtain the heights and widths of the images for later display */}
        {
        status && loadingStatus === 'loading' && images.length > 0 &&
        <OnImagesLoaded onLoaded={() => this.handleImagesLoaded()}>
          {
           images.map((img, i) => (
              <img id={`img${i}`} className="tiny-images" key={`img${i}`} src={img.tiny_src} alt="" style={{ display: 'none '}} />
            ))
          }
        </OnImagesLoaded>
        }
          </Container>
    )
  }
}

export default ImageGallery
