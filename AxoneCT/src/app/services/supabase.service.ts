import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getItems(table: string) {
    return await this.supabase.from(table).select('*');
  }

  async getItemById(table: string, id: number) {
    return await this.supabase.from(table).select('*').eq('id',id);
  }

  createItem(table: string, item: any) {
    return this.supabase.from(table).insert(item);
  }

  updateItem(table: string, id: number, updates: any) {
    return this.supabase.from(table).update(updates).eq('id', id);
  }

  deleteItem(table: string, id: number) {
    return this.supabase.from(table).delete().eq('id', id);
  }

  async getUserByEmail(email: string) {
    return await this.supabase.from('Users').select('*').eq('email',email);
  }
}
