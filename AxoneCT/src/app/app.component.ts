import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AxoneCT';

  constructor(private readonly supabaseService: SupabaseService){

  }
  
  async ngOnInit(): Promise<void> {
    await this.loadItems()
    await this.loadItem()
     
  }

  
  async loadItems() {
    const { data, error } = await this.supabaseService.getItems('Users');
    if (!error) console.log(data);
  }

  async loadItem() {
    const { data, error } = await this.supabaseService.getItemById('Users',1);
    if (!error) console.log(data);
  }
}
