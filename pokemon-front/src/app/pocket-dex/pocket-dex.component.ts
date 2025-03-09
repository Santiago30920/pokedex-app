import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../domain/service/pokemon.service';
import { PokemonDTO } from '../domain/dto/pokemon-dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EPokemon } from '../domain/enum/e-pokemon';
import { EOperation } from '../domain/enum/e-operation';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-pocket-dex',
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
  templateUrl: './pocket-dex.component.html',
  styleUrl: './pocket-dex.component.css'
})
export class PocketDexComponent implements OnInit {
  isOpen = false;
  pokemons: PokemonDTO[] = [];
  pokemon: PokemonDTO;

  displayedColumns: string[] = [EPokemon.LABEL_NAME, EPokemon.LABEL_TYPE, EPokemon.LABEL_ABILITIES, EPokemon.LABEL_SPRITE_URL, EPokemon.LABEL_ACTION];
  dataSource!: MatTableDataSource<PokemonDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService, public dialog: MatDialog) {
    this.pokemon = new PokemonDTO();
  }

  ngOnInit(): void {
    this.pokemonService.listar().subscribe((response: any) => {
      for(let i = 0; i < response.data.length; i++) {
        let pokemon = new PokemonDTO();
        pokemon.id = response.data[i].id;
        pokemon.name = response.data[i].name;
        pokemon.types = JSON.parse(response.data[i].types ? response.data[i].types: "[]");
        pokemon.abilities = JSON.parse(response.data[i].abilities ? response.data[i].abilities: "[]");
        pokemon.sprite_url = response.data[i].sprite_url;
        this.pokemons.push(pokemon);
      }
      this.cargarData();
    }, (error: any) => {
      console.log(error);
    }
    );
  }

  addUser() {
    const pokemon = new PokemonDTO();
    pokemon.operation = EOperation.PERSISTIR;
    const ref = this.dialog.open(PokemonComponent, {
      width: '600px',
      data: pokemon,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
    });
    ref.afterClosed().subscribe((result: PokemonDTO) => {
      if (result) {
        this.pokemons.push(result);
        this.cargarData();
      }
    });
  }

  openInformation(pokemon: PokemonDTO){
    pokemon.operation = EOperation.INFORMACION;
    let poke = new PokemonDTO();
    poke = poke.deepCopy(pokemon) as PokemonDTO;
    const ref = this.dialog.open(PokemonComponent, {
      data: poke,
      width: '600px',
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
    });
  }

  openDialogEditar(pokemon: PokemonDTO): void {
    pokemon.operation = EOperation.EDITAR;
    let poke = new PokemonDTO();
    poke = poke.deepCopy(pokemon) as PokemonDTO;
    const ref = this.dialog.open(PokemonComponent, {
      width: '600px',
      data: poke,
      backdropClass: 'backdropBackground',
      panelClass: 'custom-modalbox',
    });
    ref.afterClosed().subscribe((poke: PokemonDTO) => {
      if (poke) {
        for (let index = 0; index < this.pokemons.length; index++) {
          const pok = this.pokemons[index];
          if (pok.id === poke.id) {
            this.pokemons.splice(index, 1, poke);
            break;
          }
        }
        this.cargarData();
      }
    });
  }

  togglePokedex() {
    this.isOpen = !this.isOpen;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarData() {
    this.dataSource = new MatTableDataSource(this.pokemons);
    this.dataSource.filterPredicate = (data: PokemonDTO, filter: string) => {
      if (data.name) {
        const val = data.name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
        return val;
      } else {
        return false;
      }
    }
    this.dataSource.paginator = this.paginator;
  }
}
