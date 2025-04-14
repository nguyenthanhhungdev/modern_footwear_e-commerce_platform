export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  sizes: number[];
  color: string;
  category: string;
  tags: string[];
}

export interface FilterState {
  sizes: number[];
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
