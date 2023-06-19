import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomToastrService){

  }
  public files: NgxFileDropEntry[];

  @Input() options:Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    debugger;
    this.files = files;
    const fileData:FormData = new FormData();

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file:File)=>{
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    console.log(this.options);
    this.httpClientService.post({
      controller:this.options.controller,
      action:this.options.action,
      queryString:this.options.queryString,
      headers: new HttpHeaders({"responseType": "blob"})
    },fileData).subscribe(data => {

      const message : string = "When download the files encountered an unexpected error ";

      if(this.options.isAdminPage){
        this.alertifyService.message(message,
          {
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          });
      } else {
          this.customToastrService.message(message,"Unsuccessful",{
            messageType:ToastrMessageType.Error,
            position:ToastrPosition.TopRight
          });
      }
    },(errorResponsne:HttpErrorResponse) =>{

      const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşsda.";

      if (this.options.isAdminPage) {
        this.alertifyService.message(message,
          {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
      } else {
        this.customToastrService.message(message, "Başarssd.", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight
        })
      }

    });
}
}

export class FileUploadOptions{
  controller?:string;
  action?: string;
  queryString?:string; 
  explanation?:string;
  accept?:string;
  isAdminPage?:boolean = false;
}
