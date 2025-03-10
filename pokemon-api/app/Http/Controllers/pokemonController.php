<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pokemon;
use Exception;

class pokemonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pokemons = pokemon::all();
        return response()->json([
            "status"=> 200,
            "message"=> "Pokemons list",
            "data"=> $pokemons
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function save(Request $request)
    {
        try{
            $pokemon = new pokemon();
            if($request->name && $request->types && $request->abilities && $request->sprite_url){
                $pokemon->name = $request->name;
                $pokemon->types =  json_encode($request->types);
                $pokemon->abilities = json_encode($request->abilities);
                $pokemon->sprite_url = $request->sprite_url;
                $pokemon->save();
                return response()->json([
                    "status"=> 200,
                    "message"=> "Pokemon created successfully",
                    "code" => 1,
                    "data"=> $pokemon
                ], 200);
            }else{
                return response()->json([
                    "status"=> 500,
                    "message"=> "undifined data in request",
                    "code" => 0
                ], 500);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Pokemon not created",
                "messageLog"=> $e->getMessage(),
                "code" => 0
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            if($request->name && $request->types && $request->abilities && $request->sprite_url && $id){
                $response = Pokemon::where('id', '=', $id)->update([
                    'name' => $request->name,
                    'types' => json_encode($request->types),
                    'abilities' => json_encode($request->abilities),
                    'sprite_url' => $request->sprite_url
                ]);
                if($response == 1){
                    return response()->json([
                        "status"=> 200,
                        "message"=> "Pokemon updated successfully",
                        "code" => 1
                    ], 200);
                }else{
                    return response()->json([
                        "status"=> 500,
                        "message"=> "Pokemon not update, id invalid",
                        "code" => 0
                    ], 500);
                }
            }else{
                return response()->json([
                    "status"=> 500,
                    "message"=> "Pokemon not update",
                    "code" => 0
                ], 500);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Pokemon not updated",
                "messageLog"=> $e->getMessage(),
                "code" => 0
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            $response = pokemon::where('id', '=', $id)->delete();
            if($response == 1){
                return response()->json([
                    "status"=> 200,
                    "message"=> "Pokemon deleted successfully",
                    "code" => 1
                ], 200);
            }else{
                return response()->json([
                    "status"=> 500,
                    "message"=> "Pokemon not deleted",
                    "code" => 0
                ], 500);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Pokemon not deleted",
                "messageLog"=> $e->getMessage(),
                "code" => 0
            ], 500);
        }
    }

    public function search(string $name)
    {
        try {
            $pokemon = pokemon::where('name', '=', $name)->first();
    
            if ($pokemon) {
                return response()->json([
                    "status" => 200,
                    "message" => "Pokemon found",
                    "data" => [
                        "id" => $pokemon->id,
                        "name" => $pokemon->name,
                        "types" => json_decode($pokemon->types, true), // 🔥 Decodificar JSON
                        "abilities" => json_decode($pokemon->abilities, true), // 🔥 Decodificar JSON
                        "sprite_url" => $pokemon->sprite_url
                    ]
                ], 200);
            } else {
                return response()->json([
                    "status" => 404,
                    "message" => "Pokemon not found",
                    "code" => 0
                ], 404);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 500,
                "message" => "An error occurred",
                "messageLog" => $e->getMessage(),
                "code" => 0
            ], 500);
        }
    }

}
