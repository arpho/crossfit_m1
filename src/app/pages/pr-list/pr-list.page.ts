import { Component, OnInit } from '@angular/core';
import { PrService } from '../../services/pr/pr.service';
import { PrModel, ResultModel, PrKg, PrTime, BestInterface } from '../../models/PrModel';


@Component({
  selector: 'app-pr-list',
  templateUrl: './pr-list.page.html',
  styleUrls: ['./pr-list.page.scss'],
})
export class PrListPage implements OnInit {
  public prList: Array<BestInterface>;

  constructor(public prService: PrService) { }

  ngOnInit() {
    this.ionViewDidLoad();
  }
  showResult(pr: BestInterface) {
    return pr.formatResult(pr.getBestPr());
  }

  ionViewDidLoad() {
    this.prService.getPrList().on('value', eventListSnapshot => {
      this.prList = [];
      eventListSnapshot.forEach(snap => {
        const Pr = snap.val().unity === ' Kg ' ? new PrKg() : new PrTime();
        Pr.descrizione = snap.val().descrizione;
        Pr.prList = snap.val().prList.map(value => {
          const i = new ResultModel().load(value);
          return i;
        });
        Pr.hero = snap.val().hero || false;
        Pr.girl = snap.val().girl || false;
        Pr.typePr = snap.val().typePr;
        Pr.id = snap.key;
        if (Pr.hero) {
          Pr.icon = 'assets/icon/hero.ico';
        }
        if (Pr.girl) {
          Pr.icon = 'assets/icon/girl.png';
        }
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
