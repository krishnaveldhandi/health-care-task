import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddDoctorService {
  private apiUrl = 'http://localhost:8080/doctor';
  constructor(private http: HttpClient) {}

  addDoctor(doctorData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, doctorData);
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }

  edit(doctorData: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, doctorData);
  }
}
