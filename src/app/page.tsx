import ItemCard from "@/components/item-card";
import { Language } from "@prisma/client";
import Filters from "@/components/filters";
import { totalTip } from "@/lib/tips";
import Paginations from "@/components/pagination";
import { Suspense } from "react";
import ItemCardSkeletonGrid from "@/components/item-card-skeleton";

type HomeProps = {
  searchParams: { language?: string; query?: string; page?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const language = searchParams.language as Language | undefined;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await totalTip(query, language);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col p-4">
        <Filters />
        <div className="flex-grow">
          <Suspense fallback={<ItemCardSkeletonGrid />}>
            <ItemCard
              language={language}
              query={query}
              currentPage={currentPage}
            />
          </Suspense>
        </div>
        <Paginations totalPages={totalPages} />
      </div>
    </main>
  );
}
