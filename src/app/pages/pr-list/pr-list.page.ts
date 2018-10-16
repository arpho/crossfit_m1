import { Component, OnInit } from '@angular/core';
import { PrService } from '../../services/pr/pr.service';
import { PrModel, ResultModel } from '../../models/PrModel';


@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.page.html',
  styleUrls: ['./pr-list.page.scss'],
})
export class PrListPage implements OnInit {
  public prList: Array<PrModel>;

  constructor(public prService: PrService) { }

  ngOnInit() {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.prService.getPrList().on("value", eventListSnapshot => {
      this.prList = [];
      eventListSnapshot.forEach(snap => {
        const Pr = new PrModel();
        Pr.unity = snap.val().unity;
        Pr.descrizione = snap.val().descrizione;
        Pr.prList = snap.val().prList;
        Pr.hero = snap.val().hero || false;
        Pr.girl = snap.val().girl || false;
        Pr.typePr = snap.val().typePr;
        /*this.prList.push({
        id: snap.key,
        descrizione: snap.val().descrizione
        });*/
        this.prList.push(Pr);
        return false;
      });
    });
  }

}
