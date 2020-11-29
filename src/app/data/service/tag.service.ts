import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../schema/tag.model';
import { environment } from '../../../environments/environment';

const URL = "https://localhost:5001/api/tag/"

@Injectable({
    providedIn: 'root'
})
export class TagService {
    deleteTag (id: number) {
        return this.http.delete(`${environment.apiUrl}/tag/${id}`)
    }

    constructor(private http: HttpClient) { }

    getAll (): Observable<Tag[]> {
        return this.http.get<Tag[]>(URL);
    }

    addTag (tag: Tag) {
        return this.http.post(`${environment.apiUrl}/tag`, tag);
    }
}
