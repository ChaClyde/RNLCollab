<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function storeRole(Request $request){
        $validated = $request->validate([
            'role_name' => ['required', 'min:3', 'max:15'],
            'role_description' => ['nullable', 'string', 'max:255']
        ]);

        Role::create([
            'role_name' => $validated['role_name'],
            'role_description' => $validated['role_description'] ?? null,
        ]);

        return response()->json([
            'message' => 'Role Successfully Saved.'
        ], 200);
    }
}
