import { useState } from "react";
import { useParams } from "react-router-dom";

import { SearchResultCard } from "@/components/searchresult-card";
import { SearchResultInfo } from "@/components/searchresult-info";
import { useSearchRestaurants } from "@/lib/api/restaurant-api";
import { SearchForm, Searchbar } from "@/components/searchbar";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { searchResults, isLoading } = useSearchRestaurants(searchState, city);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!searchResults?.data || !city) {
    return <span>No results for {city}</span>;
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">cuisiniesss here!!</div>
      <div id="main-content" className="flex flex-col gap-5">
        <Searchbar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={searchResults.pagination.total} city={city} />
        {searchResults.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
