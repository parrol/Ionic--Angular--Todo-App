import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    ListsComponent
  ],
  exports: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PipesModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
