import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { apis } from 'src/app/services/apis';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.page.html',
  styleUrls: ['./owner-dashboard.page.scss'],
  standalone: false,
})
export class OwnerDashboardPage implements OnInit {
  isSubmitting = false;
  checkinAccordionOpen = true;
  driverStatusDetails: any;
  availableDriversList: any[] = [];
  checkedInDriversList: any[] = [];
  completedDriversList: any[] = [];
  roundsCompletedList: any[] = [];
  activeTab: 'available' | 'checkedIn' | 'completed' = 'available';
  disableNewRoundButton = false;
  constructor(
    private router: Router,
    public apiService: ApiServiceService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    // this.searchText = '';
    // this.currentSearchText = '';
    // this.offset = 0;
    // this.hasMoreData = true;
    this.getDriversStatusDetails();
  }
  getDriversStatusDetails() {
    this.isSubmitting = true;
    const userId = sessionStorage.getItem('userId');
    const url = `${apis.driversStatusDetails}?ownerId=${userId}`;

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
          this.driverStatusDetails = res;
          this.availableDriversList =
            this.driverStatusDetails.availableDrivers.filter(
              (d: any) => d.status === 'Available'
            );
          this.checkedInDriversList =
            this.driverStatusDetails.checkedInDrivers.filter(
              (d: any) => d.status === 'Check-In'
            );
          this.roundsCompletedList = this.driverStatusDetails.roundSummary;
        }
      },
      error: (err: any) => {
        console.error('Error fetching Driver Details:', err);
      },
    });
  }
  changeDriverStatus(value: any) {
    console.log('Change driver status clicked', value);
    const reqBody = {
      userId: value.id,
      vehicleNumber: value.vehicleNumber,
      hatcheryId: value.hatcheryId,
      ownerId: value.ownerId,
    };
    this.apiService
      .postApi(`${apis.driverCheckinFromAvailableList}`, reqBody)
      .subscribe((response) => {
        if (response.success === true) {
          this.presentToast('Checked-in successfully!', 'success');
          this.activeTab= 'checkedIn';
          this.getDriversStatusDetails();
          //this.router.navigate(['/tabs']);
          //console.log(response.success, '100');
        } else {
          this.presentToast(` ${value.driverName} We are unable to Checked-in !`, 'danger');
          alert('Unable to change driver status');
        }
      });
  }
  openRoundDetails(value:any) {
    console.log('Open round details dialog clicked', value);
    let roundNumber = value.match(/\d+/);
    this.router.navigate(['/round-details'], {
      queryParams: { round : roundNumber ? parseInt(roundNumber[0], 10) : null },
    });
  }
  get availableDrivers() {
    return this.availableDriversList.filter((d) => d.status === 'Available');
  }
  startNewRound(){
    console.log(this.availableDriversList, 'Available Drivers List');
    if(this.availableDriversList.length === 0) {
    const userId = sessionStorage.getItem('userId');
    const url = `${apis.newRound}?ownerId=${userId}`;

    this.apiService.postApi(url, {}).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res === null || res === undefined) {
          if (res.success !== true) {
            throw new Error('Failed to fetch driver details');
          } else if (!res) {
            throw new Error('No data found');
          }
        } else {
            if (res.success === false && res.message) {
            this.presentToast(res.message, 'danger');
            } else {
            this.presentToast('New round started successfully!', 'success');
            this.getDriversStatusDetails();
            }

        }
      },
      error: (err: any) => {
        console.error('Error fetching Driver Details:', err);
      },
    });
    }

  }

  completeCurrentRound(){
     console.log(this.availableDriversList, 'Available Drivers List');
    if(this.availableDriversList.length === 0) {
    const userId = sessionStorage.getItem('userId');
    let newRoundId = this.driverStatusDetails.latestRound+1

    const url = `${apis.completeCurrentRound}?ownerId=${userId}&round=${newRoundId}&flag=true`;

    this.apiService.putApi(url, {}).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res === null || res === undefined) {
          if (res.success !== true) {
            throw new Error('Failed to Update Completed Round details');
          } else if (!res) {
            throw new Error('No data found');
          }
        } else {
            if (res.success === false && res.message) {
            this.presentToast(res.message, 'danger');
            } else {
            this.presentToast('Successfully updated completed round!', 'success');
            this.getDriversStatusDetails();
            }

        }
      },
      error: (err: any) => {
        console.error('Error fetching Driver Details:', err);
      },
    });
    }

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
