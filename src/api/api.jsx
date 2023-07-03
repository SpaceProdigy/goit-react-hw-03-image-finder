import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '36237368-27c288b102faa19f6ad3c6cec';

const options = {
  params: {
    key: `${API_KEY}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  },
};

export async function fetchPictures(value, page) {
  const response = await axios.get(`?q=${value}&page=${page}`, options);
  return response.data;
}

fetchPictures.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
