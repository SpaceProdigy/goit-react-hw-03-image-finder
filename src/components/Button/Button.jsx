import PropTypes from 'prop-types';
import React from 'react';
import css from './Button.module.css';

export const Button = props => {
  const handleClickButton = () => {
    props.nextPage();
  };
  return (
    <div className={css.box}>
      <button onClick={handleClickButton} className={css.Button} type="button">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  nextPage: PropTypes.func,
};
