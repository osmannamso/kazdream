import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Product} from "../models/product";
import {TEST_PRODUCTS} from "../variables/variables";
import {Pagination} from "../interfaces/pagination";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Result} from "../interfaces/result";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private fb: FormBuilder
  ) {}

  getProducts(page: number, pageSize: number): Observable<Pagination> {
    const products: Array<Product> = TEST_PRODUCTS;
    const first: number = pageSize * (page - 1);

    return of({totalPages: Math.ceil(products.length / pageSize), items: products.slice(first, first + pageSize)});
  }

  createProduct(form: FormGroup): Observable<Result> {
    return of({
      success: true,
      message: 'created'
    });
  }

  updateProduct(form: FormGroup): Observable<Result> {
    return of({
      success: true,
      message: 'updated'
    })
  }

  getProductCreateForm(): FormGroup {
    return this.fb.group({
      id: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      name: ['', Validators.required]
    })
  }

  getProductUpdateForm(product: Product): FormGroup {
    return this.fb.group({
      id: [product.id, [Validators.required, Validators.pattern("^[0-9]*$")]],
      name: [product.name, Validators.required]
    })
  }
}
