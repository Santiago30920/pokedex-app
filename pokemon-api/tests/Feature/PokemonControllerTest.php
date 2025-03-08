<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\Pokemon;

class PokemonControllerTest extends TestCase
{
    use DatabaseTransactions; // Limpia la base de datos después de cada prueba
    /**
     * Test para verificar que la función index retorna los pokemons correctamente.
     */
    public function test_index_returns_pokemon_list()
    {
        // Arrange: Crear datos ficticios en la base de datos
        Pokemon::factory()->count(3)->create();

        // Act: Hacer la petición GET a la ruta del índice
        $response = $this->getJson('/api/pokemon/index');

        // Assert: Verificar que la respuesta es la esperada
        $response->assertStatus(200)
            ->assertJsonStructure([
                "status",
                "message",
                "data" => [
                    "*" => [
                        "id",
                        "name",
                        "types",
                        "abilities",
                        "sprite_url",
                    ]
                ]
            ])
            ->assertJson([
                "status" => 200,
                "message" => "Pokemons list",
            ]);
    }
    /** @test */
    public function test_save_creates_a_pokemon_successfully()
    {
        // Arrange: Datos de prueba
        $pokemonData = [
            'name' => 'Pikachu',
            'types' => ['Electric'],
            'abilities' => ['Static', 'Lightning Rod'],
            'sprite_url' => 'https://via.placeholder.com/200x200.png'
        ];

        // Act: Enviar petición POST
        $response = $this->postJson('/api/pokemon/save', $pokemonData);

        // Assert: Verificar respuesta y base de datos
        $response->assertStatus(200)
            ->assertJson([
                "status" => 200,
                "message" => "Pokemon created successfully",
                "code" => 1
            ]);

        $this->assertDatabaseHas('pokemon', [
            'name' => 'Pikachu',
            'sprite_url' => 'https://via.placeholder.com/200x200.png'
        ]);
    }

    /** @test */
    public function test_save_fails_when_data_is_missing()
    {
        // Act: Intentar guardar sin datos
        $response = $this->postJson('/api/pokemon/save', []);

        // Assert: Verificar error (422 Unprocessable Entity)
        $response->assertStatus(500)
            ->assertJson([
                "status" => 500,
                "message" => "undifined data in request",
                "code" => 0
            ]);
    }
    /** @test */
    public function test_update_pokemon_successfully()
    {
        // Arrange: Crear un Pokémon en la BD
        $pokemon = Pokemon::factory()->create([
            'name' => 'Charmander',
            'types' => json_encode(['Fire']),
            'abilities' => json_encode(['Blaze']),
            'sprite_url' => 'https://via.placeholder.com/200x200.png'
        ]);

        // Datos actualizados
        $updatedData = [
            'name' => 'Charizard',
            'types' => ['Fire', 'Flying'],
            'abilities' => ['Blaze', 'Solar Power'],
            'sprite_url' => 'https://via.placeholder.com/200x200.png?charizard'
        ];

        // Act: Enviar petición PUT
        $response = $this->putJson("/api/pokemon/update/{$pokemon->id}", $updatedData);

        // Assert: Verificar respuesta
        $response->assertStatus(200)
            ->assertJson([
                "status" => 200,
                "message" => "Pokemon updated successfully",
                "code" => 1
            ]);

        // Verificar que la BD tiene los nuevos datos
        $this->assertDatabaseHas('pokemon', [
            'id' => $pokemon->id,
            'name' => 'Charizard',
            'types' => json_encode(['Fire', 'Flying']),
            'abilities' => json_encode(['Blaze', 'Solar Power']),
            'sprite_url' => 'https://via.placeholder.com/200x200.png?charizard'
        ]);
    }

    /** @test */
    public function test_update_pokemon_with_invalid_id()
    {
        // Arrange: ID inexistente
        $invalidId = 9999;

        $updatedData = [
            'name' => 'Bulbasaur',
            'types' => ['Grass', 'Poison'],
            'abilities' => ['Overgrow'],
            'sprite_url' => 'https://via.placeholder.com/200x200.png?bulbasaur'
        ];

        // Act: Intentar actualizar
        $response = $this->putJson("/api/pokemon/update/{$invalidId}", $updatedData);

        // Assert: Verificar error
        $response->assertStatus(500)
            ->assertJson([
                "status" => 500,
                "message" => "Pokemon not update, id invalid",
                "code" => 0
            ]);
    }

    /** @test */
    public function test_update_pokemon_with_missing_data()
    {
        // Arrange: Crear un Pokémon
        $pokemon = Pokemon::factory()->create();

        // Act: Intentar actualizar con datos incompletos
        $response = $this->putJson("/api/pokemon/update/{$pokemon->id}", [
            'name' => 'Squirtle'
        ]);

        // Assert: Verificar error por datos faltantes
        $response->assertStatus(500)
            ->assertJson([
                "status" => 500,
                "message" => "Pokemon not update",
                "code" => 0
            ]);
    }
    /** @test */
    public function test_destroy_pokemon_successfully()
    {
        // Arrange: Crear un Pokémon en la BD
        $pokemon = Pokemon::factory()->create();

        // Act: Enviar petición DELETE
        $response = $this->deleteJson("/api/pokemon/delate/{$pokemon->id}");

        // Assert: Verificar respuesta
        $response->assertStatus(200)
            ->assertJson([
                "status" => 200,
                "message" => "Pokemon deleted successfully",
                "code" => 1
            ]);

        // Verificar que el Pokémon fue eliminado
        $this->assertDatabaseMissing('pokemon', [
            'id' => $pokemon->id
        ]);
    }

    /** @test */
    public function test_destroy_pokemon_with_invalid_id()
    {
        // Arrange: ID inexistente
        $invalidId = 9999;

        // Act: Intentar eliminar
        $response = $this->deleteJson("/api/pokemon/delate/{$invalidId}");

        // Assert: Verificar error
        $response->assertStatus(500)
            ->assertJson([
                "status" => 500,
                "message" => "Pokemon not deleted",
                "code" => 0
            ]);
    }
    /** @test */
    public function test_search_pokemon_successfully()
    {
        // Arrange: Crear un Pokémon en la BD
        $pokemon = Pokemon::factory()->create([
            'name' => 'Charmander',
            'types' => json_encode(['Electric']),
            'abilities' => json_encode(['Static']),
            'sprite_url' => 'https://via.placeholder.com/200x200.png'
        ]);
        // Act: Enviar petición GET
        $response = $this->getJson("/api/pokemon/search/{$pokemon->name}");

        // Assert: Verificar respuesta
        $response->assertStatus(200)
            ->assertJson([
                "status" => 200,
                "message" => "Pokemon found",
                "data" => [
                    "name" => "Charmander",
                    "types" => ['Electric'],
                    "abilities" => ['Static'],
                    "sprite_url" => "https://via.placeholder.com/200x200.png"
                ]
            ]);
    }

    /** @test */
    public function test_search_pokemon_not_found()
    {
        // Arrange: Nombre inexistente
        $pokemonName = "Mewthree";

        // Act: Intentar buscar
        $response = $this->getJson("/api/pokemon/search/{$pokemonName}");

        // Assert: Verificar error
        $response->assertStatus(404)
            ->assertJson([
                "status" => 404,
                "message" => "Pokemon not found"
            ]);
    }
}
