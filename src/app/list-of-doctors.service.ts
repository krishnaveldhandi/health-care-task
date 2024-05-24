import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctors } from './components/list-of-doctors/list-of-doctors.component';
@Injectable({
  providedIn: 'root',
})
export class ListOfDoctorsService {
  private apiUrl = 'http://localhost:8080/doctor';
  constructor(private http: HttpClient) {}

  getAllDoctors(): Observable<Doctors[]> {
    return this.http.get<Doctors[]>(this.apiUrl);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}
