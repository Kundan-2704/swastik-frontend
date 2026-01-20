export const findCategoryTitle = (
  categories: any[],
  slug?: string
): string => {
  if (!slug) return "SAREES";

  const found = categories.find(
    (cat) => cat.categoryId === slug || cat.slug === slug
  );

  return found?.name || "SAREES";
};
