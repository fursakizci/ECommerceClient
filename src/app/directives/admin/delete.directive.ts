import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import {ProductService} from 'src/app/services/common/models/product.service'

@Directive({
  selector: '[appDelete]'
})

export class DeleteDirective {

  constructor(
    private element : ElementRef,
    private _renderer : Renderer2,
    private productService : ProductService,
    public dialog:MatDialog,
    public httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    public spinner:NgxSpinnerService,
    private dialogService:DialogService
  ) { 
    const img = _renderer.createElement("img");
    img.setAttribute("src","../../../../assets/delete-icon.png");
    img.setAttribute("style","cursor:pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id:string; 
  @Output() callback : EventEmitter<any> = new EventEmitter();
  @Input() controller: string = "product";

  @HostListener("click")
  async onClick(){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.yes,
      afterClosed : async ()=>{
        debugger;
        this.spinner.show(SpinnerType.Pacman);
        const td : HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller : this.controller
        },this.id).subscribe(data=>{
          $(td.parentElement).animate(
            {
              opacity:0,
              left: "+=50",
              height:"toogle"
            },700,()=>
            {
              this.callback.emit();
              this.alertifyService.message("Completed",{
                dismissOthers:true,
                messageType:MessageType.Success,
                position:Position.TopRight
              });
              this.spinner.hide(SpinnerType.Pacman);
            }
          );
            
        },(errorResponse:HttpErrorResponse) =>{
          this.spinner.hide(SpinnerType.Pacman);
          this.alertifyService.message("Error",{
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          });
        });
        //await this.productService.delete(this.id);
      }
      });
    
    
  }
}
