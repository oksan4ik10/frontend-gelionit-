import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit, OnInit {
  @Input() productImgs: any[] = [];
  @ViewChild('video', { static: false }) video!: ElementRef;

  products: any[] = [];


  loading = true

  constructor(
    private modalCtrl: ModalController,
    private httpService: HttpService
  ) { }

  ngOnInit() {

    console.log('Initializing HomePage');
    this.getProducts()

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
  getProducts() {
    this.httpService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        console.log(data);

      },
      (error) => {
        console.error('Error loading categories', error);
        this.loading = false;
      }
    )

  }




}