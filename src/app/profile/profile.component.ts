import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile;
  data = {
    photo_200: null,
    first_name: null,
    last_name: null
  };

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService) { }

  getUserData() {
  }

  ngOnInit() {
    this.route.params
              .subscribe(profile => this.profile = profile);
    this.profileService
      .getData(this.profile.id)
      .then((response: any) => {
        this.data = response.data;
      })
  }

}
