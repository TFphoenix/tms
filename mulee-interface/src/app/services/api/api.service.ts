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
    return this._http.get(`${this._breakfast}/predefined`) as Observable<
      Breakfast[]
    >;
  }

  // Available Liquids
  getLiquids() {
    return this._http.get(`${this._breakfast}/liquids`) as Observable<string[]>;
  }

  // Start preparing predefined Breakfast Recipe
  postPredefinedBreakfast(breakfast: Breakfast, liquid: string) {
    return this._http.post(`${this._breakfast}/predefined`, {
      name: breakfast.name,
      liquid: liquid,
    });
  }
}
