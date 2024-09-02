import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Conducteur } from 'src/app/model/Conducteur';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private apiUrl = 'http://44.198.44.164:30008/api/conducteurs/login';
  private token: string | null = null;  // Stockez le token d'authentification
  private conducteurId: string | null = null;

  private isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(conducteur: Conducteur): Observable<Conducteur> {
    return this.http.post<Conducteur>(this.apiUrl, conducteur).pipe(
      tap(response => {
        this.isAuthenticated = true;
        this.conducteurId = response.id ?? null;
        const email = response.email ?? null;
  
        if (this.conducteurId) {
          localStorage.setItem('conducteurId', this.conducteurId);
        }
        
        if (email) {
          localStorage.setItem('conducteurEmail', email);
        }
  
        console.log('ID du conducteur enregistré:', this.conducteurId);
        console.log('Email du conducteur enregistré:', email);
      })
    );
  }
  

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Redirection vers la page de connexion après déconnexion
  }

  checkAuth(): boolean {
    return this.isAuthenticated;
  }
  setConducteurId(id: string): void {
    this.conducteurId = id;
    console.log('Conducteur ID enregistré:', this.conducteurId);  // Ajoutez ceci pour vérifier l'enregistrement de l'ID
  }

 
  getConducteurId(): string | null {
    return this.conducteurId;
  }

}
