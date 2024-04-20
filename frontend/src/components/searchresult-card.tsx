import { Dot, Banknote, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import { Restaurant } from "@/types";
import { AspectRatio } from "./ui/aspect-ratio";

type SearchResultCardProps = {
  restaurant: Restaurant;
};

export const SearchResultCard = ({ restaurant }: SearchResultCardProps) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>

      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline capitalize">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <span className="flex" key={index}>
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Banknote />
              Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
