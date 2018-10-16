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
  change() {
    this.Pr = this.Pr.cloneOtherModel();
  }
  changeHero() {
    console.log('change', this.prType);
    this.Pr = this.Pr.cloneOtherModel();
    if (this.Pr.hero && this.Pr.girl) {
      this.Pr.girl = false;
    }
  }
  changeGirl() {
    this.Pr = this.Pr.cloneOtherModel();
    if (this.Pr.hero && this.Pr.girl) {
      this.Pr.hero = false;
    }
  }



  createPr(pr: PrModel) {
    pr.descrizione = this.prName;
    this.prService.createPr(pr).then(() => {
      this.router.navigateByUrl('');
    });
  }

  async addResult(): Promise<void> {
    console.log(this.prType);
    const result = new ResultModel();
    const alert = await this.alertCtrl.create({
      subHeader: 'Il tuo nuovo Pr',
      inputs: [{
        type: 'number',
        placeholder: 'risultato',
        label: this.Pr.unity
      },
      {
        type: 'date',
        placeholder: 'data',
        value: this.formatDate(result.date)
      }],
      buttons: [{ text: 'Annulla' }, {
        text: 'Ok',
        handler: data => {
          result.prestazione = data[0];
          result.date = new Date(data[1]);
          result.stringifiedDate = result.date.toISOString().split('T')[0] + ' ';
          this.Pr.pushPr(result);
        }
      }]
    });
    await alert.present();
  }

}
