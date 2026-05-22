<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Venue;

class VenueController extends Controller
{
    public function storeVenue(Request $request)
    {
        $validated = $request->validate([
            'venue' => ['required', 'min:3', 'max:30'],
            'description' => ['nullable']
        ]);

        Venue::create([
            'venue_name' => $validated['venue'],
            'venue_description' => $validated['description'] ?? null
        ]);

        return response()->json([
            'message' => 'Venue Successfully Saved.'
        ], 200);
    }
}
