/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Overview from './Overview';
import RatingsAndReviews from './RatingsAndReviews';
import QAndA from './QAndA';
import RelatedProducts from './RelatedProducts';

const appStyle = {
  maxWidth: '1000px',
  margin: 'auto',
  background: 'white',
  padding: '10px'
};

const App = () => {
  const [productArray, setProductArray] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(20103);
  const [productReviewArray, setProductReviewArray] = useState();
  const [relatedProductIds, setRelatedProductIds] = useState();
  const [reviewMetaData, setReviewMetaData] = useState();
  const [productStyles, setProductStyles] = useState();

  useEffect(() => {
    getProductStyles(currentProductId);
    getProducts();
  }, [currentProductId]);

  // OVERVIEW
  const getProducts = () => {
    axios.get('/products')
      .then((res) => (
        setProductArray(res.data)
      ))
      .then(() => getReviews(currentProductId))
      .then(() => getRelatedProductIds(currentProductId))
      .then(() => getReviewsMeta(currentProductId))
      .then(() =>getProductStyles(currentProductId))
      .catch((err) => console.log('initial products ', err));
  };

  const getProductStyles = (id) => {
    axios.get(`/products/${id}/styles`)
      .then((res) => (
        setProductStyles(res.data)
      ))
      .catch((err) => console.log('get product styles ', err));
  };

  // RATINGS & REVIEWS
  const getReviews = (id) => {
    axios.get(`/reviews/${id}`)
      .then((res) => (
        setProductReviewArray(res.data)
      ))
      .catch((err) => console.log('get reviews ', err));
  };

  const getReviewsMeta = (id) => {
    axios.get(`/reviews/meta/${id}`)
      .then((res) => (
        setReviewMetaData(res.data)
      ))
      .catch((err) => console.log('get review meta ', err));
  };

  const putReviewHelpful = (review_id) => {
    axios.put(`/reviews/${review_id}/helpful`)
      .then(() => {
        console.log('putReviewHelpful works!!');
        getReviews();
      })
      .catch((err) => console.log('put reviews ', err));
  };

  const putReviewReport = (review_id) => {
    axios.put(`/reviews/${review_id}/report`)
      .then(() => {
        getReviews();
      })
      .catch((err) => console.log('put reviews ', err));
  };

  const postReviews = (review) => {
    axios.post('/reviews', review)
      .then(() => getReviews())
      .catch((err) => console.log('post review ', err));
  };

  // RELATED PRODUCTS
  const getRelatedProductIds = (id) => {
    axios.get(`/products/${id}/related`)
      .then((res) => (
        setRelatedProductIds(res.data)
      ))
      .catch(err => console.log('get related product ids ', err));
  };

  if (productReviewArray) {
    return (
      <div>
        {console.log('this is styles, ', productStyles)}
        <Overview
          productStyles={productStyles}
          currentProductId={currentProductId}
          getProductStyles={getProductStyles}
        />
        <div style={appStyle}>
          <RelatedProducts
            setCurrentProductId={setCurrentProductId}
          />
          <QAndA
            currentProductId={currentProductId}
          />
          <RatingsAndReviews
            reviewArray={productReviewArray}
            setReviewArray={productReviewArray}
          />
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default App;
