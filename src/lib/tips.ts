import { Language, Tip, Prisma } from "@prisma/client";
import prisma from "./db";
import { unstable_noStore as noStore } from "next/cache";

const ITEM_PER_PAGE = 6;

export async function filteredTips(
  query: string,
  currentPage: number,
  language?: Language
): Promise<Tip[]> {
  noStore();
  const offset = (currentPage - 1) * ITEM_PER_PAGE;

  try {
    const whereClause: Prisma.TipWhereInput = {
      ...(language ? { language } : {}),
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      ],
    };

    const posts = await prisma.tip.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: ITEM_PER_PAGE,
    });

    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function totalTip(
  query: string,
  language?: Language
): Promise<number> {
  noStore();
  try {
    const whereClause = {
      ...(language ? { language } : {}),
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    const count = await prisma.tip.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / ITEM_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
