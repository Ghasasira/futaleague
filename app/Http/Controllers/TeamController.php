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
}
