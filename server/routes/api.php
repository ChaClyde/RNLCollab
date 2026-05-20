<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RoleController::class)->prefix('/role')->group(function() {
    Route::get('/loadRole', 'loadRoles'); //role/loadRole
    Route::get('/getRole/{role_id}', 'getRole'); // /role/
    Route::post('/storeRole', 'storeRole'); // /role/storeRole
    Route::put('/updateRole/{role}', 'updateRole'); // /role/roleUpdate
    Route::put('/destroyRole/{role}', 'destroyRole'); // /role/roleDestroy
});

Route::controller(DepartmentController::class)->prefix('/department')->group(function() {
    Route::get('/loadDepartment', 'loadDepartments'); // /department/loadDepartments
    Route::get('/getDepartment/{department_id}', 'getDepartment'); //department/
    Route::post('/storeDepartment', 'storeDepartment'); // /department/storeDepartment
    Route::put('/updateDepartment/{department}', 'updateDepartment'); // /department/departmentUpdate
    Route::put('/destroyDepartment/{department}', 'destroyDepartment'); // /department/depaermentDestroy
});

Route::controller(UserController::class)->prefix('/users')->group(function() {
    Route::get('/loadUsers', 'loadUsers');  // /user/loadUser
    Route::post('/storeUser', 'storeUser'); // /user/storeUser
    Route::put('/updateUser/{user}', 'updateUser');  // /user/updateUser
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
