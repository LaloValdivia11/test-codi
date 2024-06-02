<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/test-public', function () {
    return response()->json(['message' => 'Public route accessible']);
});


Route::post('/login', [UserController::class, 'login'])->name('login');


Route::post('/register', [UserController::class, 'registerUser']);
Route::put('/user/{id}', [UserController::class, 'editUser']);
Route::delete('/user/{id}', [UserController::class, 'deleteUser']);   
Route::get('/all/user', [UserController::class, 'allUser']);

Route::middleware('auth:sanctum')->group(function () {

});
