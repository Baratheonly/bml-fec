import React, { useState, useEffect } from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './ReviewBlock.jsx';
import './Review1.css';
import ShowStars from './ShowStars.jsx';

import { IoChevronDownOutline } from "react-icons/io5";


const Reviews = (props) => {
  const [reviews, setReviews] = useState(undefined);
  const [searchText, setSearch] = useState('');
  const [page, setPage] = useState('reviews');
  const [showAdd, setShow] = useState(false);
  const [currentNum, setCurrentNum] = useState(2);
  const [state, setState] = useState(2);
  const [more, setMore] = useState(true);
  const [selectSort, setSelectSort] = useState('');
  const [ratingsNumber, setRatingsNumber] = useState(0);

  const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}`
  useEffect(() => {
    const fetchReviews = async () => {
      if (props.id) {
        try {
          let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
          const response = await fetch(url, headers);
          const reviews99 = await response.json();
          setReviews(reviews99);
        } catch (err) {
          console.log(err);
        }
      }
    }

    fetchReviews();
  }, [props.id]);

  const searchButton = () => {
    alert(searchText);
  }

  const handleClickAddReview = () => { //add would need a request.
    setShow(true);
  }

  const handleSearchTextChange = (event) => { //search would need a request.
    setSearch(event.target.value);
    //add search functions later.
  }

  const handleCloseAdd = (event) => {
    setShow(false);
  }

  const showMore = () => {
    setCurrentNum(currentNum + 2);
    (currentNum + 2) > reviews.results.length ? setMore(false) : console.log('got more');
  }

  const sortBy = () => {

  }

  const handleSort = () => {

  }



  return (
    <div className="reviewsMain">
      <div className="leftSide">
        <h1 className="reviewText">Ratings &#38; Reviews</h1>

        <ShowStars data={reviews}/>

        <div className="searchFilter">
          <form onSubmit={searchButton}>
            <label>
              <input className="searchBar" placeholder="   search" type="text" value={searchText} onChange={handleSearchTextChange} />
            </label>
            <input className="searchButton" type="submit" value="Search" />
          </form>
        </div>
      </div>

      <div className="rightSide">
        {showAdd === false ? <button className="addReviewButton" onClick={handleClickAddReview}>Add Review</button> : <p></p>}

        <div className="reviewShowing">
          {showAdd !== false ? <button className="goBack" onClick={handleCloseAdd}>Go back</button> : <p></p>}
          {showAdd === false ?
          <div>
            <p className="showingText">showing: </p>
              <form>
                <label>
                  <select value={selectSort} onChange={setSelectSort}>
                    <option value="grapefruit">Sort By</option>
                    <option value="lime">Relevant</option>
                    <option value="coconut">Newest</option>
                    <option value="mango">Helpful</option>
                    <option value="mango">Highest rated</option>
                    <option value="mango">Lowest rated</option>
                  </select>
                </label>
        </form>
          </div>
          : <p></p>}
          {showAdd === false ? <ReviewBlock className="reviewBlock" data={reviews} num={currentNum} setNum={setCurrentNum} caps={5}/> : <AddReview show={showAdd} id={props.id}/>}
          {( more === true) ? <button className="showMore" onClick={() => { showMore();}} >show more</button> : <p></p>}
        </div>

      </div>

    </div>
  );
}

export default Reviews;