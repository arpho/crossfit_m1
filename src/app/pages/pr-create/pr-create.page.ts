import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PrModel, ResultModel, PrKg } from '../../models/PrModel';
import { PrService } from '../../services/pr/pr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.page.html',
  styleUrls: ['./pr-create.page.scss'],
})
export class PrCreatePage implements OnInit {
  public Pr: PrModel;
  public prType: boolean;
  public PrIconType: string;
  public woman: boolean;
  public hero: boolean;
  constructor(public alertCtrl: AlertController,
    public router: Router,
    public prService: PrService) {
    this.prType = true;
    this.Pr = new PrKg();
    this.woman = false;
    this.hero = false;

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
    if (this.hero && this.woman) {
      this.woman = false;
      this.Pr.girl = this.woman;
      this.Pr.hero = this.hero;
    }
  }
  changeGirl() {
    this.Pr = this.Pr.cloneOtherModel();
    if (this.hero && this.woman) {
      this.hero = false;
    }
  }



  createPr(pr: PrModel) {
    console.log(this.Pr, pr);
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
          console.log(result);
          this.Pr.pushPr(result);
          console.log(this.Pr);
        }
      }]
    });
    await alert.present();
  }

}
