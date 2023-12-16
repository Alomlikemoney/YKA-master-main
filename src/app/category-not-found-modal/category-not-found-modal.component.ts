import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-category-not-found-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Catégorie introuvable</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <p>La catégorie que vous recherchez n'a pas été trouvée.</p>
    </ion-content>
  `,
  styles: [`
    /* Ajoutez des styles personnalisés ici */
  `]
})
export class CategoryNotFoundModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
