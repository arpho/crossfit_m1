import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { AlertController } from '@ionic/angular';
import { PrModel, PrKg, PrTime, BestInterface, ResultModel } from '../../models/PrModel';


@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.page.html',
  styleUrls: ['./show-results.page.scss'],
})
export class ShowResultsPage implements OnInit {
  public currentPr: PrModel;
  prId: string;
  constructor(private prService: PrService,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public router: Router) { }
  async delete(item) {
    console.log('deleting', item);
    console.log('pr', this.currentPr);
    console.log('new pr', this.currentPr);
    const alert = await this.alertCtrl.create({
      message: 'vuoi cancellare questo pr?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Cancella',
          handler: () => {
            console.log('delete clicked');
            this.currentPr.prList = this.currentPr.prList.filter((value) => value.id !== item.id);
            this.prService.updatePr(this.currentPr);
          }
        }
      ]
    });
    await alert.present();
  }
  ngOnInit() {
    this.prId = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(this.prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
    });

  }
}
