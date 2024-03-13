import Dropdown from "../../components/Dropdown";
import EnhancedTable from "../../components/EnhancedTable";
import "./dashboard.css";
import useFetch from "./../../hooks/useFetch";
import { useState } from "react";
import { SearchContext } from '../../context/SearchContext.jsx';

export default function Dashboard() {
  const {
    data: numberOfBooksData,
    loading: numberOfBooksLoading,
    error: numberOfBooksError,
  } = useFetch("http://localhost:5000/dashboard/numberOfBooks");
  const {
    data: allCategoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("http://localhost:5000/dashboard/categories");

  const [selectedGender, setSelectedGender] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    setSelectedGender(gender);
    if (gender === "men") {
      setFilteredCategories(() =>
        allCategoriesData.menCategories.map((category) => ({
          value: category,
          label: category,
        }))
      );
    } else if (gender === "women") {
      setFilteredCategories(() => {
        return allCategoriesData.womenCategories.map((category) => ({
          value: category,
          label: category,
        }));
      });
    } else {
      setFilteredCategories(() => []);
    }
  };

  const handleCategoryChange = (event) => {
    let category = event.target.value;
    setSelectedCategory(() => category);
  };

  if (numberOfBooksLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  const genderOptions = [
    { value: "men", label: "musimeen" },
    { value: "women", label: "muslimah" },
  ];

  const searchQueries = (event) => {
    setSearchQuery(() => event.target.value);
  };
  return (
    <div className="dashboard">
      <div className="search">
        <input
          type="text"
          placeholder="search"
          className="searchBar"
          onChange={searchQueries}
        />
        <Dropdown
          categories={filteredCategories}
          name="categories"
          handleChange={handleCategoryChange}
        />
        <Dropdown
          categories={genderOptions}
          name="room"
          handleChange={handleGenderChange}
        />
      </div>
      <div className="display">
        {numberOfBooksData && numberOfBooksData.menBooks && (
          <div className="numOfmenBooks">
            <p>
              <strong>Muslimeen</strong>
            </p>
            <p>available: {numberOfBooksData.menBooks} books</p>
          </div>
        )}
        {numberOfBooksData && numberOfBooksData.womenBooks && (
          <div className="numOfwomenBooks">
            <p>
              <strong>Muslimah</strong>
            </p>
            <p>available: {numberOfBooksData.womenBooks} books</p>
          </div>
        )}
      </div>
      <div className="graph"></div>
      <div className="table">
        <EnhancedTable
          categories={selectedCategory} 
          searchQueries={searchQuery}
          />
      </div>
    </div>
  );
}
