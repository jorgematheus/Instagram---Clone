import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit() {
    var config = {
      apiKey: "AIzaSyCiYXHcDDXpkqzwRdABa6KgZEONzb3T5js",
      authDomain: "jta-instagram-clone-a0998.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-a0998.firebaseio.com",
      projectId: "jta-instagram-clone-a0998",
      storageBucket: "jta-instagram-clone-a0998.appspot.com",
      messagingSenderId: "695445082076"
    };

    firebase.initializeApp(config);
  }
}


