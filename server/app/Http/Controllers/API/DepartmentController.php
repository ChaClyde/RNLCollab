<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function loadDepartments() {
        $departments = Department::where('tbl_departments.is_deleted', false)
            ->get();

            return response()->json([
                'departments' => $departments
            ], 200);
    }

    public function storeDepartment(Request $request){
        $validated = $request->validate([
            'department_name' => ['required', 'min:3', 'max:30'],
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

    public function getDepartment($department_id)
    {
        $department_name = Department::find($department_id);

        return response()->json([
            'department_name' => $department_id
        ], 200);
    }
}
