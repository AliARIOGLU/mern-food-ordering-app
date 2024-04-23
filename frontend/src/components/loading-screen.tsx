import { Pizza } from "lucide-react";

type LoadingScreenProps = {
  isLoading: boolean;
};

export const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  if (!isLoading) return null;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Pizza className="w-16 h-16 text-orange-500 animate-spin" />
    </div>
  );
};
