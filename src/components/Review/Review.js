import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(productKeys);
  }, [])

  return (
    <div>
      <h2>This is review</h2>
    </div>
  );
};

export default Review;