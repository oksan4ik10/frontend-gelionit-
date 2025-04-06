import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from '../service/auth.service';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        const clone = request;


        return next.handle(clone).pipe(
            catchError((err: HttpErrorResponse): any => {
                if ((err.status === 401) && (!request.url.endsWith('login'))) {
                    console.log("error: ", err);

                    return this.authService.logout();
                };
                return throwError(err);
            })
        );
    }

}

