import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../core/service/alert.service';
import { TagService } from '../../data/service/tag.service';

interface Option {
    value: number;
    viewValue: string;
}

@Component({ templateUrl: 'add.component.html' })
export class AddComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private tagService: TagService,
        private alertService: AlertService
    ) { }

    ngOnInit () {

        this.form = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f () { return this.form.controls; }

    onSubmit () {
        this.submitted = true;
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.createTag()
    }

    private createTag () {
        let values = this.form.value;
        var newTag = {
            name: values.name,
            tagID: null
        }
        this.tagService.addTag(newTag)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    


}