import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { DeliveryStatus } from '../models/status';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private baseUrl = "http://localhost:4000/api";

    constructor(private http: HttpClient, private authService: AuthService) { }
    getProducts(searchTerm: string = "") {
        return this.http.get(`${this.baseUrl}/products?search=${searchTerm}`, {
            observe: 'response',
        })
            .pipe(
                map((res: HttpResponse<any>) => res.body)
            );
    }
    getWorkers(paramsData?: any) {
        let params;
        if (paramsData) {
            params = new HttpParams({ fromObject: paramsData });
        }
        return this.http.get(`${this.baseUrl}/worker`, {
            observe: 'response',
            params
        })
            .pipe(
                map((res: HttpResponse<any>) => res.body)
            );
    }
    getBusyWorkers() {
        return this.http.get(`${this.baseUrl}/worker/busy/free`, {
            observe: 'response'
        })
            .pipe(
                map((res: HttpResponse<any>) => res.body)
            );
    }
    createResponse(data: any) {
        return this.getHeader().pipe(
            switchMap(headers =>
                this.http.post(`${this.baseUrl}/requests`, data, { headers })
            )
        );
    }
    getUnprocessedRequests() {
        return this.http.get(`${this.baseUrl}/requests/manager/unprocessed`, {
            observe: 'response',
        })
            .pipe(
                map((res: HttpResponse<any>) => res.body)
            );
    }
    createOrder(data: any): Observable<{ status: DeliveryStatus }> {
        return this.getHeader().pipe(
            switchMap(headers =>
                this.http.post<{ status: DeliveryStatus }>(`${this.baseUrl}/order`, data, { headers })
            )
        );
    }
    updateProduct(id: string, data: any) {
        return this.getHeader().pipe(
            switchMap(headers =>
                this.http.patch(`${this.baseUrl}/products/${id}`, data, { headers })
            )
        );
    }
    getOrders(orderDate = 1, status = "") {
        return this.http.get(`${this.baseUrl}/orders/?order=${orderDate}&status=${status}`, {
            observe: 'response',
        })
            .pipe(
                map((res: HttpResponse<any>) => res.body)
            );
    }
    private getHeader(): Observable<HttpHeaders> {
        return from(this.authService.isAuthenticated()).pipe(
            map(isAuthenticated => {
                let headers = new HttpHeaders({
                    'Content-Type': 'application/json'
                });

                if (isAuthenticated) {
                    const token = this.authService.getAuthToken();
                    if (token) {
                        headers = headers.append('Authorization', token);
                    }
                }

                return headers;
            })
        );
    }
    // sendVerificationCode(data: any): Observable<string> {
    //     return this.http
    //         .post(`${this.baseUrl}/verification/send`, data, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): string => res.body),
    //         );
    // }
    // checkVerificationCode(data: any): Observable<string> {
    //     return this.http
    //         .post(`${this.baseUrl}/verification/check`, data, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): string => res.body),
    //         );
    // }

    // getVisits(patientId: string): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/patients/${patientId}/visits`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }
    // checkInitialVisits(patientId: string): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/patients/${patientId}/check-initial-visits`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }

    // getLabResults(patientId: string): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/patients/${patientId}/lab-results`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }
    // updatePatient(patientId: string, data: any) {
    //     return this.http
    //         .put(`${this.baseUrl}/patients/update/${patientId}`, data, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): any => res.body)
    //         );
    // }
    // getStates() {
    //     return this.http.get(`${this.baseUrl}/appointments/states`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }

    // getMonthsAppointment(state: string, category: string, timeZone: string, patientId: string) {
    //     return this.http.get(`${this.baseUrl}/appointments/months?state=${state}&category=${category}&timeZone=${timeZone}&patient=${patientId}`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }

    // getSlots(state: string, month: number, category: string = "MD", timeZone: string, year: number, patientId: string) {
    //     return this.http.get(`${this.baseUrl}/appointments/provider-calendar?state=${state}&month=${month}&category=${category}&timeZone=${timeZone}&year=${year}&patient=${patientId}`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }
    // bookSlot(idSlot: string, dataSlot: any) {

    //     return this.http
    //         .put(`${this.baseUrl}/appointments/${idSlot}`, dataSlot, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): any => res.body)
    //         );
    // }
    // cancelSlot(idSlot: string) {
    //     return this.http
    //         .put(`${this.baseUrl}/appointments/cancel/${idSlot}`, {}, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): any => res.body)
    //         );
    // }
    // getLookups() {
    //     return this.http.get(`${this.baseUrl}/questions/lookups`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }
    // updateQuestion(id: string, data: any) {
    //     return this.http
    //         .put(`${this.baseUrl}/questions/${id}`, data, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): any => res.body)
    //         );

    // }
    // createThread(): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/api/puppeteer/threads`, {});
    // }

    // getToken(threadId: string): Observable<any> {
    //     return this.http.post(`${this.baseUrl}/api/puppeteer/threads/${threadId}/token`, {});
    // }

    // sendMessage(threadId: string, message: string, jwt: string): Observable<any> {
    //     return this.http.post(
    //         `${this.baseUrl}/api/puppeteer/threads/${threadId}/messages`,
    //         { message, jwt },
    //         {
    //             headers: new HttpHeaders().set('Authorization', `${jwt}`)
    //         }
    //     );
    // }

    // getMessages(threadId: string, jwt: string): Observable<any> {
    //     return this.http.get(`${this.baseUrl}/api/puppeteer/threads/${threadId}/messages`, {
    //         headers: new HttpHeaders().set('Authorization', `Bearer ${jwt}`),
    //     });
    // }
    // getQuestion(id: string) {
    //     return this.http.get(`${this.baseUrl}/questions?id=${id}`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }
    // searchMedicalList(text: string) {
    //     return this.http
    //         .post(`${this.baseUrl}/api/canvas/medications`, { text }, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): string[] => res.body),
    //         );
    // }
    // getTimeZoneMap(lat: number, lng: number) {
    //     const ts = Math.floor(Date.now() / 1000);
    //     return this.http.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${ts}&key=${this.apiKeyMap}`).pipe(map((res: any) => {
    //         return res.timeZoneName
    //     }))
    // }

    // getProviderDoxyLink(providerFK: string) {
    //     return this.http.get(`${this.baseUrl}/doxy/get-link?providerFK=${providerFK}`, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }

    // sendSupportRequest(data: any): Observable<string> {
    //     return this.http
    //         .post(`${this.baseUrl}/api/support`, data, {
    //             observe: 'response',
    //         })
    //         .pipe(
    //             map((res: HttpResponse<any>): string => res.body),
    //         );
    // }

    // uploadProfileImage(id: string, file: any) {
    //     return this.http.post(`${this.baseUrl}/api/clinician/upload-image/${id}`, file, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>) => res.body)
    //         );
    // }

    // authenticateAdmin(data: any) {
    //     return this.http.post(`${this.baseUrl}/admin/login`, data, {
    //         observe: 'response',
    //     })
    //         .pipe(
    //             map((res: HttpResponse<any>): string => res.body),
    //         );
    // }
}
