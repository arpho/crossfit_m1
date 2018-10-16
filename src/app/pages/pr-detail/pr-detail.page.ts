import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrService } from '../../services/pr/pr.service';
import { PrModel } from '../../models/PrModel';

@Component({
  selector: 'app-pr-detail',
  templateUrl: './pr-detail.page.html',
  styleUrls: ['./pr-detail.page.scss'],
})
export class PrDetailPage implements OnInit {
  public currentPr: PrModel = new PrModel();

  constructor(
    private prService: PrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('detail');
    const prId: string = this.route.snapshot.paramMap.get('id');
    console.log(prId);
    this.prService.getPr(prId).on('value', prsnapshot => {
    this.currentPr.loadPr( prsnapshot.val());
    this.currentPr.id = prsnapshot.key;
    console.log(this.currentPr.getLastPr());
    });
  }

}
