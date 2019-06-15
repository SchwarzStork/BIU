import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {UserFormComponent}from './user-form/user-form.component';
@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule 
  ],
  declarations: [ 
    AppComponent, 
    UserFormComponent,
  ],
  bootstrap:    [ 
    AppComponent 
  ]
})
export class AppModule { }
