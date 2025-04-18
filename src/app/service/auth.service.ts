import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = "https://gelionit.onrender.com/api";

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
        this.role = data.role.code;
        localStorage.setItem('user_info', JSON.stringify(data));
    }

    logout(): void {
        this.token = null;
        this.role = "";
        localStorage.removeItem('user_info');
        this.router.navigate(['/login'], { replaceUrl: true });
    }

    async isAuthenticated(): Promise<boolean> {
        const user: any = localStorage.getItem('user_info');
        const userInfo = user ? JSON.parse(user) : undefined;
        console.log(userInfo);

        if (userInfo) {
            const isExpired = this.isTokenExpired(userInfo.expires);
            console.log("isExpired", isExpired);

            if (!isExpired) {
                this.token = `${userInfo.access_token}`;
                this.role = userInfo.role.code;
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

    getCurrentUser(): any {
        const userInfo = localStorage.getItem('user_info');
        if (userInfo) {
            return JSON.parse(userInfo);
        } else {
            return null;
        }
    }
}