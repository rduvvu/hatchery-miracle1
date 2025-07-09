import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { apis } from 'src/app/services/apis';
import { ModalController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DropLocationModalPage } from './drop-location-modal/drop-location-modal.page';


@Component({
  selector: 'app-driver-checkin',
  templateUrl: './driver-checkin.page.html',
   standalone: false
})
export class DriverCheckinPage {
  searchTerm: string = '';
  isSubmitting:boolean = false;
  driversList:any[] = [];
  dropLoactions: any[] = [ 'Gantyada', 'Poosapatirega', 'Denkada', 'Bhogapuram', 'Srungavarapukota', 'Jami', 'Vepada', 'Lakkavarapukota', 'Kothavalasa', 'Bondapalli'];
  driversStatus: boolean = false;
  filteredDrivers : any[] = [];

  constructor(public modalController: ModalController, private router: Router, public apiService: ApiServiceService,private toastController: ToastController,private alertController: AlertController) {}

  ngOnInit() {}


  ionViewWillEnter() {
    this.getDriversList('');
    const checkinBoolean = sessionStorage.getItem('moveToDriverCheckin');
    if (checkinBoolean === 'true') {
      this.driversStatus = true;
      if (this.driversList.length === 0) {
      sessionStorage.removeItem('moveToDriverCheckin');
    }
    } else {
      this.driversStatus = false;
    }

  }
   getDriversList(searchTerm: string) {
    this.isSubmitting = true;
    const userId = sessionStorage.getItem('userId');
    const url = `${apis.availableDriversListForCheckIn}?ownerId=${userId}&searchText=${searchTerm? searchTerm : ''}`;

    this.apiService.getApi(url).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res === null || res === undefined) {
          if (res.success !== true) {
            throw new Error('Failed to fetch driver details');
          } else if (!res) {
            throw new Error('No data found');
          }
        } else {
          this.driversList = res.availableDrivers || [];
          console.log('Drivers fetched successfully:', this.driversList);

        }
      },
      error: (err: any) => {
        console.error('Error fetching Driver Details:', err);
      },
    });
  }

async changeDriverStatus(driver: any) {
  const modal = await this.modalController.create({
    component: DropLocationModalPage,
    componentProps: {
      dropLocations: this.dropLoactions
    }
  });

  await modal.present();

  const { data } = await modal.onWillDismiss();
  const userId = parseInt(sessionStorage.getItem('userId') || '', 10);

  if (data?.selectedLocation) {
    const reqBody = {
      userId: driver.id,
      vehicleNumber: driver.vehicleNumber,
      hatcheryId: driver.hatcheryId,
      ownerId: driver.ownerId,
      dropLocation: data.selectedLocation
    };

    this.apiService.postApi(`${apis.driverCheckinFromAvailableList}`, reqBody).subscribe({
      next: (response) => {
        if (response.success) {
          this.presentToast('Checked-in successfully!', 'success');
          this.getDriversList('');
        } else {
          this.presentToast(`${driver.driverName}: Unable to check-in.`, 'danger');
        }
      },
      error: () => {
        this.presentToast('Network error. Please try again.', 'danger');
      }
    });
  }
}

    filterDrivers() {
    const term = this.searchTerm.toLowerCase();
    this.getDriversList(term)
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // visible for 3 seconds
      color, // 'success', 'danger', 'warning', etc.
      position: 'bottom',
    });
    await toast.present();
  }
  }
