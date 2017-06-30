import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AppService } from '../app.service';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {
  photoData: any;

  constructor(private emmiterService: AppService) { }

  ngOnInit() {
    this.photoData = this.emmiterService.currentPhotoData;
  }

  nextPhoto() {
    const index = this.photoData.photos.indexOf(this.photoData.photo);
    if (this.photoData.photos.length - 1 > index) {
      this.photoData = {photo: this.photoData.photos[index + 1], photos: this.photoData.photos}
    } else {
      this.photoData = {photo: this.photoData.photos[0], photos: this.photoData.photos}
    }
  }

}
