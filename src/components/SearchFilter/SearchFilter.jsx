import "./SearchFilter.css";

const SearchFilter = ({ search, onSearch, filter, onFilter, filterOptions, filterLabel, count, placeholder }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="search-filter-input"
      />
      {filterOptions && (
        <select
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
          className="search-filter-select"
        >
          <option value="All">{filterLabel || "All"}</option>
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
      <p className="search-filter-count">{count} results</p>
    </div>
  );
};

export default SearchFilter;