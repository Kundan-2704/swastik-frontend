import React from "react";
import { Button } from "@mui/material";

interface SearchBarProps {
  showSearch: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showSearch,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  if (!showSearch) return null;

  return (
    <div className="px-4 md:px-10 py-3 border-t border-[#ECDCC2]">
      <div className="flex gap-2 max-w-3xl mx-auto">
        <input
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && handleSearch()
          }
          placeholder="Search sarees, handloom, kosa silk..."
          className="w-full px-4 py-2 rounded-full border border-[#B5933A]"
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            backgroundColor: "#4A1F2A",
            borderRadius: "999px",
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;