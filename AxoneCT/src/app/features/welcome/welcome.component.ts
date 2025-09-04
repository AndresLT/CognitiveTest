import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedService } from '../../services/shared.service';
import {MatButtonModule} from '@angular/material/button';
import { SupabaseService } from '../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  page = 1

  constructor(public sharedService: SharedService, private readonly supabaseService: SupabaseService){

  }

  async loadItem() {
    if(this.sharedService.userEmail.value){
      this.sharedService.showSpinner();
      const { data, error } = await this.supabaseService.getUserByEmail(this.sharedService.userEmail.value);
      this.sharedService.hideSpinner()
      if (!error){
        console.log(data[0]);
        if(data[0]){
          this.sharedService.showToastSuccess('Puedes continuar a la siguiente seccion.', 'Correo validado correctamente!')
          this.sharedService.userEmail.disable()
          this.sharedService.userValidated = true
          localStorage.setItem('user',JSON.stringify(data[0]))
        }else{
          this.sharedService.showToastWarning('No fuiste seleccionado para nuestra prueba, si crees que se trata de un error intenta comunicarte con las personas encargadas.', 'Correo no encontrado en nuestra base de datos :(')
        }
        
      }else{
        this.sharedService.showToastError('Intenta de nuevo.', 'Ha ocurrido un error')
      }
    }
  }

  next(){
    this.page = 2
  }

  back(){
    this.page = 1
    localStorage.removeItem('user')
    this.sharedService.userEmail.enable()
    this.sharedService.userValidated = false
    this.sharedService.userEmail.setValue('')
  }

}
