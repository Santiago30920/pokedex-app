<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;
use Exception;

class typeController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $types = Type::all();
        return response()->json([
            "status"=> 200,
            "message"=> "Type the pokemons list",
            "data"=> $types
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function save(Request $request)
    {
        try{
            $types = new Type();
            $types->name = $request->name;
            $types->save();
            return response()->json([
                "status"=> 200,
                "message"=> "Type the pokemon created successfully",
                "code" => 1,
                "data"=> $types
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
            $response = Type::where('id', $id)->update([
                'name' => $request->name,
            ]);
            if($response){
                return response()->json([
                    "status"=> 200,
                    "message"=> "Type updated successfully",
                    "code" => 1
                ], 200);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Type not updated",
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
            $response = Type::where('id', $id)->delete();
            if($response){
                return response()->json([
                    "status"=> 200,
                    "message"=> "Type the pokemon deleted successfully",
                    "code" => 1
                ], 200);
            }
        }catch(Exception $e){
            return response()->json([
                "status"=> 500,
                "message"=> "Type the pokemon not deleted",
                "messageLog"=> $e->getMessage(),
                "code" => 0
            ], 500);
        }
    }
}
