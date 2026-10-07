import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Match, Team, Player } from '@/types/league';
import { ClubCrest } from '@/components/ClubCrest';
import { Shield, Activity, Users, MapPin, Wind } from 'lucide-react';

interface Props {
    match: Match;
    teams: Team[];
    players: Player[];
}

export default function MatchManage({ match, teams, players }: Props) {
    const homeTeam = teams.find(t => t.id === match.homeTeamId);
    const awayTeam = teams.find(t => t.id === match.awayTeamId);

    const [homeScore, setHomeScore] = useState(match.homeScore || 0);
    const [awayScore, setAwayScore] = useState(match.awayScore || 0);
    const [status, setStatus] = useState(match.status || 'UPCOMING');
    const [currentMinute, setCurrentMinute] = useState(match.currentMinute || 0);
    
    const [venue, setVenue] = useState(match.venue || homeTeam?.stadium || '');
    const [attendance, setAttendance] = useState(match.attendance || '');
    const [referee, setReferee] = useState(match.referee || '');
    const [weather, setWeather] = useState(match.weather || '');

    const homePlayers = players.filter(p => p.teamId === match.homeTeamId);
    const awayPlayers = players.filter(p => p.teamId === match.awayTeamId);

    const handleUpdateMatch = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/matches/${match.id}`, {
            home_score: homeScore,
            away_score: awayScore,
            status,
            current_minute: currentMinute,
            venue,
            attendance,
            referee,
            weather
        });
    };

    return (
        <>
            <Head title={`Manage Match: ${homeTeam?.shortName} vs ${awayTeam?.shortName}`} />
            
            <div className="flex flex-col gap-6 p-4">
                {/* Header Match Setup */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white tracking-tight">Match Center Control Panel</h2>
                        <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-1 rounded">ID: {match.id.substring(0, 8)}</span>
                    </div>

                    <form onSubmit={handleUpdateMatch} className="space-y-6">
                        {/* Score Board */}
                        <div className="flex items-center justify-center gap-8 bg-slate-950 p-6 rounded-xl border border-slate-800/50">
                            <div className="flex items-center gap-4 text-right">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{homeTeam?.name}</h3>
                                    <p className="text-xs text-slate-400">Home</p>
                                </div>
                                <ClubCrest team={homeTeam!} size="lg" />
                                <input type="number" min="0" value={homeScore} onChange={e => setHomeScore(Number(e.target.value))} className="w-16 h-16 text-center text-3xl font-bold bg-slate-900 border border-slate-700 text-white rounded-xl focus:border-emerald-500" />
                            </div>

                            <div className="flex flex-col items-center px-4">
                                <span className="text-xs font-bold text-slate-500 mb-2">{match.date} {match.time}</span>
                                <select value={status} onChange={e => setStatus(e.target.value as any)} className="bg-slate-800 border border-slate-700 text-xs font-bold text-white rounded px-3 py-1 mb-2 text-center uppercase tracking-wider">
                                    <option value="UPCOMING">Upcoming</option>
                                    <option value="LIVE">Live</option>
                                    <option value="HT">Half Time</option>
                                    <option value="FINISHED">Finished</option>
                                </select>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400">Min</span>
                                    <input type="number" min="0" max="120" value={currentMinute} onChange={e => setCurrentMinute(Number(e.target.value))} className="w-12 bg-slate-800 border border-slate-700 text-xs text-center text-white rounded px-1 py-0.5" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <input type="number" min="0" value={awayScore} onChange={e => setAwayScore(Number(e.target.value))} className="w-16 h-16 text-center text-3xl font-bold bg-slate-900 border border-slate-700 text-white rounded-xl focus:border-emerald-500" />
                                <ClubCrest team={awayTeam!} size="lg" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{awayTeam?.name}</h3>
                                    <p className="text-xs text-slate-400">Away</p>
                                </div>
                            </div>
                        </div>

                        {/* Match Details */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Venue</label>
                                <input type="text" value={venue} onChange={e => setVenue(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-white" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Attendance</label>
                                <input type="number" value={attendance} onChange={e => setAttendance(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-white" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Referee</label>
                                <input type="text" value={referee} onChange={e => setReferee(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-white" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Weather</label>
                                <input type="text" value={weather} onChange={e => setWeather(e.target.value)} placeholder="e.g. Rainy, 15°C" className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-sm text-white" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2 border-t border-slate-800/80">
                            <button type="submit" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                Save General Match Details
                            </button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Lineups Setup */}
                    <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                            <Users className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-lg font-bold text-white">Lineups Management</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Select starting XI and substitutes for both teams.</p>
                        
                        <div className="flex justify-between items-center p-4 bg-slate-800/50 border border-slate-700 border-dashed rounded-xl">
                            <div className="text-center">
                                <ClubCrest team={homeTeam!} size="sm" />
                                <p className="text-xs text-slate-300 mt-2">Home Roster: {homePlayers.length} players</p>
                            </div>
                            <div className="text-center">
                                <ClubCrest team={awayTeam!} size="sm" />
                                <p className="text-xs text-slate-300 mt-2">Away Roster: {awayPlayers.length} players</p>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded transition-colors">
                                Open Lineup Builder
                            </button>
                        </div>
                    </div>

                    {/* Stats Tracking */}
                    <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-lg font-bold text-white">Match Statistics</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">Input live statistics (possession, shots, passes) for the match.</p>
                        
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-white w-1/4 text-center">{match.stats?.possession?.[0] || 50}%</span>
                                <span className="text-slate-400 w-1/2 text-center uppercase tracking-wider">Possession</span>
                                <span className="text-white w-1/4 text-center">{match.stats?.possession?.[1] || 50}%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-white w-1/4 text-center">{match.stats?.shots?.[0] || 0}</span>
                                <span className="text-slate-400 w-1/2 text-center uppercase tracking-wider">Shots</span>
                                <span className="text-white w-1/4 text-center">{match.stats?.shots?.[1] || 0}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-white w-1/4 text-center">{match.stats?.shotsOnTarget?.[0] || 0}</span>
                                <span className="text-slate-400 w-1/2 text-center uppercase tracking-wider">Shots on Target</span>
                                <span className="text-white w-1/4 text-center">{match.stats?.shotsOnTarget?.[1] || 0}</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded transition-colors">
                                Edit Statistics
                            </button>
                        </div>
                    </div>
                </div>

                {/* Match Events Timeline Builder */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-lg font-bold text-white">Events Timeline</h3>
                        </div>
                        <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded transition-colors">
                            + Add Match Event
                        </button>
                    </div>
                    
                    {match.events && match.events.length > 0 ? (
                        <div className="space-y-2">
                            {match.events.map(event => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-emerald-400 font-bold text-sm">{event.minute}'</span>
                                        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{event.type}</span>
                                        <span className="text-sm font-medium text-white">{event.playerName}</span>
                                    </div>
                                    <button className="text-xs text-rose-400 hover:text-rose-300">Remove</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-sm text-slate-500">No events recorded for this match yet.</p>
                            <p className="text-xs text-slate-600 mt-1">Add goals, cards, and substitutions here.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

MatchManage.layout = {
    breadcrumbs: [
        {
            title: 'Matches',
            href: '/admin/matches',
        },
        {
            title: 'Manage Match',
            href: '#',
        },
    ],
};
