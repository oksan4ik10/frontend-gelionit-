import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.conponents.scss'],
  standalone: false,
})
export class CardsComponent {
  viewProductDetails(product: any) {
    this.router.navigate(['/product-desc', product.Product_Code], {
      state: { product: product },
    });
  }

  @Input() products: any[] = [];
  constructor(private router: Router) { }
  clickCard() {
    this.router.navigate([`product-desc`], { replaceUrl: true });
  }
}
