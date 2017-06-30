import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdGridListModule, MdGridTile } from '@angular/material';

import { AppService } from '../app.service';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit, OnDestroy {
  data: any;
  amount: number;
  index: number;

  constructor(private emmiterService: AppService) { }

  updateCounter() {
    this.index = this.data.photos.indexOf(this.data.photo);
    this.amount = this.data.photos.length;
  }

  ngOnInit() {
    this.data = this.emmiterService.currentPhotoData;
    this.updateCounter();
    window.addEventListener('keydown', this.onKeyboardKeyPress, true);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.onKeyboardKeyPress);
  }

  nextPhoto() {
    if (this.data.photos.length - 1 > this.index) {
      this.data = {photo: this.data.photos[this.index + 1], photos: this.data.photos}
    } else {
      this.data = {photo: this.data.photos[0], photos: this.data.photos}
    }
    this.updateCounter();
  }

  prevPhoto() {
    if (this.index === 0) {
      this.data = {
        photo: this.data.photos[this.data.photos.length - 1],
        photos: this.data.photos
      }
    } else {
      this.data = {photo: this.data.photos[this.index - 1], photos: this.data.photos}
    }
    this.updateCounter();
  }

  onKeyboardKeyPress = event => {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        this.prevPhoto();
        break;
      case 'ArrowRight':
        this.nextPhoto();
        break;
      default:
        return;
    }

    event.preventDefault();
  }
}
