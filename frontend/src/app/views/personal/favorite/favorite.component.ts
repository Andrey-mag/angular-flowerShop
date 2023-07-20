import {Component, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/fovorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/defaultResponse.type";
import {environment} from "../../../../environments/environment";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  products: FavoriteType[] = []
  product: FavoriteType | null | undefined = null;
  serverStaticPath = environment.serverStaticPath;

  constructor(private favoriteService: FavoriteService,
              private cartService: CartService) {

  }

  ngOnInit() {
    this.getFavoriteProducts();

  }

  getFavoriteProducts() {
    this.favoriteService.getFavorites()
      .subscribe((data: FavoriteType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error)
        }

        this.products = (data as FavoriteType[]);  //Получаем все продукты которые находятся в избранном

      })
  }

  removeFormFavorite(id: string) {
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          //.
          throw new Error(data.message)
        }
        this.products = this.products.filter(item => item.id !== id)
      })
  }

  addToCart(id: string, count: number) {
    this.cartService.updateCart(id, count)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw  new Error((data as DefaultResponseType).message)
        }

        this.getFavoriteProducts();
      });
  }

  updateCount(product: FavoriteType, value: number) {
    let count = value;
    if (product.countInCart) {
      this.cartService.updateCart(product.id, count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw  new Error((data as DefaultResponseType).message)
          }
          product.countInCart = count;
        })
    }
  }

}
