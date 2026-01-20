import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
// Navbar.tsx
import "./Navbar.css";


/* ------------ LEVEL 2 IMPORTS ------------ */
import { menLevelTwo } from "../../Data/Category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../Data/Category/levelTwo/womenLevelTwo";
import { sareesLevelTwo } from "../../Data/Category/levelTwo/sareesLevelTwo";
import { kosaLevelTwo } from "../../Data/Category/levelTwo/kosaLevelTwo";
import { tussarLevelTwo } from "../../Data/Category/levelTwo/tassarLevelTwo";
import { handloomLevelTwo } from "../../Data/Category/levelTwo/handloomLevelTwo";
import { weddingLevelTwo } from "../../Data/Category/levelTwo/weddingLevelTwo";
import { dailyWearLevelTwo } from "../../Data/Category/levelTwo/dailyWearLevelTwo";
import { printedLevelTwo } from "../../Data/Category/levelTwo/printedLevelTwo";

/* ------------ LEVEL 3 IMPORTS ------------ */
import { menLevelThree } from "../../Data/Category/levelThree/menLevelThree";
import { womenLevelThree } from "../../Data/Category/levelThree/womenLevelThree";
import { sareesLevelThree } from "../../Data/Category/levelThree/sareesLevelThree";
import { kosaLevelThree } from "../../Data/Category/levelThree/kosaLevelThree";
import { tussarLevelThree } from "../../Data/Category/levelThree/tassarLevelThree";
import { handloomLevelThree } from "../../Data/Category/levelThree/handloomLevelThree";
import { weddingLevelThree } from "../../Data/Category/levelThree/weddingLevelThree";
import { dailyWearLevelThree } from "../../Data/Category/levelThree/dailyWearLevelThree";
import { printedLevelThree } from "../../Data/Category/levelThree/printedLevelThree";

/* ------------ TYPES ------------ */
interface SubCategory {
  name: string;
  categoryId: string;
  parentCategoryId: string;
  level: number;
}

/* --------- CATEGORY GROUPING --------- */

// LEVEL 1 → LEVEL 2
const categoryTwo: Record<string, SubCategory[]> = {
  men: menLevelTwo,
  women: womenLevelTwo,
  sarees: sareesLevelTwo,

  kosa_sarees: kosaLevelTwo,
  tussar_sarees: tussarLevelTwo,
  handloom_sarees: handloomLevelTwo,

  wedding_sarees: weddingLevelTwo,
  daily_wear_sarees: dailyWearLevelTwo,
  printed_sarees: printedLevelTwo,
};

// LEVEL 1 → LEVEL 3
const categoryThree: Record<string, SubCategory[]> = {
  men: menLevelThree,
  women: womenLevelThree,
  sarees: sareesLevelThree,

  kosa_sarees: kosaLevelThree,
  tussar_sarees: tussarLevelThree,
  handloom_sarees: handloomLevelThree,

  wedding_sarees: weddingLevelThree,
  daily_wear_sarees: dailyWearLevelThree,
  printed_sarees: printedLevelThree,
};

/* ------------ COMPONENT ------------ */
const CategorySheet = ({
  selectedCategory,
  onClose,
}: {
  selectedCategory: string;
  onClose?: () => void;
}) => {
  const navigate = useNavigate();

  const levelTwoList = categoryTwo[selectedCategory] || [];
  const levelThreeList = categoryThree[selectedCategory] || [];

  /* ---- Group level 3 by parent (PERFORMANCE OPTIMIZED) ---- */
  const groupedChildren = useMemo(() => {
    const map: Record<string, SubCategory[]> = {};
    levelThreeList.forEach((child) => {
      if (!map[child.parentCategoryId]) {
        map[child.parentCategoryId] = [];
      }
      map[child.parentCategoryId].push(child);
    });
    return map;
  }, [levelThreeList]);

  return (
    <Box
     data-lenis-prevent
      className="
        bg-[#F8F3E8]
        border border-[#E3D4B6]
        shadow-[0_22px_42px_rgba(0,0,0,0.12)]
        rounded-b-[26px]
        max-h-[70vh]
        overflow-y-auto
        pt-4 pb-6
        category-sheet ...
      "
    >
      <div className="flex flex-wrap text-sm md:text-[15px] text-[#4A1F2A]">
        {levelTwoList.map((item) => {
          const children = groupedChildren[item.categoryId] || [];

          return (
            <div
              key={item.categoryId}
              className="
                px-6 md:px-10
                py-6
                lg:w-[22%]
                min-w-[200px]
                border-r border-[#E3D4B6]/60
                last:border-r-0
              "
            >
              {/* LEVEL 2 */}
              <p
                onClick={() => {
                  navigate(`/products/${item.categoryId}`);
                  onClose?.();
                }}
                className="
                  mb-5
                  font-semibold
                  text-[#B5933A]
                  tracking-wide
                  cursor-pointer
                  hover:underline
                "
              >
                {item.name}
              </p>

              {/* LEVEL 3 */}
              {children.length > 0 ? (
                <ul className="space-y-3">
                  {children.map((child) => (
                    <li
                      key={child.categoryId}
                      onClick={() => {
                        navigate(`/products/${child.categoryId}`);
                        onClose?.();
                      }}
                      className="
                        cursor-pointer
                        transition-all
                        hover:text-[#B5933A]
                        hover:translate-x-[3px]
                      "
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400">
                  No sub categories
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default CategorySheet;
