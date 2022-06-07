import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { AppModule } from '../app/app.module';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  title = 'cross_hurdle'
  email : string = ''
  password : string = ''
  loginStatus : any = null;
  type = 'login'
  headers = new HttpHeaders({      'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'})
  .set('Content-Type', 'application/json');
  postLogin(){
    var url = "/api/process_post"
    var payload = {email: this.email,
                  pass:this.password,
                  type : 'login'} 
    var response = this.http.post(url,payload,{responseType: 'text',headers:this.headers})
    console.log(response.subscribe(data =>{  console.log(data) }))
    console.log("success")
  }
  togglePage(){
   this.type = this.type == 'login' ? 'register' : 'login'
  }

  postRegister(){
    var url = "/api/process_post"
    var payload = {email: this.email,
                  pass:this.password,
                  type : 'register'} 
    var response = this.http.post(url,payload,{responseType: 'text',headers:this.headers})
    console.log(response.subscribe(data =>{  console.log(data) }))
    console.log("success")
  }
  ngOnInit(): void {
    this.type = 'login'
  }

  
}
