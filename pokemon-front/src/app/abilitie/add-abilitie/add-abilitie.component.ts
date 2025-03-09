import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AbilitieDTO } from '../../domain/dto/abilitie-dto';
import { AbilitieService } from '../../domain/service/abilitie.service';
import { EOperation } from '../../domain/enum/e-operation';
import { ECode } from '../../domain/enum/e-code';

@Component({
  selector: 'app-add-abilitie',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './add-abilitie.component.html',
  styleUrl: './add-abilitie.component.css'
})
export class AddAbilitieComponent implements OnInit{

  abilitie: AbilitieDTO;
  constructor(@Inject(MAT_DIALOG_DATA) public data: AbilitieDTO, public dialogRef: MatDialogRef<AddAbilitieComponent>, private abilitieService: AbilitieService) {
    if (this.data.operation === EOperation.EDITAR) {
      this.abilitie = data;
    } else {
      this.abilitie = new AbilitieDTO();
    }
  }

  ngOnInit() {
  }

  confirmar() {
    if(this.data.operation === EOperation.EDITAR){
      if(this.abilitie.name && this.abilitie.description){
        this.abilitieService.editar(this.abilitie).subscribe((response: any) => {
          if(response.status == ECode.OK ){
            this.dialogRef.close(this.abilitie);
          }

        }, (error: any) => {
          console.log(error);
          this.dialogRef.close();
        });
      }
    }else{
      if (this.abilitie.name ) {
        this.abilitieService.persistir(this.abilitie).subscribe((response: any) => {
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
