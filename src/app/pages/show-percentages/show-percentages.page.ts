import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { AlertController } from '@ionic/angular';
import { PrModel, PrKg, PrTime, BestInterface, ResultModel } from '../../models/PrModel';


@Component({
  selector: 'app-show-percentages',
  templateUrl: './show-percentages.page.html',
  styleUrls: ['./show-percentages.page.scss'],
})
export class ShowPercentagesPage implements OnInit {
 currentPr: PrModel;
 prId: string;
  constructor(
    public alertCtrl: AlertController,
    private prService: PrService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.prId = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(this.prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
    console.log(this.currentPr);
  });

}
}
