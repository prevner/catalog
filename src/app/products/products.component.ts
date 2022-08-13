import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Array<any>;
  constructor() { }

  // s'exécute au démarrage
  ngOnInit(): void {
    this.products =  [
      {
        id : 1,
        name: "computer",
        price: 6500
      },
      {
        id : 2,
        name: "Printer",
        price: 1200
      },
      {
        id : 3,
        name: "Smart phone",
        price: 1400
      }
    ];

  }

  //création de ma méthode me permettant de supprimer un produit
  handleDeleteProduct(p : any)
  {
    //je recherche l'index de mon projet
    let index = this.products.indexOf(p)
    this.products.splice(index,1)

  }

}
