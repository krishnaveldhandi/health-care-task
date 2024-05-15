import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctors } from './list-of-doctors/list-of-doctors.component';
@Injectable({
  providedIn: 'root'
})
export class ListOfDoctorsService {

  private baseUrl = 'http://localhost:8080/doctors/all';
  constructor(private http:HttpClient) { }

  getAllDoctors():Observable<Doctors[]>{
    return this.http.get<Doctors[]>(this.baseUrl); 
  }
}
