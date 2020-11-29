import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { TagService } from '../../data/service/tag.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    tags = null;

    constructor(private tagService: TagService) { }

    ngOnInit () {
        this.tagService.getAll()
            .pipe(first())
            .subscribe(tags => this.tags = tags);
    }

    deleteTag (id: number) {
        const tag = this.tags.find(x => x.id === id);
        tag.isDeleting = true;
        this.tagService.deleteTag(id)
            .pipe(first())
            .subscribe(() => this.tags = this.tags.filter(x => x.id !== id));
    }
}