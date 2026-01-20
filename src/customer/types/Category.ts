export type CategoryLevel = 1 | 2 | 3;

export interface Category {
  name: string;
  categoryId: string;
  parentCategoryId?: string;
  level: CategoryLevel;
}
