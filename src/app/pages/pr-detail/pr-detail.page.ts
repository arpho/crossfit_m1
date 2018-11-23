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
  public spinner: Boolean = true;
  public prId: string;
  public currentPr: BestInterface;


  constructor(
    public alertCtrl: AlertController,
    private prService: PrService,
    private route: ActivatedRoute,
    public router: Router,
  ) {
  }

  updateResult() {
    this.prService.updatePr(this.currentPr);

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

  show_prs() {
    console.log('showing prs for  ', this.prId);
    this.router.navigate(['/showResults', this.prId]);
  }

  ngOnInit() {
    this.prId = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(this.prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
      const dataPoints = [];
      const labels = [];
      this.currentPr.prList.forEach((item: ResultModel) => {
        const labelResult = new ResultModel();
        labelResult.prestazione = item.prestazione;
        dataPoints.push({ x: dataPoints.length, y: item.prestazione });
        labels.push(item.stringifiedDate + '\n# ' + this.currentPr.format_result_4_label(item.prestazione));

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
      this.spinner = false;
    });

  }

  async addResult(): Promise<void> {
    const result = new ResultModel();
    const popup = this.currentPr.getInsertPrPopup(result, () => { this.updateResult(); });
    const alert = await this.alertCtrl.create(popup);
    const value = await alert.present();
    console.log('await', value);
  }

}
