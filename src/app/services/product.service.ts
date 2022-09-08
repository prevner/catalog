import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root' //disponible dans la racine du projet, tout le projet
})
export class ProductService {

  private products! : Array<Product>;

  constructor() { 
    this.products =  [
      {
        id : 1,
        name: "computer",
        price: 6500,
        promotion : true
      },
      {
        id : 2,
        name: "Printer",
        price: 1200,
        promotion : false
      },
      {
        id : 3,
        name: "Smart phone",
        price: 1400,
        promotion : true
      }
    ];

  }

  //methode permettant de retourner tous les données

  public getAllProducts() : Observable<Array<Product>>{
    let rnd =Math.random()
    if(rnd<0.1) return throwError(()=>new Error("internet  connection error"))
    else
    return of(this.products)
  }

  //methode permettant de supprimer une donnée
  public deleteProduct(id : number) : Observable<boolean>
  {
    this.products = this.products.filter(p=>p.id!=id)
    return of(true)
  }

  //méthode permettant de modifier une promotion
  public setPromotion(id : number) : Observable<boolean>
  {
    let product =  this.products.find(p=>p.id==id);
    if (product !=  undefined) {
        product.promotion = !product.promotion

        return of(true)
    }else return throwError(()=> new Error("Product not found"))
  }
}
