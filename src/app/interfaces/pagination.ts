import {Product} from "../models/product";

export interface Pagination {
  totalPages: number;
  items: Array<Product>;
}
