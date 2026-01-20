type Category = {
  name: string;
  categoryId: string;
  level: number;
};

export const findCategoryFromSearch = (
  search: string,
  categories: Category[]
): Category | null => {
  if (!search) return null;

  const normalizedSearch = search.toLowerCase().trim();

  return (
    categories.find((cat) => {
      const name = cat.name.toLowerCase();

      return (
        normalizedSearch === name ||           // exact match
        normalizedSearch.includes(name) ||     // "tussar sarees silk"
        name.includes(normalizedSearch)        // "tussar"
      );
    }) || null
  );
};
