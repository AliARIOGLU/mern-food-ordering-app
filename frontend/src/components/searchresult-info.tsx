import { Link } from "react-router-dom";

type SearchResultInfoProps = {
  total: number;
  city: string;
};

export const SearchResultInfo = ({ total, city }: SearchResultInfoProps) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-1.5 text-sm font-semibold hover:underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
      insert sort dropdown here
    </div>
  );
};
