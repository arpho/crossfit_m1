import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { PrModel, PrKg, PrTime } from '../../models/PrModel';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.page.html',
  styleUrls: ['./pr-detail.page.scss'],
})
export class PrDetailPage implements OnInit {
  public currentPr: PrKg | PrTime;

  constructor(
    private prService: PrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const prId: string = this.route.snapshot.paramMap.get('id');
    this.prService.getPr(prId).on('value', prsnapshot => {
      this.currentPr = prsnapshot.val().unity === ' Kg ' ? new PrKg : new PrTime();
      this.currentPr.loadPr(prsnapshot.val());
      this.currentPr.id = prsnapshot.key;
      console.log('currentPr', this.currentPr);
      console.log('last pr', this.currentPr.getLastPr());
    });
  }

}
