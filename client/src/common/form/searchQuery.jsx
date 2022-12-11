import React from "react";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";
const SearchQuery = ({ placeholder, onChange }) => {
  return (
    <div className="search-query">
      <input
        className="search-query__input"
        placeholder={placeholder}
        onChange={onChange}
        type="text"
      />
      <CiSearch />
    </div>
  );
};
SearchQuery.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
export default SearchQuery;
