<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function storeDepartment(Request $request){
        $validated = $request->validate([
            'department_name' => ['required', 'min:3', 'max:15'],
            'department_description' => ['nullable', 'string', 'max:255']
        ]);

        Department::create([
            'department_name' => $validated['department_name'],
            'department_description' => $validated['department_description'] ?? null,
        ]);

        return response()->json([
            'message' => 'Department Successfully Saved.'
        ], 200);
    }
}
