import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: any;
  public birthDate: string;
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileService.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = new Date(userProfileSnapshot.val().birthDate).toISOString();
    });
  }

  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('login');
    });
  }

  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Il tuo nome e cognome',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'IL tuo Nome',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'IL tuo Cognome',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Annulla' },
        {
          text: 'Salva',
          handler: data => {
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  updateDOB(birthDate: any): void {
    console.log(birthDate);
    if (birthDate === undefined) {
      return;
    } else if (
      birthDate.year === undefined ||
      birthDate.month === undefined ||
      birthDate.day === undefined
    ) {
      return;
    }
    const dateOfBirth: Date = new Date(
      birthDate.year.value,
      birthDate.month.value - 1,
      birthDate.day.value
    );
    console.log(dateOfBirth);
    this.profileService.updateDOB(String(dateOfBirth));

  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'la tua nuova mail' },
        { name: 'password', placeholder: 'la tua password', type: 'password' },
      ],
      buttons: [
        { text: 'Annulla' },
        {
          text: 'Salva',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email aggiornata');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'Nuova password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Vecchia password', type: 'password' },
      ],
      buttons: [
        { text: 'Annulla' },
        {
          text: 'Salva',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }
}