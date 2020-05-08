import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "./services/product.service";
import {Product} from "./models/product";
import {Pagination} from "./interfaces/pagination";
import {Subscription} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Result} from "./interfaces/result";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  pageSize: number = 5;
  currentPage: number = 1;
  pages: Array<number> = [];

  creatingForm: FormGroup;
  updatingForm: FormGroup;
  creating: boolean = false;
  updating: boolean = false;
  updatingIndex: number;
  productsSubscription: Subscription;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.updateData();
  }

  updateData(): void {
    this.productsSubscription = this.productService.getProducts(this.currentPage, this.pageSize).subscribe((pagination: Pagination) => {
      this.products = pagination.items;
      this.pages = [...Array(pagination.totalPages).keys()];
    })
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateData();
  }

  changeCreating(): void {
    this.creating = !this.creating;
    this.creatingForm = this.productService.getProductCreateForm();
  }

  createProduct(): void {
    if (this.creatingForm.valid) {
      this.productService.createProduct(this.creatingForm).subscribe((data: Result) => {
        this.products.push(this.creatingForm.getRawValue());
      })
    }
  }

  deleteProduct(index: number): void {
    this.products.splice(index, 1);
  }

  startUpdatingProduct(index: number): void {
    this.updatingIndex = index;
    this.updating = true;
    this.updatingForm = this.productService.getProductUpdateForm(this.products[index]);
  }

  updateProduct(): void {
    this.productService.updateProduct(this.updatingForm).subscribe((data: Result) => {
      this.products[this.updatingIndex] = this.updatingForm.getRawValue();
      this.updatingIndex = null;
      this.updating = false;
    })
  }

  cancelUpdating() {
    this.updatingIndex = null;
    this.updating = false;
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
