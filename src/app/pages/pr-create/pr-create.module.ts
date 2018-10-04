import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrCreatePage } from './pr-create.page';
import { ItemListComponent } from '../../components/item-list-component/item-list-component.component';

const routes: Routes = [
  {
    path: '',
    component: PrCreatePage
  }
];

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrCreatePage]
})
export class PrCreatePageModule { }
