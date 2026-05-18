<?php

use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RoleController::class)->prefix('/role')->group(function() {
    Route::get('/loadRole', 'loadRoles'); //role/loadRole
    Route::get('/getRole/{role_id}', 'getRole'); // /role/
    Route::post('/storeRole', 'storeRole'); // /role/storeRole
});

Route::controller(DepartmentController::class)->prefix('/department')->group(function() {
    Route::get('/loadDepartment', 'loadDepartments'); // /department/loadDepartments
    Route::get('/getDepartment/{department_id}', 'getDepartment'); //department/
    Route::post('/storeDepartment', 'storeDepartment'); // /department/storeDepartment
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
