import { accessoriesLevelThree } from "./levelThree/accessoriesLevelThree";
import { dailyWearLevelThree } from "./levelThree/dailyWearLevelThree";
import { handloomLevelThree } from "./levelThree/handloomLevelThree";
import { kosaLevelThree } from "./levelThree/kosaLevelThree";
import { menLevelThree } from "./levelThree/menLevelThree";
import { printedLevelThree } from "./levelThree/printedLevelThree";
import { tussarLevelThree } from "./levelThree/tassarLevelThree";
import { weddingLevelThree } from "./levelThree/weddingLevelThree";
import { womenLevelThree } from "./levelThree/womenLevelThree";
import { accessoriesLevelTwo } from "./levelTwo/accessoriesLevelTwo";
import { dailyWearLevelTwo } from "./levelTwo/dailyWearLevelTwo";
import { handloomLevelTwo } from "./levelTwo/handloomLevelTwo";
import { kosaLevelTwo } from "./levelTwo/kosaLevelTwo";
import { menLevelTwo } from "./levelTwo/menLevelTwo";
import { printedLevelTwo } from "./levelTwo/printedLevelTwo";
import { tussarLevelTwo } from "./levelTwo/tassarLevelTwo";
import { weddingLevelTwo } from "./levelTwo/weddingLevelTwo";
import { womenLevelTwo } from "./levelTwo/womenLevelTwo";
import { mainCategory } from "./mainCategory";


export const allCategories = [
    ...mainCategory,

    ...kosaLevelTwo,
    ...kosaLevelThree,

    ...tussarLevelTwo,
    ...tussarLevelThree,

    ...handloomLevelTwo,
    ...handloomLevelThree,

    ...dailyWearLevelTwo,
    ...dailyWearLevelThree,

    ...printedLevelTwo,
    ...printedLevelThree,

    ...weddingLevelTwo,
    ...weddingLevelThree,

    ...womenLevelTwo,
    ...womenLevelThree,

    ...menLevelTwo,
    ...menLevelThree,

    ...accessoriesLevelTwo,
    ...accessoriesLevelThree
];