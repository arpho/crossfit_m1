import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ResultModel, PrModel, BestInterface } from '../../models/PrModel';

@Injectable({
  providedIn: 'root'
})
export class PrService {
  public prListRef: firebase.database.Reference;
  public eventListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.prListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/prList`);
      }
    });
  }

  createEvent(
    eventName: string,
    eventDate: Date,
    eventPrice: number,
    eventCost: number
  ): firebase.database.ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate.toDateString(),
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1,
    });
  }
  createPr(pr: PrModel): firebase.database.ThenableReference {
    console.log('creating pr', pr);
    return this.prListRef.push(pr);
  }

  getPrList(): firebase.database.Reference {
    return this.prListRef;
  }

  getEventDetail(eventId: string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }

  getPr(prId: string): firebase.database.Reference {
    return this.prListRef.child(prId);
  }

  updatePr(pr: BestInterface | PrModel) {
    return this.prListRef.child(pr.id).update(pr);
  }

}
