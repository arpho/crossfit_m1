import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './components/item-component/item-component';
import { ItemListComponent } from './components/item-list-component/item-list-component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ItemComponent,
    ItemListComponent
  ],
  exports: [
    ItemComponent,
    ItemListComponent
  ]
})
export class ItemModule { }
