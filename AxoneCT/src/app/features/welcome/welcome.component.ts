import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SharedService } from '../../services/shared.service';
import {MatButtonModule} from '@angular/material/button';
import { SupabaseService } from '../../services/supabase.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { InstructionsComponent } from '../instructions/instructions.component';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, InstructionsComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  constructor(public sharedService: SharedService, private readonly supabaseService: SupabaseService){
    if(localStorage.getItem('user')){
      this.sharedService.page = 2
    }
  }

  async loadItem() {
    if(this.sharedService.userEmail.value){
      this.sharedService.showSpinner();
      const { data, error } = await this.supabaseService.getUserByEmail(this.sharedService.userEmail.value);
      this.sharedService.hideSpinner()
      if (!error){
        if(data[0]){
          this.sharedService.user = data[0]
          if(!this.sharedService.user.testCompleted){

            this.sharedService.showToastSuccess('Puedes continuar a la siguiente seccion.', 'Correo validado correctamente!')
            this.sharedService.userEmail.disable()
            this.sharedService.userValidated = true
            localStorage.setItem('user',JSON.stringify(data[0]))
          }else{
            this.sharedService.showToastWarning('Ya has presentado esta prueba', 'Si crees que se trata de un error intenta comunicarte con las personas encargadas.')

          }
        }else{
          this.sharedService.showToastWarning('No fuiste seleccionado para nuestra prueba, si crees que se trata de un error intenta comunicarte con las personas encargadas.', 'Correo no encontrado en nuestra base de datos :(')
        }
        
      }else{
        this.sharedService.showToastError('Intenta de nuevo.', 'Ha ocurrido un error')
      }
    }
  }

  next(){
    this.sharedService.page = 2
  }

  back(){
    this.sharedService.logout()
  }

  agree(){
    this.sharedService.page = 3
  }

  openDocument(){
    window.open('https://sthsguhtgaahhbinjege.supabase.co/storage/v1/object/public/AxoneAssets/ConsentimientoInformado.pdf','_blank')
  }
}
