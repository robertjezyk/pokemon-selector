import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

export const PokemonLoadingCard = () => {
  return (
    <Card className="my-8 w-[400px] flex">
      <CardContent className="w-[200px] p-4 border-r border-r-[hsl(var(--border))] space-y-12">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
      <CardContent className=" w-[200px] p-4 flex justify-center items-center">
        <Skeleton className="h-[200px] w-full" />
      </CardContent>
    </Card>
  );
};
