import React from "react";
import CategorySheet from "./CategorySheet";
import type { NavigateFunction } from "react-router-dom";

interface Category {
  categoryId: string;
  name: string;
}

interface DesktopMenuProps {
  mainCategory: Category[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: string;
  showSheet: boolean;
  navigate: NavigateFunction;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  mainCategory,
  setSelectedCategory,
  setShowSheet,
  selectedCategory,
  showSheet,
  navigate,
}) => {
  return (
    <div
      className="relative"
      onMouseLeave={() => setShowSheet(false)}
    >
      <ul className="flex gap-10 text-[15px] font-medium text-[#4A1F2A]">
        {mainCategory.slice(0, 5).map((item) => (
          <li
            key={item.categoryId}
            className="cursor-pointer hover:text-[#B5933A]"
            onMouseEnter={() => {
              setSelectedCategory(item.categoryId);
              setShowSheet(true);
            }}
            onClick={() =>
              navigate(`/products/${item.categoryId}`)
            }
          >
            {item.name}
          </li>
        ))}
      </ul>

      {showSheet && (
        <div className="absolute left-0 top-full w-full">
          <CategorySheet
            selectedCategory={selectedCategory}
            onClose={() => setShowSheet(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;