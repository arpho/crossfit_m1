import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { AlertController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { PrModel, PrKg, PrTime, BestInterface, ResultModel } from '../../models/PrModel';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.page.html',
  styleUrls: ['./pr-detail.page.scss'],
})
export class PrDetailPage implements OnInit {
  @ViewChild('lineChart') private chartRef;
  chart: any;

  public currentPr: BestInterface;


  constructor(
    public alertCtrl: AlertController,
    private prService: PrService,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  updateResult() {
    console.log('updating', this.currentPr);
    this.prService.updatePr(this.currentPr).then(v => console.log('updated', v));

  }

  gotoLastPercentages() {
    const result = this.currentPr.getLastPr().prestazione;
    console.log('percentage', result);
    this.router.navigate(['/show-percentages', this.currentPr.id, result]);
  }
  gotoBestPercentages() {
    const result = this.currentPr.getBestPr().prestazione;
    console.log('best', result);
    this.router.navigate(['/show-percentages', this.currentPr.id, result]);
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
      const dataPoints = [];
      const labels = [];
      this.currentPr.prList.forEach(element => {
        dataPoints.push({ x: dataPoints.length, y: element.prestazione });
        labels.push(element.stringifiedDate);

      });
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: labels, // your labels array
          datasets: [
            {
              data: dataPoints, // your data array
              borderColor: '#00AEFF',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
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
