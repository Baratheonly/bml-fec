import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import imageNotAvailable from '../../assets/image-not-available.png'
import Price from '../Price';
import ShowStars from '../ReviewComponents/ShowStars';
import CardButton from './CardButton';

const HEADERS = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } };

const stylesCache = {}; // stores previous style API requests

const ProductCard = ({ product, Icon, iconHandler, iconHandlerClose}) => {
  const navigate = useNavigate();
  const [currentStyle, setCurrentStyle] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [styles, setStyles] = useState([]);
  const [styleSwitcherActive, setStyleSwitcherActive] = useState(false);

  const parseFontSize = (size) => {
    return `${size}rem`;
  }

  const fontSize = parseFontSize(1); // the fontsize in rem

  useEffect(() => {
    const fetchProductStyles = async () => {
      try {
        let stylesArray;
        const stylesURL = `${process.env.REACT_APP_API}products/${product.id}/styles`;
        if (stylesCache[stylesURL]) {
          stylesArray = stylesCache[stylesURL];
        } else {
          const response = await fetch(stylesURL, HEADERS);
          stylesArray = await response.json();
          stylesCache[stylesURL] = stylesArray;
        }
        setStyles(stylesArray);
        setCurrentStyle(stylesArray.results[0]);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductStyles();
  }, [product.id]);

  const handleClick = useCallback(() => {
    navigate(`/${product.id}`, { replace: true});
  }, [navigate, product.id])

  const handleStyleClick = (e) => {
    e.stopPropagation();
    setCurrentStyle(styles.results.find(style => (
      String(style.style_id) === e.target.name
    )))
  }

  const handleImageEnter = (e) => {
    setStyleSwitcherActive(true);
  }

  const handleImageLeave = (e) => {
    setStyleSwitcherActive(false);
  }

  const imageExists = () => {
    const attemptedURL = currentStyle.photos[0].thumbnail_url;
    return (typeof attemptedURL === 'string')
  }


  if (loaded) {
    const imageIsProvided = imageExists();
    const image = imageIsProvided ?
      currentStyle.photos[0].thumbnail_url : imageNotAvailable;

    let styleSwitcher = (
      <div className='card-style-grid-overlay'>
          <div className='card-style-grid'>
            {styles.results.map((style, index) => {
              {/* TODO: Implement a carousel for the pics */}
              if (index > 3) { return }; // DANGER: Remove this when implementing scroll
              let clsName = (style === currentStyle) ?
                'card-style-circle card-style-circle-selected' : 'card-style-circle';
              return (
                // TODO: if related product is clicked,
                // detail overview should start on the selected style
                <img className={clsName}
                     key={style.style_id}
                     name={style.style_id}
                     onMouseEnter={handleStyleClick}
                     src={style.photos[0].thumbnail_url}
                     alt=''
                />
              )
            })}
        </div>
      </div>
    )

    // style switch is pre-loaded but don't activate it unless mouse is over
    // the picture
    let styleSwitcherElement, buttonIcon;
    if (styleSwitcherActive) {
      styleSwitcherElement = styleSwitcher;
      buttonIcon = (
        <CardButton
          Icon={Icon}
          iconHandler={iconHandler}
          iconHandlerClose={iconHandlerClose}
          product={product}
        />
      )
    } else {
      styleSwitcherElement = <div className='card-style-grid-overlay hide'></div>;
      buttonIcon = <></>;
    }

    return (
      <>
        <div className='clickable product-card'
             style={{"fontSize": fontSize}}
             onClick={handleClick}
             onMouseEnter={handleImageEnter}
             onMouseLeave={handleImageLeave}
        >
          <div className='card-styles-parent'>
            <img className='card-styles-thumbnail'
                 src={image}
                 alt=''
            />
            {imageIsProvided ? styleSwitcherElement : <></>}
            {buttonIcon}
          </div>
          <div className="text-all-caps"
               style={{"fontSize": parseFontSize(1)}}>
            {product.category}
          </div>
          <b>{product.name}</b>
          <Price style={currentStyle} fontSize={fontSize} />
          <div>
            Star rating component
          </div>
        </div>
      </>
    )
  }
}

export default ProductCard;