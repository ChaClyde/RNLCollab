<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Validation\Rule;

class EventController extends Controller
{
    public function loadEvent()
    {
        $events = Event::with(['user', 'venue', 'department'])
            ->where('is_deleted', false)
            ->get();

        return response()->json([
            'events' => $events
        ], 200);
    }

    public function storeEvent(Request $request) {
        $validated = $request->validate ([
            'activity_title' => ['required', 'max:55'],
            'activity_description' => ['nullable', 'max:55'],
            'date' => ['required', 'date'],
            'number_of_days' => ['required', 'integer', 'min:1'],
            'time_end' => ['required', 'date_format:H:i'],
            'time_start' => ['required', 'date_format:H:i'],
            'requested_by' => ['required', 'min:6', 'max:55'],
            'telephone_number' => ['nullable', 'max:55'],
            'email' => ['required', 'email'],
            'user_id' => ['required'],
            'venue_id' => ['required'],
            'department_id' => ['required']
        ]);

        // $start = strtotime($validated['time_start']);
        // $end = strtotime($validated['time_end']);

        Event::create([
            'activity_title' => $validated['activity_title'],
            'activity_description' => $validated['activity_description'] ?? null,
            'date' => $validated['date'],
            'number_of_days' => $validated['number_of_days'],
            'time_start' => $validated['time_start'],
            'time_end' => $validated['time_end'],
            'requested_by' => $validated['requested_by'],
            'telephone_number' => $validated['telephone_number'] ?? null,
            'email' => $validated['email'],
            'user_id' => $validated['user_id'],
            'venue_id' => $validated['venue_id'],
            'department_id' => $validated['department_id']
        ]);

        return response()->json([
            'message' => 'Event Successfully Saved.'
        ], 200);
    }

    public function updateEvent(Request $request, Event $event)
    {
        $validated = $request->validate([
            'activity_title' => ['required', 'max:55'],
            'activity_description' => ['nullable', 'max:255'],
            'date' => ['required', 'date'],
            'number_of_days' => ['required', 'integer', 'min:1'],
            'time_start' => ['required'],
            'time_end' => ['required'],
            'requested_by' => ['required', 'min:6', 'max:55'],
            'telephone_number' => ['nullable', 'max:20'],
            'email' => ['required', 'email'],
            'user_id' => ['required'],
            'venue_id' => ['required'],
            'department_id' => ['required']
        ]);

        $event->update([
            'activity_title' => $validated['activity_title'],
            'activity_description' => $validated['activity_description'] ?? null,
            'date' => $validated['date'],
            'number_of_days' => $validated['number_of_days'],
            'time_start' => $validated['time_start'],
            'time_end' => $validated['time_end'],
            'requested_by' => $validated['requested_by'],
            'telephone_number' => $validated['telephone_number'] ?? null,
            'email' => $validated['email'],
            'user_id' => $validated['user_id'],
            'venue_id' => $validated['venue_id'],
            'department_id' => $validated['department_id']
        ]);

        return response()->json([
            'message' => 'Event Successfully Updated.',
            'event' => $event
        ], 200);
    }

    public function destroyEvent(Event $event)
    {
        $event->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Event Successfully Deleted.'
        ], 200);
    }

    public function loadTrashEvent()
    {
        $events = Event::with([
            'user',
            'venue',
            'department'
        ])
        ->where('is_deleted', true)
        ->get();

        return response()->json([
            'events' => $events
        ]);
    }

    public function restoreEvent(Event $event)
    {
        $event->update([
            'is_deleted' => false
        ]);

        return response()->json([
            'message' => 'Event restored successfully.'
        ]);
    }

    public function forceDeleteEvent($event_id)
    {
        $event = Event::where('event_id', $event_id)->first();

        if (!$event) {
            return response()->json([
                'message' => 'Event not found.'
            ], 404);
        }

        $event->delete();

        return response()->json([
            'message' => 'Event permanently deleted.'
        ], 200);
    }
}
