import React from 'react';
import { string, object } from 'yup';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';

const schema = object({
  search: string()
    .min(2, 'Too Short! Min 2 letter ')
    .max(20, 'Too Long! Max 20 letter ')
    .matches(
      /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+(([' \\-][a-zA-Zа-яА-ЯґҐєЄіІїЇ ])?[a-zA-Zа-яА-ЯґҐєЄіІїЇ]*)*$/,
      'Invalid name format'
    ),
});

export const Searchbar = props => {
  const handleSubmit = (value, { resetForm }) => {
    const valueNormalize = value.search.trim().toLowerCase();
    if (valueNormalize === '') {
      return;
    }
    props.value(valueNormalize);
    resetForm();
  };
  return (
    <header className={css.SearchBar}>
      <Formik
        initialValues={{ search: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        <Form className={css.SearchForm}>
          <button
            type="submit"
            title="Сlick to submit the form"
            className={css.SearchFormButton}
          >
            <AiOutlineSearch className={css.SearchIcon} />
          </button>
          <Field
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            maxLength="25"
          />

          <div className={css.wrapperError}>
            <ErrorMessage
              className={css.errorMessage}
              name="search"
              component="div"
            />
          </div>
        </Form>
      </Formik>
    </header>
  );
};

Searchbar.prototype = {
  value: PropTypes.func.isRequired,
};
