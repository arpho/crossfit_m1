import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { AlertController } from '@ionic/angular';
import { PrModel, PrKg, PrTime, BestInterface, ResultModel } from '../../models/PrModel';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.page.html',
  styleUrls: ['./pr-detail.page.scss'],
})
export class PrDetailPage implements OnInit {
  public currentPr: BestInterface;

  constructor(
    public alertCtrl: AlertController,
    private prService: PrService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  updateResult() {
    console.log('updating', this.currentPr);
    this.prService.updatePr(this.currentPr).then(v => console.log('updated', v));

  }

  gotoPercentages() {
     this.router.navigate([`/show-percentages/${this.currentPr.id}`] );
  }

  showBestResult() {
    if (this.currentPr) {
      return this.currentPr.formatResult(this.currentPr.getBestPr());
    }
  }
  showLastResult() {
    if (this.currentPr) {
      return this.currentPr.formatResult(this.currentPr.getLastPr());
    }
  }

  ngOnInit() {
    const prId: string = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
    });
  }

  async addResult(): Promise<void> {
    const result = new ResultModel();
    const popup = this.currentPr.getInsertPrPopup(result);
    const alert = await this.alertCtrl.create(popup);
    await alert.present();
    console.log('new pr', this.currentPr.getLastPr());
  }

}
