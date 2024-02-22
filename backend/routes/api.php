<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

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

Route::post('/admin/users', [UserController::class, 'all']);
Route::post('/admin/users/login', [UserController::class, 'login'])->name('login');
Route::post('/admin/users/active', [UserController::class, 'active']);
Route::post('/admin/users/edit', [UserController::class, 'update']);
Route::post('/admin/users/add', [UserController::class, 'store']);
Route::post('/admin/users/delete', [UserController::class, 'delete']);
