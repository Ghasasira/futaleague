<?php

namespace App\Http\Controllers;

use App\Models\LeagueStanding;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StandingController extends Controller
{
    public function index()
    {
        // Standings might be dynamically calculated or fetched from table
        $standings = LeagueStanding::with('team')->orderBy('points', 'desc')->orderBy('goal_difference', 'desc')->get();
        $teams = Team::all();

        return Inertia::render('Standings/Index', [
            'standings' => $standings,
            'teams' => $teams,
        ]);
    }
}
