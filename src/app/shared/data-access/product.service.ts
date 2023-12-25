import { Injectable, inject } from "@angular/core";
import { Product } from "../models/product";
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {
  private readonly url = "http://localhost:3000/products";
  private readonly http = inject(HttpClient);

  add(product: Product) {
    return this.http.post<Product>(this.url, product);
  }

  update(product: Product) {
    const url = `${this.url}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  get(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.get<Product>(url);
  }

  delete(id: string) {
    const url = `${this.url}/${id}`;
    return this.http.delete<Product>(url);
  }

  getAll() {
    return this.http.get<Product[]>(this.url).pipe(delay(300));
  }
}
