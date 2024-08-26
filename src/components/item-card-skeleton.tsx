import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ItemCardSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardContent>
        <div className="flex items-center pt-5 gap-2">
          <Badge variant="outline" className="bg-gray-200 text-transparent">
            Loading
          </Badge>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
        <h3 className="text-lg font-medium mt-3 w-3/4 h-6 bg-gray-200 rounded"></h3>
        <p className="mt-2 w-full h-4 bg-gray-200 rounded"></p>
        <p className="mt-2 w-2/3 h-4 bg-gray-200 rounded"></p>
      </CardContent>
    </Card>
  );
};

export default function ItemCardSkeletonGrid() {
  return (
    <section className="py-8 px-4 md:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
