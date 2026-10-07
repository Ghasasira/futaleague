import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Match, Team, Player, MatchStatus } from '@/types/league';
import { Plus, CheckCircle, Sliders, Award } from 'lucide-react';

interface Props {
    teams: Team[];
    matches: Match[];
    players?: Player[]; // Passed if available, else we fetch or omit MVP feature
}

export default function MatchesIndex({ teams, matches, players = [] }: Props) {
    const [isAddingMatch, setIsAddingMatch] = useState<boolean>(false);
    const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

    // New Match Form State
    const [newMatchHome, setNewMatchHome] = useState(teams[0]?.id || '');
    const [newMatchAway, setNewMatchAway] = useState(teams[1]?.id || '');
    const [newMatchDate, setNewMatchDate] = useState('2026-10-18');
    const [newMatchTime, setNewMatchTime] = useState('15:00');
    const [newMatchWeek, setNewMatchWeek] = useState(27);
    const [newMatchVenue, setNewMatchVenue] = useState('Zenith Arena');

    const showFeedback = (msg: string) => {
        setFeedbackMsg(msg);
        setTimeout(() => setFeedbackMsg(null), 3500);
    };

    const handleCreateMatch = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMatchHome === newMatchAway) {
            alert('Home and Away teams must be different.');
            return;
        }

        const home = teams.find((t) => t.id === newMatchHome);

        router.post(`/admin/matches`, {
            home_team_id: newMatchHome,
            away_team_id: newMatchAway,
            date: newMatchDate,
            time: newMatchTime,
            matchweek: newMatchWeek,
            season: '2025/26',
            venue: newMatchVenue || home?.stadium || 'Arena'
        }, {
            onSuccess: () => {
                setIsAddingMatch(false);
                showFeedback(`Match scheduled between ${home?.shortName} and ${teams.find(t=>t.id===newMatchAway)?.shortName}.`);
            }
        });
    };

    const handleUpdateStatus = (m: Match, nextSt: MatchStatus) => {
        router.put(`/admin/matches/${m.id}`, {
            home_score: m.homeScore,
            away_score: m.awayScore,
            status: nextSt,
            current_minute: nextSt === 'FINISHED' ? 90 : m.currentMinute,
        }, {
            onSuccess: () => {
                showFeedback(`Match status updated to ${nextSt}.`);
            }
        });
    };

    return (
        <>
            <Head title="Matches Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Toast Feedback */}
                {feedbackMsg && (
                    <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-lg shadow-xl font-semibold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>{feedbackMsg}</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Fixtures & Matches</h2>
                        <p className="text-xs text-slate-400 mt-1">Manage league fixtures, schedules, live scores, and match statuses.</p>
                    </div>
                </div>

                {/* Match Actions */}
                <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <div>
                        <h3 className="text-sm font-bold text-white">League Match Schedule</h3>
                        <span className="text-xs text-slate-400">{matches.length} total fixtures registered</span>
                    </div>
                    <button
                        onClick={() => setIsAddingMatch(!isAddingMatch)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isAddingMatch ? 'Cancel' : 'Schedule Fixture'}</span>
                    </button>
                </div>

                {/* New Match Form */}
                {isAddingMatch && (
                    <form onSubmit={handleCreateMatch} className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/30 space-y-4">
                        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Schedule New Match
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div>
                                <label className="block text-slate-300 mb-1">Home Team</label>
                                <select value={newMatchHome} onChange={(e) => setNewMatchHome(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white">
                                    {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Away Team</label>
                                <select value={newMatchAway} onChange={(e) => setNewMatchAway(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white">
                                    {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Matchweek</label>
                                <input type="number" min={1} max={38} value={newMatchWeek} onChange={(e) => setNewMatchWeek(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Date</label>
                                <input type="date" value={newMatchDate} onChange={(e) => setNewMatchDate(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={() => setIsAddingMatch(false)} className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white">Cancel</button>
                            <button type="submit" className="px-4 py-1.5 rounded text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300">Confirm & Schedule</button>
                        </div>
                    </form>
                )}

                {/* Matches List */}
                <div className="space-y-3">
                    {matches.map((m) => {
                        const home = teams.find((t) => t.id === m.homeTeamId);
                        const away = teams.find((t) => t.id === m.awayTeamId);
                        const isFinished = m.status === 'FINISHED';

                        return (
                            <div key={m.id} className="flex flex-col p-4 rounded-xl bg-slate-900/60 border border-slate-800 gap-3 shadow-md">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="font-mono bg-slate-950 px-2 py-1 rounded text-slate-300">MW {m.matchweek}</span>
                                        <span className="text-slate-400">{m.date}</span>
                                        <span aria-hidden="true" className="text-slate-600">·</span>
                                        <span className="text-slate-400">{m.venue}</span>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs font-bold">
                                        <span className="text-white">{home?.name}</span>
                                        <span className="font-mono bg-slate-950 px-3 py-1 rounded border border-slate-800 text-sm">
                                            {m.status === 'UPCOMING' ? m.time : `${m.homeScore} - ${m.awayScore}`}
                                        </span>
                                        <span className="text-white">{away?.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <select
                                            value={m.status}
                                            onChange={(e) => handleUpdateStatus(m, e.target.value as MatchStatus)}
                                            className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                                        >
                                            <option value="UPCOMING">Upcoming</option>
                                            <option value="LIVE">Live</option>
                                            <option value="FINISHED">Completed (FT)</option>
                                        </select>
                                        <button onClick={() => router.get(`/admin/matches/${m.id}`)} className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-slate-300">
                                            Manage
                                        </button>
                                    </div>
                                </div>
                                {isFinished && (
                                    <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
                                                <Award className="w-4 h-4 text-amber-400" />
                                                <span>Match Completed</span>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

MatchesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Matches & Lineups',
            href: '/admin/matches',
        },
    ],
};
