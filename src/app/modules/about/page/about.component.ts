import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UploadDownloadService } from '../../../data/service/upload-download.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  message: string;
  @ViewChild('inputFile') inputFile: ElementRef;
  public imagePath;
  imgURL: any;

  constructor(private service: UploadDownloadService) { }

  ngOnInit(): void {
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

  public upload (event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.service.uploadFile(file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                
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

}
