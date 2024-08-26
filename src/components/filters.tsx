"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Language } from "@prisma/client";
import Form from "./form";
import { useDebouncedCallback } from "use-debounce";

export default function Filters() {
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const selectedLanguage = searchParams.get("language");

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <div className="ml-auto py-2 pr-8 flex items-center gap-2">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search tips..."
          className="pl-8 pr-4 py-2 max-[480px]:w-[160px] md:w-[250px] rounded-md"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href={{ pathname: "/", query: { language: Language.Python } }}
            >
              <DropdownMenuCheckboxItem
                checked={selectedLanguage === Language.Python}
              >
                Python
              </DropdownMenuCheckboxItem>
            </Link>
            <Link
              href={{ pathname: "/", query: { language: Language.Javascript } }}
            >
              <DropdownMenuCheckboxItem
                checked={selectedLanguage === Language.Javascript}
              >
                Javascript
              </DropdownMenuCheckboxItem>
            </Link>
            <Link href={{ pathname: "/", query: { language: Language.Rust } }}>
              <DropdownMenuCheckboxItem
                checked={selectedLanguage === Language.Rust}
              >
                Rust
              </DropdownMenuCheckboxItem>
            </Link>
            <Link href={{ pathname: "/", query: { language: Language.Go } }}>
              <DropdownMenuCheckboxItem
                checked={selectedLanguage === Language.Go}
              >
                Go
              </DropdownMenuCheckboxItem>
            </Link>
            <Link href={{ pathname: "/", query: {} }}>
              <DropdownMenuCheckboxItem checked={!selectedLanguage}>
                All
              </DropdownMenuCheckboxItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Form />
    </div>
  );
}
