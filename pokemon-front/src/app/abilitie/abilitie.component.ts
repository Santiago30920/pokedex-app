import { Component, OnInit, ViewChild } from '@angular/core';
import { AbilitieDTO } from '../domain/dto/abilitie-dto';
import { EAbilitie } from '../domain/enum/e-abilitie';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AbilitieService } from '../domain/service/abilitie.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EOperation } from '../domain/enum/e-operation';
import { AddAbilitieComponent } from './add-abilitie/add-abilitie.component';

@Component({
  selector: 'app-abilitie',
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
  templateUrl: './abilitie.component.html',
  styleUrl: './abilitie.component.css'
})
export class AbilitieComponent implements OnInit {

  abilities: AbilitieDTO[] = [];
  abilitie: AbilitieDTO;

  displayedColumns: string[] = [EAbilitie.LABEL_ID, EAbilitie.LABEL_NAME, EAbilitie.LABEL_ACTION];
  dataSource!: MatTableDataSource<AbilitieDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private abilitieService: AbilitieService, public dialog: MatDialog) {
    this.abilitie = new AbilitieDTO();
  }

  ngOnInit(): void {
    this.abilitieService.listar().subscribe((response: any) => {
      for (let i = 0; i < response.data.length; i++) {
        let abilitie = new AbilitieDTO();
        abilitie.id = response.data[i].id;
        abilitie.name = response.data[i].name;
        this.abilities.push(abilitie);
      }
      this.cargarData();
    }, (error: any) => {
      console.log(error);
    }
    );
  }

  addUser() {
    const abilitie = new AbilitieDTO();
    abilitie.operation = EOperation.PERSISTIR;
    const ref = this.dialog.open(AddAbilitieComponent, {
      width: '600px',
      data: abilitie,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
      disableClose: true,
    });
    ref.afterClosed().subscribe((result: AbilitieDTO) => {
      if (result) {
        this.abilities.push(result);
        this.cargarData();
      }
    });
  }

  openDialogEditar(abilitie: AbilitieDTO): void {
    abilitie.operation = EOperation.EDITAR;
    let abili = new AbilitieDTO();
    abili = abili.deepCopy(abilitie) as AbilitieDTO;
    const ref = this.dialog.open(AddAbilitieComponent, {
      data: abili,
      width: '600px',
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
      disableClose: true
    });
    ref.afterClosed().subscribe((abilitie: AbilitieDTO) => {
      if (abilitie) {
        for (let index = 0; index < this.abilities.length; index++) {
          const abili = this.abilities[index];
          if (abili.id === abilitie.id) {
            this.abilities.splice(index, 1, abilitie);
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
    this.dataSource = new MatTableDataSource(this.abilities);
    this.dataSource.filterPredicate = (data: AbilitieDTO, filter: string) => {
      if (data.name) {
        const val = data.name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        return val;
      } else {
        return false;
      }
    }
    this.dataSource
  }
}
