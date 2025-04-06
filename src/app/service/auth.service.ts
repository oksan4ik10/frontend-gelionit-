import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = "http://localhost:4000/api";

    private token: string | null = null;
    role: string = "";

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    loginUser(credentials: { login: string; password: string }): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            this.http.post(`${this.baseUrl}/auth/login`, credentials).subscribe(
                async (response: any) => {
                    console.log(response);

                    this.setAuthState(response);
                    observer.next(response);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                }
            );
        });
    }
    getRole() {
        return this.role;
    }

    private setAuthState(data: any) {
        this.token = `${data.access_token}`;
        this.role = data.role;
        localStorage.setItem('user_info', JSON.stringify(data));
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('user_info');
        this.router.navigate(['/']);
    }

    async isAuthenticated(): Promise<boolean> {
        const user: any = localStorage.getItem('user_info');
        const userInfo = user ? JSON.parse(user) : undefined;

        if (userInfo) {
            const isExpired = this.isTokenExpired(userInfo.expires);
            if (!isExpired) {
                this.token = `${userInfo.access_token}`;
                this.role = userInfo.role;
                return true;
            } else {
                this.logout();
                return false;
            }
        } else {
            return false;
        }
    }

    private isTokenExpired(expiry: number): boolean {
        if (!expiry) return true
        return Math.floor(new Date().getTime() / 1000) <= expiry;
    }

    getAuthToken(): string | null {
        return this.token;
    }

    async getCurrentUser(): Promise<any> {
        const userInfo = localStorage.getItem('user_info');
        if (userInfo) {
            return userInfo;
        } else {
            return null;
        }
    }
}