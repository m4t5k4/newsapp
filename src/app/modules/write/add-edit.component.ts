import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { AlertService } from '../../core/service/alert.service';
import { ArticleService } from '../../data/service/article.service';
import { TagService } from '../../data/service/tag.service';
import { UploadDownloadService } from 'src/app/data/service/upload-download.service';
import { HttpEventType } from '@angular/common/http';

interface Option {
    value: number;
    viewValue: string;
}

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    imageID: number;

    message: string;
    @ViewChild('inputFile') inputFile: ElementRef;
    public imagePath;
    imgURL: any;


    articleStatus: Option[] = [
        { value: 2, viewValue: 'to review' },
        { value: 3, viewValue: 'draft' }
    ]

    tags: Option[] = [
        
    ]

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService,
        private alertService: AlertService,
        private tagService: TagService,
        private uploadDownloadService: UploadDownloadService
    ) { }

    ngOnInit () {
        this.tagService.getAll()
            .pipe(first())
            .subscribe(x => 
                x.forEach(tag => 
                    this.tags.push({value: tag.tagID, viewValue: tag.name})));
        this.id = parseInt(this.route.snapshot.params['id']);//parse
        this.isAddMode = !this.id;
        console.log(this.tags)

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            subTitle: ['', Validators.required],
            shortSummary: ['', Validators.required],
            body: ['', Validators.required],
            articleStatusID: [null],
            tagID: [null],
            imageID: []
        });

        if (!this.isAddMode) {
            this.articleService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }

        this.form.get("tagID").valueChanges
            .subscribe(f=> {
                this.onTagChanged(f);
            })
    }
    onTagChanged (value) {
        console.log(value)
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

        this.loading = true;
        if (this.isAddMode) {
            this.createArticle();
        } else {
            this.updateArticle();
        }
    }

    private createArticle () {
        let values = this.form.value;
        var newArticle = {
            title: values.title,
            subTitle: values.subTitle,
            shortSummary: values.shortSummary,
            body: values.body,
            articleStatusID: parseInt(values.articleStatusID),
            tagID: parseInt(values.tagID),
            imageID: this.imageID
        }
        this.articleService.addArticle(newArticle)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Article added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateArticle () {
        let values = this.form.value;
        console.log(values);
        let user = JSON.parse(localStorage.getItem("user"));
        let userID = user.userID;
        if (this.imageID == null) this.imageID = values.imageID;
        var updateArticle = {
            title: values.title,
            subTitle: values.subTitle,
            shortSummary: values.shortSummary,
            body: values.body,
            articleStatusID: parseInt(values.articleStatusID),
            tagID: parseInt(values.tagID),
            articleID: this.id,
            imageID: this.imageID,
            userID: userID
        }
        console.log(updateArticle);
        this.articleService.updateArticle(this.id, updateArticle)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    preview (files) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    public upload (files) {
        if (files && files.length > 0) {
            const file = files[0];

            this.uploadDownloadService.uploadFile(file).subscribe(
                data => {
                    if (data) {
                        switch (data.type) {
                            case HttpEventType.UploadProgress:

                                break;
                            case HttpEventType.Response:
                                this.inputFile.nativeElement.value = '';
                                console.log(data.body);
                                this.imageID = parseInt(JSON.stringify(data.body));
                                console.log(this.imageID);
                                break;
                        }
                    }
                },
                error => {
                    this.inputFile.nativeElement.value = '';

                }
            );
        }
    }

    public delete() {
        this.inputFile.nativeElement.value = "";
        this.imgURL = "";
    }
}