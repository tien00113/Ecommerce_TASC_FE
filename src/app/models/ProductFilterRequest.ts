// export interface Sort {
//     property: string;
//     direction: 'ASC' | 'DESC';
// }

// export interface Pageable {
//     page: number;
//     size: number;
//     sort: Sort;
// }

// export interface ProductFilterRequest {
//     minPrice: number;
//     maxPrice: number;
//     categoryId: number | null;
//     color: string | null;
//     pageableDTO: Pageable;
// }

export interface ProductFilterRequest {
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  color?: string;
  pageableDTO: {
    page: number;
    size: number;
    sortProperty: string;
    sortDirection: string;
  };
}
