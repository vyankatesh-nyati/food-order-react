import React from 'react';

import mealImg from '../../Assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
        <header className={classes.header}>
            <h1>Food Order</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealImg} alt="Food order" />
        </div>
    </>

  )
}

export default Header;