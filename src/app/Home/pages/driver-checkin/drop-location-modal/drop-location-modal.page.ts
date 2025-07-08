import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drop-location-modal',

  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './drop-location-modal.page.html'
})
export class DropLocationModalPage {
  @Input() dropLocations: string[] = [];
  selectedLocation = '';

  constructor(private modalController: ModalController) {}

  confirm() {
    this.modalController.dismiss({ selectedLocation: this.selectedLocation });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
