export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  description: string;
  sizes: string[];
  colors: string[];
  category: string;
  slug: string;
  sku?: string;
}

export interface FilterState {
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

export type FilterContextType = {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
};