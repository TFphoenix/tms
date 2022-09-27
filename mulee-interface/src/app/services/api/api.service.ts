import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakfast } from 'src/app/models/breakfast.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly _breakfast: string = `${environment.apiUrl}/breakfast`;

  constructor(private readonly _http: HttpClient) {}

  // Predefined Breakfast Recipes
  getPredefinedBreakfast() {
    return this._http.get(this._breakfast) as Observable<Breakfast[]>;
  }
}
