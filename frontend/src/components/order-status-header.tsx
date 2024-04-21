import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { getExpectedDelivery, getOrderStatusInfo } from "@/lib/utils";

type OrderStatusHeaderProps = {
  order: Order;
};

export const OrderStatusHeader = ({ order }: OrderStatusHeaderProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {getOrderStatusInfo(order).label}</span>
        <span>Expected By: {getExpectedDelivery(order)}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo(order).progressValue}
      />
    </>
  );
};
