import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadDownloadService {
    private baseApiUrl: string;
    private apiUploadUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseApiUrl = 'https://localhost:5001/api/UploadDownload/';
        this.apiUploadUrl = this.baseApiUrl + 'upload';
    }

    public uploadFile (file: Blob): Observable<HttpEvent<void>> {
        const formData = new FormData();
        formData.append('file', file);

        return this.httpClient.request(new HttpRequest(
            'POST',
            this.apiUploadUrl,
            formData,
            {
                reportProgress: true
            }));
    }
}