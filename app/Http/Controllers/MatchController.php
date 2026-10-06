<?php

namespace App\Http\Controllers;

use App\Models\FootballMatch;
use App\Models\Team;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchController extends Controller
{
    public function index()
    {
        $matches = FootballMatch::with(['homeTeam', 'awayTeam', 'events'])->orderBy('date', 'desc')->get();
        $teams = Team::all();
        $players = Player::all();

        return Inertia::render('Matches/Index', [
            'matches' => $matches,
            'teams' => $teams,
            'players' => $players,
        ]);
    }

    public function show(FootballMatch $match)
    {
        $match->load(['homeTeam', 'awayTeam', 'events.player']);
        
        return Inertia::render('Matches/Show', [
            'match' => $match,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'home_team_id' => 'required|exists:teams,id',
            'away_team_id' => 'required|exists:teams,id',
            'date' => 'required|date',
            'time' => 'required|string',
            'matchweek' => 'required|integer',
            'season' => 'required|string',
        ]);

        FootballMatch::create($validated + ['status' => 'UPCOMING']);

        return redirect()->back()->with('success', 'Match created.');
    }

    public function update(Request $request, FootballMatch $match)
    {
        $validated = $request->validate([
            'home_score' => 'integer',
            'away_score' => 'integer',
            'status' => 'string',
            'current_minute' => 'integer',
        ]);

        $match->update($validated);

        return redirect()->back()->with('success', 'Match updated.');
    }
}
