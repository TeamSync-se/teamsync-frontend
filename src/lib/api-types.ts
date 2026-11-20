/** Kết quả danh sách có phân trang của backend. `page` đếm từ 0. */
export type Page<T> = {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
};
