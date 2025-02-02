"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

const Search = () => {
  return (
    <div className="text-xs flex flex-row items-center gap-1 rounded-xl w-full text-gray-300 border border-gray-600 p-0">
      <Input
        type="text"
        className="bg-[#27272F] border-none rounded-xl focus-visible:ring-none focus-visible:outline-none focus-visible:border-none"
        placeholder="Search"
      />
      <div className="border border-gray-500 mr-1 p-0.5 rounded-lg">
        <SearchIcon className="h-4 w-4 m-0.5" />
      </div>
    </div>
  );
};

export default Search;
