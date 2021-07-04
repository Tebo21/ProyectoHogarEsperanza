import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar-super-admin',
  templateUrl: './navbar-super-admin.component.html',
  styleUrls: ['./navbar-super-admin.component.css']
})
export class NavbarSuperAdminComponent implements OnInit {

  constructor(private http: HttpClient) { }
  cEmail: any
  ngOnInit(): void {    
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xknkzvrv',
        { name: email.name, replyto: email.email, message: email.messages },
        { 'headers': headers }).subscribe(
          response => {
            console.log(response);
          }
        );
    }
  }

}
