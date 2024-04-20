import { SearchResultCard } from "@/components/searchresult-card";
import { SearchResultInfo } from "@/components/searchresult-info";
import { useSearchRestaurants } from "@/lib/api/restaurant-api";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { searchResults, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!searchResults?.data || !city) {
    return <span>No results for {city}</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">cuisiniesss here!!</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo total={searchResults.pagination.total} city={city} />
        {searchResults.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
