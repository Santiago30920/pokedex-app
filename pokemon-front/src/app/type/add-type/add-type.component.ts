import { Component, Inject, OnInit } from '@angular/core';
import { TypeDTO } from '../../domain/dto/type-dto';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EOperation } from '../../domain/enum/e-operation';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TypeService } from '../../domain/service/type.service';
import { ECode } from '../../domain/enum/e-code';

@Component({
  selector: 'app-add-type',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './add-type.component.html',
  styleUrl: './add-type.component.css'
})
export class AddTypeComponent implements OnInit {
  type: TypeDTO;
  constructor(@Inject(MAT_DIALOG_DATA) public data: TypeDTO, public dialogRef: MatDialogRef<AddTypeComponent>, private typeService: TypeService) {
    if (this.data.operation === EOperation.EDITAR) {
      this.type = data;
    } else {
      this.type = new TypeDTO();
    }
  }

  ngOnInit() {
  }
  
  confirmar() {
    console.log(this.type);
    if(this.data.operation === EOperation.EDITAR){
      if(this.type.name){
        this.typeService.editar(this.type).subscribe((response: any) => {
          console.log(response);
          if(response.status == ECode.OK ){
            this.dialogRef.close(this.type);
          }
        }, (error: any) => {
          console.log(error);
          this.dialogRef.close();
        });
      }
    }else{
      if (this.type.name) {
        this.typeService.persistir(this.type).subscribe((response: any) => {
          console.log(response);
          if(response.status == ECode.OK ){
            this.dialogRef.close(response.data);
          }
        }, (error: any) => {
          console.log(error);
          this.dialogRef.close();
        });
      }
    }
  }

}
