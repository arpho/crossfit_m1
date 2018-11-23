import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { PrModel, PrKg, PrTime, BestInterface, ResultModel } from '../../models/PrModel';


@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.page.html',
  styleUrls: ['./show-results.page.scss'],
})
export class ShowResultsPage implements OnInit {
  currentPr: PrModel;
  constructor(private prService: PrService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    const prId: string = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
      this.currentPr.prList.forEach((item: ResultModel) => {
        const labelResult = new ResultModel();
        labelResult.prestazione = item.prestazione;

      });
  }

}
