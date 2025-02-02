"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

const Search = () => {
  return (
    <div className="relative text-xs">
      <Input
        type="text"
        className="bg-[#27272F] rounded-xl w-full text-gray-300 p-2"
        placeholder="Search"
      />
      <div className="absolute right-2 top-2 border rounded-lg">
        <SearchIcon className="h-5 w-5 p-1" />
      </div>
    </div>
  );
};

export default Search;
