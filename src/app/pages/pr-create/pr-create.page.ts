import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PrModel, ResultModel, PrKg } from '../../models/PrModel';
import { PrService } from '../../services/pr/pr.service';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities/utilities.service';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.page.html',
  styleUrls: ['./pr-create.page.scss'],
})
export class PrCreatePage implements OnInit {
  public Pr: PrModel;
  public prType: boolean;
  public PrIconType: string;
  public prName: string;
  public utilities: UtilitiesService;

  constructor(public alertCtrl: AlertController,
    public Utilities: UtilitiesService,
    public router: Router,
    public prService: PrService) {
    this.prType = true;
    this.Pr = new PrKg();

  }

  ngOnInit() {
  }
  formatDate(data: Date) {
    return data.toISOString().substring(0, 10);
  }
  getUnity() {
    // return this.prType?"Kg"|"sec"
    console.log(this.prType);
  }

  showIcon(type) {
    console.log(type);
    return 'Kg';
  }
  change(e) {
    this.Pr = this.Pr.cloneOtherModel();
  }
  changeHero(e) {
    console.log('change', this.prType);
    this.Pr = this.Pr.cloneOtherModel();
    if (this.Pr.hero && this.Pr.girl) {
      this.Pr.girl = false;
    }
  }

  showResult(pr: ResultModel) {
    return this.Pr.formatResult(pr);
  }

  changeGirl(e) {
    this.Pr = this.Pr.cloneOtherModel();
    if (this.Pr.hero && this.Pr.girl) {
      this.Pr.hero = false;
    }
  }



  createPr(pr: PrModel) {
    pr.descrizione = this.Pr.descrizione;
    this.prService.createPr(pr).then(() => {
      this.router.navigateByUrl('');
    });
  }

  async addResult(): Promise<void> {
    const result = new ResultModel();
    const popup = this.Pr.getInsertPrPopup(result, () => { });
    const alert = await this.alertCtrl.create(popup);
    await alert.present();
  }

}
