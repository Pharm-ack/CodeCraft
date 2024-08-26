import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Language } from "@prisma/client";
import { timeAgo } from "@/lib/utils";
import { filteredTips } from "@/lib/tips";
import ItemCardSkeletonGrid from "./item-card-skeleton";

type ItemCardProps = {
  query: string;
  currentPage: number;
  language?: Language;
};

export default async function ItemCard({
  query,
  currentPage,
  language,
}: ItemCardProps) {
  const tips = await filteredTips(query, currentPage, language);

  if (!tips) {
    <ItemCardSkeletonGrid />;
  }

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <Card key={tip.id}>
            <CardContent>
              <div className="flex items-center pt-5 gap-2">
                <Badge variant="outline" className="bg-primary/20 text-primary">
                  {tip.language}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Posted {timeAgo(tip.createdAt)}
                </div>
              </div>
              <h3 className="text-lg font-medium mt-3">{tip.title}</h3>
              <p className="text-muted-foreground">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
