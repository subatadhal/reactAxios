import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
//https://www.npmjs.com/package/react-image-gallery

class PhotoAlbum extends React.Component {
  handleImageLoad(event) {
   console.log('Image loaded ', event.target)
 }
  render() {
    const images = [
      {
        original: 'http://lorempixel.com/800/300/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/800/300/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/800/300/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      },
      {
        original: 'http://lorempixel.com/800/300/nature/4/',
        thumbnail: 'http://lorempixel.com/250/150/nature/4/'
      },
      {
        original: 'http://lorempixel.com/800/300/nature/5/',
        thumbnail: 'http://lorempixel.com/250/150/nature/5/'
      }
    ]
    return (
      <div className="container" style={{'marginTop':'70px'}}>
        <ImageGallery
        items={images}
        slideInterval={2000}
        onImageLoad={this.handleImageLoad}/>
      </div>
    )
  }
}

export default PhotoAlbum;
