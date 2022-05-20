import React, { useEffect, useState } from 'react';
import StyleCircle from './ProductOverview/StyleCircle.jsx';


const ProductOverview = ({ product }) => {
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});

  useEffect(() => {
    const fetchProductStyles = async () => {
      if (product.id) {
        try {
          let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
          const stylesURL = `${process.env.REACT_APP_API}products/${product.id}/styles`;
          const response = await fetch(stylesURL, headers);
          const stylesArray = await response.json();
          setStyles(stylesArray);
          setCurrentStyle(stylesArray.results[0]);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchProductStyles();
  }, [product.id]);

  const getStylesPhotos = () => {
    let photos = []
    for (let style of styles.results) {
      photos.push(style.photos?.[0].thumbnail_url)
    }
    return photos;
  }

  if (loaded) {
    const selectedStyleId = currentStyle.style_id;
    //console.log(currentStyle)
    const stylesPhotosThumbnailUrls = getStylesPhotos();
    //console.log(styles.results)
    //console.log(stylesPhotos)


    return (
      <div className="section">
        <div className="container">
          <div className="page-padding">
            <div className="product-overview-grid">
              <div className="">
                <div className="carousel-image-wrapper">
                  {stylesPhotosThumbnailUrls.map((photoUrl) => {
                    return <img className="carousel-image" src={photoUrl} alt={product.name} />
                  })}
                </div>
              </div>
              <div className="">
                <span>Star Component here</span>
                <p className="text-all-caps">{product.category}</p>
                <h2>{product.name}</h2>
                <h3>{product.price}</h3>
                <div className="flex">
                  <p className="text-all-caps is-bold">Style > </p>
                  <p className="text-all-caps">{currentStyle.name}</p>
                </div>
                <div className="style-circle-grid">
                  {stylesPhotosThumbnailUrls.map((url, index) => {
                    return <StyleCircle key={url + index} url={url} index={index} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductOverview
