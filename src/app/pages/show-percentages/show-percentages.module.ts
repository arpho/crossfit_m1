import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowPercentagesPage } from './show-percentages.page';

const routes: Routes = [
  {
    path: '',
    component: ShowPercentagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowPercentagesPage]
})
export class ShowPercentagesPageModule {}
