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

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    loginUser(credentials: { login: string; password: string }): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            this.http.post(`${this.baseUrl}/auth/login`, credentials).subscribe(
                async (response: any) => {
                    await this.setAuthState(response);
                    observer.next(response);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                }
            );
        });
    }

    private async setAuthState(data: any) {
        this.token = `${data.access_token}`;
        localStorage.setItem('user_info', data);
    }

    async logout(): Promise<void> {
        this.token = null;
        localStorage.removeItem('user_info');
        this.router.navigate(['/']);
    }

    async isAuthenticated(): Promise<boolean> {
        const userInfo: any = localStorage.getItem('user_info');
        if (userInfo) {
            const isExpired = this.isTokenExpired(userInfo.expires);
            if (!isExpired) {
                this.token = `${userInfo.access_token}`;
                return true;
            } else {
                await this.logout();
                return false;
            }
        } else {
            return false;
        }
    }

    private isTokenExpired(expiry: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiry;
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