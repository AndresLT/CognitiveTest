import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AxoneCT';

  constructor(private readonly supabaseService: SupabaseService, private spinner: NgxSpinnerService, private toastr: ToastrService ){

  }
  
  async ngOnInit(): Promise<void> {
    this.spinner.show();
    await this.loadItems()
    await this.loadItem()
    this.spinner.hide()
    this.showSuccess()
  }

  
  async loadItems() {
    const { data, error } = await this.supabaseService.getItems('Users');
    if (!error) console.log(data);
  }

  async loadItem() {
    const { data, error } = await this.supabaseService.getItemById('Users',1);
    if (!error) console.log(data);
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
