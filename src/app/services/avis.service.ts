// Dans votre service Angular
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AviService {
  constructor(private firestore: AngularFirestore) {}

  getAvis(itemId: string): Observable<any[]> {
    return this.firestore.collection('Avis', (ref) => ref.where('itemId', '==', itemId)).valueChanges();
  }

// ...
addAvis(itemId: string, userId: string, rating: number, comment: string): Promise<DocumentReference<DocumentData>> {
  return this.firestore.collection('Avis').add({
    itemId,
    userId,
    rating,
    comment,
    timestamp: new Date(),
  }) as Promise<DocumentReference<DocumentData>>;
}
// ...
}
