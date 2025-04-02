import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit, OnInit {
  @Input() productImgs: any[] = [];
  @ViewChild('video', { static: false }) video!: ElementRef;

  categories: any[] = [];
  news: any[] = [];

  isImageError: boolean[] = [];

  loading = true

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {

    console.log('Initializing HomePage');

    // this.httpService.getNews().subscribe(
    //   (data: any) => {
    //     this.news = data;
    //   },
    //   (error) => {
    //     console.error('Error loading categories', error);
    //     this.loading = false;
    //   }
    // )
  }

  ngAfterViewInit(): void {
    this.video.nativeElement.muted = true;
    this.video.nativeElement.controls = false;
    this.video.nativeElement.play().then(() => {
      console.log('The video is playing');
    }).catch((error: any) => {
      console.error('Failed to play the video', error);
    });
  }



  async openModal() {
    // const modal = await this.modalCtrl.create({
    //   component: ModalBookComponent,
    //   cssClass: 'enquire',
    // });
    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   console.log(data);

    // }
  }
}