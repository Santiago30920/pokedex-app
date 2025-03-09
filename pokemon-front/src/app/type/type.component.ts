import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TypeDTO } from '../domain/dto/type-dto';
import { EType } from '../domain/enum/e-type';
import { TypeService } from '../domain/service/type.service';
import { EOperation } from '../domain/enum/e-operation';
import { AddTypeComponent } from './add-type/add-type.component';

@Component({
  selector: 'app-type',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent implements OnInit {

  types: TypeDTO[] = [];
  type: TypeDTO;

  displayedColumns: string[] = [EType.LABEL_ID, EType.LABEL_NAME, EType.LABEL_ACTION];
  dataSource!: MatTableDataSource<TypeDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private typeService: TypeService, public dialog: MatDialog) {
    this.type = new TypeDTO();
  }

  ngOnInit(): void {
    this.typeService.listar().subscribe((response: any) => {
      for (let i = 0; i < response.data.length; i++) {
        let type = new TypeDTO();
        type.id = response.data[i].id;
        type.name = response.data[i].name;
        this.types.push(type);
      }
      this.cargarData();
    }, (error: any) => {
      console.log(error);
    }
    );
  }

  addUser() {
    const type = new TypeDTO();
    type.operation = EOperation.PERSISTIR;
    const ref = this.dialog.open(AddTypeComponent, {
      width: '600px',
      data: type,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
      disableClose: true,
    });
    ref.afterClosed().subscribe((result: TypeDTO) => {
      if (result) {
        this.types.push(result);
        this.cargarData();
      }
    });
  }

  openDialogEditar(type: TypeDTO): void {
    type.operation = EOperation.EDITAR;
    let typ = new TypeDTO();
    typ = typ.deepCopy(type) as TypeDTO;
    const ref = this.dialog.open(AddTypeComponent, {
      data: typ,
      width: '600px',
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
    ref.afterClosed().subscribe((typ: TypeDTO) => {
      if (typ) {
        for (let index = 0; index < this.types.length; index++) {
          const pok = this.types[index];
          if (pok.id === typ.id) {
            this.types.splice(index, 1, typ);
            break;
          }
        }
        this.cargarData();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarData() {
    this.dataSource = new MatTableDataSource(this.types);
    this.dataSource.filterPredicate = (data: TypeDTO, filter: string) => {
      if (data.name) {
        const val = data.name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        return val;
      } else {
        return false;
      }
    }
    this.dataSource.paginator = this.paginator;
  }

  delate(type: TypeDTO) {
    this.typeService.eliminar(type).subscribe((response: any) => {
    });
  }

}
