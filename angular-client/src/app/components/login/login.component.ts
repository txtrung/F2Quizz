import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AlertService} from 'src/app/services/alert.service';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: UserService,
      private alertService: AlertService
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
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('authenticate', JSON.stringify({
      username:this.f.username.value,
      password:this.f.password.value
    })
    );

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(formData)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.alertService.error(error);
              this.loading = false;
            });
  }

  loginFshare() {

  }

  loginFacebook() {

  }

  loginGoogle() {

  }

}
