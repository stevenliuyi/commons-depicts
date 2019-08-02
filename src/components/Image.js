import React, { Component } from 'react'

class Image extends Component {
  state = {
    titleWidth: -1,
    imageWidth: -1
  }

  render() {
    const { index, onClick, photo, margin } = this.props
    return (
      <div
        style={{ margin: margin }}
        onClick={e => onClick(e, { index, photo })}
      >
        <img
          className="thumb-image"
          width={photo.width}
          height={photo.height}
          src={photo.thumb_src}
          alt={photo.title}
          style={{
            backgroundImage: `url(${photo.tiny_src})`,
            backgroundSize: 'cover'
          }}
        />
      </div>
    )
  }
}

export default Image
