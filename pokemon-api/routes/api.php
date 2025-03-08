<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\pokemonController;
use App\Http\Controllers\typeController;
use App\Http\Controllers\abilitiesController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/**
 * Routers para generar CRUD en Pokemon
 */
Route::get('pokemon/index', [pokemonController::class, 'index']);
Route::get('pokemon/search/{id}', [pokemonController::class, 'search']);
Route::post('pokemon/save', [pokemonController::class, 'save']);
Route::put('pokemon/update/{id}', [pokemonController::class, 'update']);
Route::delete('pokemon/delate/{id}', [pokemonController::class, 'destroy']);
/**
 * Routers para generar CRUD en Type
 */
Route::get('type/index', [typeController::class, 'index']);
Route::get('type/search/{id}', [typeController::class, 'search']);
Route::post('type/save', [typeController::class, 'save']);
Route::patch('type/update/{id}', [typeController::class, 'update']);
Route::delete('type/delate/{id}', [typeController::class, 'destroy']);
/**
 * Routers para generar CRUD en Ability
 */
Route::get('abilitie/index', [abilitiesController::class, 'index']);
Route::get('abilitie/search/{id}', [abilitiesController::class, 'search']);
Route::post('abilitie/save', [abilitiesController::class, 'save']);
Route::patch('abilitie/update/{id}', [abilitiesController::class, 'update']);
Route::delete('abilitie/delate/{id}', [abilitiesController::class, 'destroy']);