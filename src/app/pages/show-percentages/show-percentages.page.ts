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
  percentages: { key: string, value: number }[];
  constructor(
    public alertCtrl: AlertController,
    private prService: PrService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.percentages = [];
  }

  getUnity() {
    return this.currentPr.unity;
  }

  ngOnInit() {
    this.prId = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(this.prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
      console.log(this.currentPr);
      const result = parseInt(this.route.snapshot.paramMap.get('result'), 10);
      this.percentages.push({ key: '10%', value: result * 0.1 });
      this.percentages.push({ key: '15%', value: result * 0.15 });
      this.percentages.push({ key: '20%', value: result * 0.2 });
      this.percentages.push({ key: '25%', value: result * 0.25 });
      this.percentages.push({ key: '30%', value: result * 0.3 });
      this.percentages.push({ key: '35%', value: result * 0.35 });
      this.percentages.push({ key: '40%', value: result * 0.4 });
      this.percentages.push({ key: '45%', value: result * 0.45 });
      this.percentages.push({ key: '50%', value: result * 0.5 });
      this.percentages.push({ key: '55%', value: result * 0.55 });
      this.percentages.push({ key: '60%', value: result * 0.6 });
      this.percentages.push({ key: '65%', value: result * 0.65 });
      this.percentages.push({ key: '70%', value: result * 0.7 });
      this.percentages.push({ key: '75%', value: result * 0.75 });
      this.percentages.push({ key: '80%', value: result * 0.8 });
      this.percentages.push({ key: '85%', value: result * 0.85 });
      this.percentages.push({ key: '90%', value: result * 0.9 });
      this.percentages.push({ key: '95%', value: result * 0.95 });
      this.percentages.push({ key: '100%', value: result * 1 });
    });

  }
}
