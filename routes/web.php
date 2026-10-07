<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\StandingController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('matches.index');
})->name('home');

// Public Website Routes
Route::get('/matches', [MatchController::class, 'index'])->name('matches.index');
Route::get('/matches/{match}', [MatchController::class, 'show'])->name('matches.show');
Route::get('/teams', [TeamController::class, 'index'])->name('teams.index');
Route::get('/teams/{team}', [TeamController::class, 'show'])->name('teams.show');
Route::get('/players', [PlayerController::class, 'index'])->name('players.index');
Route::get('/players/{player}', [PlayerController::class, 'show'])->name('players.show');
Route::get('/compare', [PlayerController::class, 'compare'])->name('players.compare');
Route::get('/standings', [StandingController::class, 'index'])->name('standings.index');
Route::get('/history', function () { return Inertia::render('History/Index'); })->name('history.index');
Route::get('/calendar', function () { return Inertia::render('Events/Index'); })->name('events.index');

// CMS / Admin Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    Route::get('/admin/teams', [AdminController::class, 'teams'])->name('admin.teams.index');
    Route::post('/admin/teams', [TeamController::class, 'store'])->name('admin.teams.store');
    
    Route::get('/admin/players', [AdminController::class, 'players'])->name('admin.players.index');
    Route::post('/admin/players', [PlayerController::class, 'store'])->name('admin.players.store');
    Route::put('/admin/players/{player}', [PlayerController::class, 'update'])->name('admin.players.update');
    Route::delete('/admin/players/{player}', [PlayerController::class, 'destroy'])->name('admin.players.destroy');
    
    Route::get('/admin/matches', [AdminController::class, 'matches'])->name('admin.matches.index');
    Route::get('/admin/matches/{match}', [AdminController::class, 'manageMatch'])->name('admin.matches.show');
    Route::post('/admin/matches', [MatchController::class, 'store'])->name('admin.matches.store');
    Route::put('/admin/matches/{match}', [MatchController::class, 'update'])->name('admin.matches.update');
    
    Route::get('/admin/events', [AdminController::class, 'events'])->name('admin.events.index');
    Route::post('/admin/events', [AdminController::class, 'storeEvent'])->name('admin.events.store');
    
    Route::get('/admin/history', [AdminController::class, 'history'])->name('admin.history.index');
});

require __DIR__.'/settings.php';
