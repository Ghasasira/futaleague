<?php

namespace App\Http\Controllers;

use App\Models\FootballMatch;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'teams' => Team::all(),
            'players' => Player::all(),
            'matches' => FootballMatch::orderBy('date', 'desc')->get(),
        ]);
    }

    public function teams()
    {
        return Inertia::render('Admin/Teams/Index', [
            'teams' => Team::all(),
        ]);
    }

    public function players()
    {
        return Inertia::render('Admin/Players/Index', [
            'teams' => Team::all(),
            'players' => Player::with('team')->get(),
        ]);
    }

    public function matches()
    {
        return Inertia::render('Admin/Matches/Index', [
            'teams' => Team::all(),
            'matches' => FootballMatch::orderBy('date', 'desc')->get(),
        ]);
    }

    public function manageMatch(FootballMatch $match)
    {
        $match->load(['homeTeam.players', 'awayTeam.players', 'events.player']);
        
        return Inertia::render('Admin/Matches/Show', [
            'match' => $match,
            'teams' => Team::all(),
            'players' => Player::whereIn('team_id', [$match->home_team_id, $match->away_team_id])->get(),
        ]);
    }

    public function events()
    {
        return Inertia::render('Admin/Events/Index', [
            'events' => \App\Models\LeagueEvent::orderBy('date', 'asc')->get(),
        ]);
    }

    public function storeEvent(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);

        \App\Models\LeagueEvent::create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'location' => $validated['location'],
            'description' => $validated['description'],
        ]);

        return redirect()->back()->with('success', 'Event scheduled successfully.');
    }

    public function history()
    {
        return Inertia::render('Admin/History/Index', [
            'history' => [],
        ]);
    }
}
