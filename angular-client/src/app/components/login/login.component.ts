import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
        'icon_facebook',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/imgs/facebook.svg')
    );
    this.matIconRegistry.addSvgIcon(
        'icon_google',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/imgs/google.svg')
    );
    this.matIconRegistry.addSvgIcon(
        'icon_fshare',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/imgs/fshare.svg')
    );
  }

  ngOnInit() {
  }

  loginFshare() {

  }

  loginFacebook() {

  }

  loginGoogle() {

  }

}
