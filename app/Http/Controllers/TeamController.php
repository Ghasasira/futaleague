<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::all();

        return Inertia::render('Teams/Index', [
            'teams' => $teams,
        ]);
    }

    public function show(Team $team)
    {
        $team->load(['players', 'trophies', 'homeMatches', 'awayMatches']);

        return Inertia::render('Teams/Show', [
            'team' => $team,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'shortName' => 'required|string|max:4',
            'manager' => 'required|string',
            'stadium' => 'required|string',
        ]);

        Team::create([
            'name' => $validated['name'],
            'short_name' => strtoupper($validated['shortName']),
            'code' => strtoupper(substr($validated['shortName'], 0, 3)),
            'manager' => $validated['manager'],
            'stadium' => $validated['stadium'],
        ]);

        return redirect()->back()->with('success', 'Club created successfully.');
    }
}
