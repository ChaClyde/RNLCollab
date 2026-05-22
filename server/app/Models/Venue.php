<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Venue extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'tbl_venues';

    protected $primaryKey = 'venue_id';

    protected $fillable = [
        'venue_name',
        'venue_description',
        'is_deleted'
    ];
}
