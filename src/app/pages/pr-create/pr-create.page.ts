import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PrModel, ResultModel, PrKg } from '../../models/PrModel';

@Component({
  selector: 'app-pr-create',
  templateUrl: './pr-create.page.html',
  styleUrls: ['./pr-create.page.scss'],
})
export class PrCreatePage implements OnInit {
  public Pr: PrModel;
  public prType: boolean;
  public PrIconType: string;
  public girl: boolean;
  constructor(public alertCtrl: AlertController) {
    this.prType = true;
    this.Pr = new PrKg();
    this.girl = false;

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
    console.log('change', this.prType);
    console.log(this.Pr);
    this.Pr = this.Pr.cloneOtherModel();
    console.log(this.Pr);
  }

  async addResult(): Promise<void> {
    console.log(this.prType);
    const result = new ResultModel();
    const alert = await this.alertCtrl.create({
      subHeader: 'Il tuo nuovo Pr',
      inputs: [{
        type: 'number',
        placeholder: 'risultato',
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
