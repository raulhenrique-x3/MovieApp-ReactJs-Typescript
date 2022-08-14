import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../iconsComponent/SearchIcon";
import { useState } from "react";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!searchItem) return;

    navigate(`/Search?q=${searchItem}`);
    setSearchItem("");
  };

  return (
    <form className="searchForm" onSubmit={handleSubmit}>
      <div className="inputSearch">
        <input
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
          type={"text"}
          placeholder="Pesquisa"
          className="inputWidth"
        ></input>
        <button type="submit" className="searchButton">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};
