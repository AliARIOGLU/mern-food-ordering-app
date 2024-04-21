import { useParams } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { useGetRestaurantDetail } from "@/lib/api/restaurant-api";
import { RestaurantInfo } from "@/components/restaurant-info";
import { MenuItem } from "@/components/menu-item";

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurantDetail, isLoading } = useGetRestaurantDetail(restaurantId);

  if (isLoading || !restaurantDetail) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurantDetail.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurantDetail} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurantDetail.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
