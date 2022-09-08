import { Component, OnInit } from '@angular/core';
import { Product } from '../model/products.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!: Array<Product>;
  errorMessage ! : string;

  //nous allons utiliser notre service dans le constructeur de notre constructeur de composant
  constructor(private productService : ProductService) {}

  // s'exécute au démarrage
  ngOnInit(): void {
     
    this.handleGetAllProducts();
   
  }

  //je crée ma méthode qui va me permettre de récuperer tous les produits
  handleGetAllProducts()
  {
    this.productService.getAllProducts().subscribe(
      {
        //si tout se passe bien j'ai mon next au cas contraire j'ai une erreur
        next : (data) =>{
          this.products = data;
        },
        error : (err)=>{
              this.errorMessage = err;
        }
      }
     );
  }

  //création de ma méthode me permettant de supprimer un produit
  handleDeleteProduct(p : Product)
  {
       let conf = confirm("Are you sure?")
       

       if(conf==false) return;
        //console.log(p.id);
        this.productService.deleteProduct(p.id).subscribe({
          next : (data:boolean)=>{
            let index = this.products.indexOf(p)
            this.products.splice(index)
          }
        });
        
  }

  handleSetPromotion(p : Product)
  {
    let promo = p.promotion
    this.productService.setPromotion(p.id).subscribe(
      {
        next: (data : boolean)=>{
          p.promotion = !promo

        },
        error : err =>{
          this.errorMessage = err;
        }
      }
    )
  }

}
