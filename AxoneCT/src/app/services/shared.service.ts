import { Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userEmail = new FormControl('', [Validators.required, Validators.email])
  userValidated = false
  page = 1

  testWordGroup = [['Maestra', 'Estudiantes', 'Clase'], ['Pizarra', 'Tiza', 'Ecuacion']]

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  showSpinner(){
    this.spinner.show()
  }

  hideSpinner(){
    this.spinner.hide()
  }

  showToastSuccess(title: string, text: string){
    this.toastr.success(text, title)
  }
  showToastInfo(title: string, text: string){
    this.toastr.info(text, title)
  }
  showToastWarning(title: string, text: string){
    this.toastr.warning(text, title)
  }
  showToastError(title: string, text: string){
    this.toastr.error(text, title)
  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') || '')
  }

  logout(){
    this.page = 1
    localStorage.removeItem('user')
    this.userEmail.enable()
    this.userValidated = false
    this.userEmail.setValue('')
  }
}
