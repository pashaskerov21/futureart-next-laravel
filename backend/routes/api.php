<?php

use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\SettingController;
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

Route::post('/site/settings/active', [SettingController::class, 'active']);
Route::post('/site/settings/update', [SettingController::class, 'update']);
Route::post('/site/settings/delete_file', [SettingController::class, 'deleteFile']);

Route::get('/site/menu/all', [MenuController::class, 'all']);
Route::post('/site/menu/update', [MenuController::class, 'update']);
Route::post('/site/menu/sort', [MenuController::class, 'sort']);
