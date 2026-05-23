<?php

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\DepartmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\VenueController;

// Role Route
Route::controller(RoleController::class)->prefix('/role')->group(function() {
    Route::get('/loadRole', 'loadRoles'); //role/loadRole
    Route::get('/getRole/{role_id}', 'getRole'); // /role/
    Route::post('/storeRole', 'storeRole'); // /role/storeRole
    Route::put('/updateRole/{role}', 'updateRole'); // /role/roleUpdate
    Route::put('/destroyRole/{role}', 'destroyRole'); // /role/roleDestroy
});

// Department Route
Route::controller(DepartmentController::class)->prefix('/department')->group(function() {
    Route::get('/loadDepartment', 'loadDepartments'); // /department/loadDepartments
    Route::get('/getDepartment/{department_id}', 'getDepartment'); //department/
    Route::post('/storeDepartment', 'storeDepartment'); // /department/storeDepartment
    Route::put('/updateDepartment/{department}', 'updateDepartment'); // /department/departmentUpdate
    Route::put('/destroyDepartment/{department}', 'destroyDepartment'); // /department/depaermentDestroy
});

// User Route
Route::controller(UserController::class)->prefix('/users')->group(function() {
    Route::get('/loadUsers', 'loadUsers');  // /user/loadUser
    Route::post('/storeUser', 'storeUser'); // /user/storeUser
    Route::put('/updateUser/{user}', 'updateUser');  // /user/updateUser
    Route::put('/destroyUser/{user}', 'destroyUser');  //  /user/destroyUser

// Trash
    Route::get('/loadTrashUsers', 'loadTrashUsers');
    Route::put('/restoreUser/{user}', 'restoreUser');
    Route::delete('/forceDeleteUser/{user}', 'forceDeleteUser');
});

// Venue
Route::controller(VenueController::class)->prefix('/venue')->group(function() {
    Route::get('/loadVenue', 'loadVenue'); 
    Route:: get('/getVenue/{venueId}', 'getVenue');
    Route::post('/storeVenue', 'storeVenue');
    Route::put('/updateVenue/{venue}', 'updateVenue');
    Route::put('/destroyVenue/{venue}', 'destroyVenue');
});

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
