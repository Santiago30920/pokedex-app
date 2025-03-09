import { Component, Inject, OnInit, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PokemonDTO } from '../../domain/dto/pokemon-dto';
import { EOperation } from '../../domain/enum/e-operation';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TypeDTO } from '../../domain/dto/type-dto';
import { PokemonService } from '../../domain/service/pokemon.service';
import { TypeService } from '../../domain/service/type.service';
import { AbilitieService } from '../../domain/service/abilitie.service';
import { AbilitieDTO } from '../../domain/dto/abilitie-dto';

@Component({
  selector: 'app-pokemon',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {

  pokemon: PokemonDTO;
  types: TypeDTO[] = [];
  abilities: AbilitieDTO[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: PokemonDTO, private pokemonService: PokemonService,
  private typeService: TypeService, private abilitieService: AbilitieService, public dialogRef: MatDialogRef<PokemonComponent>) {
    this.pokemon = new PokemonDTO();
    if (this.data.operation === EOperation.EDITAR) {
      this.pokemon = data;
    } else if (this.data.operation === EOperation.INFORMACION) {
      this.pokemon = data;
    } else {
      this.pokemon = new PokemonDTO
    }
  }

  ngOnInit() {
    this.typeService.listar().subscribe((response: any) => {
      for (let i = 0; i < response.data.length; i++) {
        let type = new TypeDTO();
        type.id = response.data[i].id;
        type.name = response.data[i].name;
        this.types.push(type);
      }
    }, (error: any) => {
      console.log(error);
    });
    this.abilitieService.listar().subscribe((response: any) => {
      for (let i = 0; i < response.data.length; i++) {
        let abilitie = new AbilitieDTO();
        abilitie.id = response.data[i].id;
        abilitie.name = response.data[i].name;
        this.abilities.push(abilitie);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  save(){
    if (this.pokemon.operation === EOperation.PERSISTIR) {
      if(this.pokemon.name && this.pokemon.types.length > 0 && this.pokemon.abilities.length > 0 && this.pokemon.sprite_url) {        
        this.pokemonService.persistir(this.pokemon).subscribe((response: any) => {
          if(response.status == 200){
            this.dialogRef.close(response.data);
          }
        }, (error: any) => {
          this.dialogRef.close();
        });

      }else{
        alert('Faltan campos por llenar');
        
      }
    } else {
      this.pokemonService.editar(this.pokemon).subscribe((response: any) => {
        if(response.status == 200){
          this.dialogRef.close(this.pokemon);
        }
      }, (error: any) => {
        this.dialogRef.close();
      });
    }
  }

}
