<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Abilities;
use Exception;

class abilitiesController extends Controller
{
         /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $abilities = Abilities::all();
        return response()->json([
            "status"=> 200,
            "message"=> "Abilities the pokemons list",
            "data"=> $abilities
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function save(Request $request)
    {
        try{
            $abilities = new Abilities();
            $abilities->name = $request->name;
            $abilities->description = $request->description;
            $abilities->save();
            return response()->json([
                "status"=> 200,
                "message"=> "Type the pokemon created successfully",
                "code" => 1,
                "data"=> $abilities
            ], 200);
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Type the pokemon not created",
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
            $response = Abilities::where('id', $id)->update([
                'name' => $request->name,
                'description' => json_encode($request->description)
            ]);
            if($response){
                return response()->json([
                    "status"=> 200,
                    "message"=> "Abilities updated successfully",
                    "code" => 1
                ], 200);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Abilities not updated",
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
            $response = Abilities::where('id', $id)->delete();
            if($response){
                return response()->json([
                    "status"=> 200,
                    "message"=> "Abilities the pokemon deleted successfully",
                    "code" => 1
                ], 200);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Abilities the pokemon not deleted",
                "messageLog"=> $e->getMessage(),
                "code" => 0
            ], 500);
        }
    }
}
