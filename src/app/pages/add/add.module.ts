import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    SwiperModule
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
