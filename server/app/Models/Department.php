<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Department extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'tbl_departments';
    protected $primaryKey = 'department_id';
    protected $fillable = [
        'department_name',
        'department_description',
        'status',
        'is_deleted',
    ];
}
