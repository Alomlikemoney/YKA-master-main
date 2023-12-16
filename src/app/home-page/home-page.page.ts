
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../confirmed-data.service';
import { NewsItem } from '../news-item.model'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map, toArray } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { forkJoin } from 'rxjs';
import { ListResult, Reference } from '@angular/fire/compat/storage/interfaces';
import {ModalController } from '@ionic/angular'; // Importez ModalController
import { SharedService } from '../shared.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoryNotFoundModalComponent } from '../category-not-found-modal/category-not-found-modal.component';
import { IonicSlides } from '@ionic/angular';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


declare var $: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})

export class HomePage  {
  categories = [
    { name: 'Bien immobilier', icon: 'home-outline' },
    { name: 'Technologie', icon: 'hardware-chip-outline' },
    // ... autres catégories
  ]
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
selectedCategory: string | null = null;
  userName: string = '';
  alerteAffichee: any;
  connexionReussie: any;
  alertconnect: any;
  confirmedFormDatas: any;
  annonces$!: Observable<any[]>; 
  newsItems: NewsItem[] = []; // Utilisez le modèle ici
  images$: Observable<any[]> | undefined;
  imagesRefs: Reference[] | undefined;
  imageUrls: Observable<string[]> | undefined;
  annonces!: Observable<any[]>;
  userImageUrls: string | undefined;
  images: File[] = [];
  userEmail: string = '';
  uniqueIdCounter: number = 0;
  uniqueCardIds: Set<number> = new Set<number>();
  selectedCards: any[] = []; 
  annoncessearch: any[] = []; 

  constructor(private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController, 
    private newsService: NewsService,
    private firestore: AngularFirestore,
    public afDB: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private modalController: ModalController,
    private navCtrl: NavController,
    private sharedService: SharedService,
    private afAuth: AngularFireAuth,
    
    
    ) {
        // Récupérez l'utilisateur actuellement connecté
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // L'utilisateur est connecté, vous pouvez accéder à son adresse e-mail ici
        const userEmailFromAuth = user.email;
        if (userEmailFromAuth) {
          // Vérifiez que l'adresse e-mail n'est pas null
          this.userEmail = userEmailFromAuth;

          // Vérifiez si userEmail contient une adresse e-mail valide
          if (this.isValidEmail(userEmailFromAuth)) {
            console.log('Adresse e-mail récupérée avec succès :', userEmailFromAuth);
          } else {
            console.error('Adresse e-mail invalide :', userEmailFromAuth);
          }
        }
      } else {
        // L'utilisateur n'est pas connecté, userEmail sera une chaîne vide
        this.userEmail = '';
      }
    });
      this.storage.create();
    }





    
  // Vérifiez si une chaîne est une adresse e-mail valide
  isValidEmail(email: string): boolean {
    // Utilisez une expression régulière pour valider l'adresse e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

    ngOnInit() {
      this.annonces$ = this.firestore.collection('ANNONCES').valueChanges();

    }

   ionViewDidEnter() {
    this.newsService.getNews().subscribe((data) => {
      this.newsItems = data; // Assurez-vous que les données sont typées
    });
    }
    inscriptionReussie: boolean = false; // Par défaut, l'inscription n'est pas réussie

//     async ionViewWillEnter() {
//       this.inscriptionReussie = await this.storage.get('inscriptionReussie');
//       this.userName = await this.storage.get('userName');
// // Vérifiez si l'alerte a déjà été affichée
// if (!this.alerteAffichee && this.inscriptionReussie) {
//   this.presentCongratulationsAlert();
//   this.alerteAffichee = true; // Marquez l'alerte comme affichée
// }
// }

 
async ionViewWillConnect(){
  this.connexionReussie= await this.storage.get('connexionReussie');
  if(!this.connexionReussie && !this.alertconnect){
    this.presentCongratulationsConnect();
    this.alertconnect = true;
  }
}
    
  goToLoginPage() {
    this.router.navigate(['/tabs/login-page']);
  }

  goToSignupPage() {
    this.router.navigate(['/tabs/signup-page']);
  }
  goToGestAnnoncePage() {
    this.router.navigate(['/tabs/create-annonce']);  }

  async presentCongratulationsAlert() {
    const alert = await this.alertController.create({
      header: 'Félicitations !',
      message: `Félicitations, ${this.userName} ! Votre inscription est réussie.`,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async presentCongratulationsConnect(){
    const alert = await this.alertController.create({
      header: 'Félicitations !',
      message: `! Connexion réussie.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  previewImage(imageUrl: string) {
    // Créer un élément d'image
    const preview = document.createElement('img');
    preview.src = imageUrl;
    preview.style.maxWidth = '100%';
    preview.style.maxHeight = '100%';
  
    // Créer une boîte de dialogue modale pour afficher l'image
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
  
    // Ajouter l'image à la boîte de dialogue modale
    modal.appendChild(preview);
  
    // Fermer la boîte de dialogue modale lorsqu'on clique dessus
    modal.addEventListener('click', () => {
      modal.remove();
    });
  
    // Ajouter la boîte de dialogue modale à la fin du corps du document
    document.body.appendChild(modal);
  }

// Fonction appelée lorsqu'une ion-card est sélectionnée
  // Fonction appelée lorsqu'une ion-card est sélectionnée
  selectCard(annonce: any) {
    // Ajoutez la carte sélectionnée au service partagé
    this.sharedService.addSelectedCard(annonce);

    // Redirigez vers la page gest-annonce
    this.navCtrl.navigateForward('/tabs/gest-annonce');
  }

// fonction de scroll vers le bon ion-card selectionner dans la ribrique
  scrollToCard(annonceId: string) {
    const annonceCardElement = document.getElementById(annonceId);
    if (annonceCardElement) {
      annonceCardElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
  // fonction de recherche depuis firerbase de la bonne categorie
  searchByCategory(category: string) {
    // Réinitialiser les résultats de la recherche à chaque nouvelle recherche
    this.annoncessearch = [];
  
    // Interroger la collection Firestore avec la catégorie spécifiée
    this.firestore.collection('ANNONCES', ref => ref.where('categorie', '==', category))
      .get()
      .subscribe((querySnapshot) => {
        const annonces: any[] = [];
  
        querySnapshot.forEach((doc) => {
          // Ajouter les résultats à la liste des annonces avec leur ID
          const annonceData = { id: doc.id, ...(doc.data() as object) };
          annonces.push(annonceData);
        });
  
        if (annonces.length > 0) {
          // Mélanger de manière aléatoire le tableau des annonces
          this.shuffleArray(annonces);
  
          // Appeler la fonction scrollToCard avec l'ID du premier ion-card de la catégorie
          this.scrollToCard(annonces[0].id);
        } else {
          // Afficher le modal si la catégorie n'est pas trouvée
          this.presentCategoryNotFoundAlert();
        }
      });
  }
  
  // Fonction pour mélanger de manière aléatoire un tableau pour que le sccroll vers une categorie soit aleatoire
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // alert pour categorie non disponible
  async presentCategoryNotFoundAlert() {
    const alert = await this.alertController.create({
      header: 'Catégorie introuvable',
      message: 'La rubrique que vous recherchez n\'est pas encore disponible.',
      buttons: ['OK']
    });
  
    await alert.present();
  
    // Fermez l'alerte après 2 secondes
    setTimeout(() => {
      alert.dismiss();
    }, 2000);
  }
  
  
  
}
 
