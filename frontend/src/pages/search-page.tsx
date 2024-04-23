import { useState } from "react";
import { useParams } from "react-router-dom";

import { SearchResultCard } from "@/components/searchresult-card";
import { SearchResultInfo } from "@/components/searchresult-info";
import { useSearchRestaurants } from "@/lib/api/restaurant-api";
import { SearchForm, Searchbar } from "@/components/searchbar";
import { PaginationSelector } from "@/components/pagination-selector";
import { CuisineFilter } from "@/components/cuisine-filter";
import { SortOptionDropdown } from "@/components/sortoption-dropdown";
import { LoadingScreen } from "@/components/loading-screen";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const { searchResults, isLoading, isError } = useSearchRestaurants(
    searchState,
    city
  );

  const noResult = searchResults?.data.length === 0;

  if (isError && !isLoading && !city) {
    return <span>Something went wrong!</span>;
  }

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          onChange={setSelectedCuisines}
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setIsExpanded((prevIsExpanded) => !prevIsExpanded)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <Searchbar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        {isLoading ? (
          <LoadingScreen isLoading />
        ) : (
          searchResults?.data &&
          city && (
            <>
              <div className="flex flex-col justify-between lg:flex-row gap-3">
                <SearchResultInfo
                  total={searchResults.pagination.total}
                  city={city}
                  noResult={noResult}
                />
                <SortOptionDropdown
                  sortOption={searchState.sortOption}
                  onChange={(value) => setSortOption(value)}
                />
              </div>
              {searchResults.data.map((restaurant) => (
                <SearchResultCard
                  key={restaurant._id}
                  restaurant={restaurant}
                />
              ))}
              {!noResult && (
                <PaginationSelector
                  page={searchResults.pagination.page}
                  pages={searchResults.pagination.pages}
                  onPageChange={setPage}
                />
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
