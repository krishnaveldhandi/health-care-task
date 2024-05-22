import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private _http: HttpClient) {}
  addAppointment(data: any): Observable<any> {
    return this._http.post('http://localhost:8000/appointment', data);
  }

  updateAppointment(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8000/appointment/${id}`, data);
  }
  getAppointmentList(): Observable<any> {
    return this._http.get('http://localhost:8000/appointment');
  }
  deleteAppointment(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8000/appointment/${id}`);
  }
}
