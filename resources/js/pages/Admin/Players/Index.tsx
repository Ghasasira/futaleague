import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Player, Team, PlayerPosition, InjuryStatus, PlayerStatus } from '@/types/league';
import { ClubCrest } from '@/components/ClubCrest';
import { InjuryBadge } from '@/components/InjuryBadge';
import { Plus, Edit2, Trash2, HeartPulse, AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
    teams: Team[];
    players: Player[];
}

export default function PlayersIndex({ teams, players }: Props) {
    const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');
    const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false);
    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
    const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

    // New Player Form State
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerNumber, setNewPlayerNumber] = useState<number>(10);
    const [newPlayerPos, setNewPlayerPos] = useState<PlayerPosition>('FW');
    const [newPlayerNat, setNewPlayerNat] = useState('England');
    const [newPlayerAge, setNewPlayerAge] = useState<number>(24);
    const [newPlayerValue, setNewPlayerValue] = useState('€35M');
    const [newPlayerInjuryStatus, setNewPlayerInjuryStatus] = useState<InjuryStatus>('fit');
    const [newPlayerInjuryNote, setNewPlayerInjuryNote] = useState('');

    // Active Injury Edit Dialog
    const [injuryDialogPlayer, setInjuryDialogPlayer] = useState<Player | null>(null);

    const selectedTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];
    const teamPlayers = players.filter((p) => p.teamId === selectedTeam?.id);

    const showFeedback = (msg: string) => {
        setFeedbackMsg(msg);
        setTimeout(() => setFeedbackMsg(null), 3500);
    };

    const handleCreatePlayer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPlayerName.trim()) return;

        router.post(`/admin/players`, {
            team_id: selectedTeam.id,
            name: newPlayerName.trim(),
            position: newPlayerPos,
            number: newPlayerNumber,
            nationality: newPlayerNat,
            age: newPlayerAge,
            market_value: newPlayerValue,
            injury_status: newPlayerInjuryStatus,
            injury_note: newPlayerInjuryNote.trim(),
        }, {
            onSuccess: () => {
                setNewPlayerName('');
                setNewPlayerInjuryNote('');
                setNewPlayerInjuryStatus('fit');
                setIsAddingPlayer(false);
                showFeedback(`Player "${newPlayerName}" added to ${selectedTeam.name} roster.`);
            }
        });
    };

    const handleToggleInjury = (player: Player) => {
        const isCurrentlyInjured = player.injuryStatus === 'injured' || player.injuryStatus === 'out' || player.status === 'injured';
        const nextInjuryStatus: InjuryStatus = isCurrentlyInjured ? 'fit' : 'injured';

        router.put(`/admin/players/${player.id}`, {
            name: player.name,
            position: player.position,
            number: player.number,
            status: nextInjuryStatus !== 'fit' ? 'injured' : 'fit',
            injuryStatus: nextInjuryStatus,
            injuryNote: isCurrentlyInjured ? null : (player.injuryNote || 'Muscle strain under medical assessment'),
            injuryReturnDate: isCurrentlyInjured ? null : (player.injuryReturnDate || '7-14 days'),
        }, {
            onSuccess: () => {
                showFeedback(`${player.name} marked as ${nextInjuryStatus === 'fit' ? 'Fit' : 'Injured'}`);
            }
        });
    };

    const handleSaveInjuryDialog = (e: React.FormEvent) => {
        e.preventDefault();
        if (!injuryDialogPlayer) return;

        const form = e.target as HTMLFormElement;
        const statusSelect = form.elements.namedItem('diagInjuryStatus') as HTMLSelectElement;
        const noteInput = form.elements.namedItem('diagInjuryNote') as HTMLInputElement;
        const returnInput = form.elements.namedItem('diagInjuryReturn') as HTMLInputElement;

        const nextInjStatus = statusSelect.value as InjuryStatus;
        const isInj = nextInjStatus !== 'fit';

        router.put(`/admin/players/${injuryDialogPlayer.id}`, {
            name: injuryDialogPlayer.name,
            position: injuryDialogPlayer.position,
            number: injuryDialogPlayer.number,
            status: isInj ? 'injured' : 'fit',
            injuryStatus: nextInjStatus,
            injuryNote: isInj ? noteInput.value.trim() : null,
            injuryReturnDate: isInj ? returnInput.value.trim() : null,
        }, {
            onSuccess: () => {
                setInjuryDialogPlayer(null);
                showFeedback(`Updated medical report for ${injuryDialogPlayer.name}.`);
            }
        });
    };

    return (
        <>
            <Head title="Players Management" />
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
                        <h2 className="text-xl font-bold text-white tracking-tight">Players & Rosters</h2>
                        <p className="text-xs text-slate-400 mt-1">Manage player registrations, assignments, and medical records.</p>
                    </div>
                </div>

                {/* Club Selector Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                        {selectedTeam && <ClubCrest team={selectedTeam} size="sm" />}
                        <div>
                            <span className="text-xs text-slate-400">Selected Club Roster:</span>
                            <select
                                value={selectedTeamId}
                                onChange={(e) => setSelectedTeamId(e.target.value)}
                                className="block mt-0.5 bg-slate-800 border border-slate-700 text-white font-bold text-sm rounded px-3 py-1 focus:outline-none focus:border-emerald-500"
                            >
                                {teams.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name} ({players.filter((p) => p.teamId === t.id).length} players)
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsAddingPlayer(!isAddingPlayer)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{isAddingPlayer ? 'Close Form' : 'Register New Player'}</span>
                    </button>
                </div>

                {/* New Player Form */}
                {isAddingPlayer && selectedTeam && (
                    <form onSubmit={handleCreatePlayer} className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/30 space-y-4">
                        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Register Player to {selectedTeam.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div>
                                <label className="block text-slate-300 mb-1">Full Name *</label>
                                <input required type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="e.g. Marcus Thorne" className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Squad Number</label>
                                <input type="number" min={1} max={99} value={newPlayerNumber} onChange={(e) => setNewPlayerNumber(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Position</label>
                                <select value={newPlayerPos} onChange={(e) => setNewPlayerPos(e.target.value as PlayerPosition)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white">
                                    <option value="GK">Goalkeeper (GK)</option>
                                    <option value="DF">Defender (DF)</option>
                                    <option value="MF">Midfielder (MF)</option>
                                    <option value="FW">Forward (FW)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Nationality</label>
                                <input type="text" value={newPlayerNat} onChange={(e) => setNewPlayerNat(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Age</label>
                                <input type="number" min={16} max={42} value={newPlayerAge} onChange={(e) => setNewPlayerAge(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Market Valuation</label>
                                <input type="text" value={newPlayerValue} onChange={(e) => setNewPlayerValue(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Injury Status</label>
                                <select value={newPlayerInjuryStatus} onChange={(e) => setNewPlayerInjuryStatus(e.target.value as InjuryStatus)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white">
                                    <option value="fit">Fit & Available</option>
                                    <option value="injured">Injured (Out)</option>
                                    <option value="doubtful">Doubtful (Late test)</option>
                                    <option value="out">Ruled Out (Long term)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Injury Diagnosis / Note</label>
                                <input type="text" placeholder="e.g. Hamstring strain" value={newPlayerInjuryNote} onChange={(e) => setNewPlayerInjuryNote(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={() => setIsAddingPlayer(false)} className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white">Cancel</button>
                            <button type="submit" className="px-4 py-1.5 rounded text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300">Save & Register</button>
                        </div>
                    </form>
                )}

                {/* Player Roster Table */}
                <div className="bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden shadow-lg flex-1">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[11px]">
                                <th className="py-3 px-4 w-12 text-center">#</th>
                                <th className="py-3 px-4">Player</th>
                                <th className="py-3 px-4">Position</th>
                                <th className="py-3 px-4 text-center">Goals</th>
                                <th className="py-3 px-4 text-center">Assists</th>
                                <th className="py-3 px-4">Injury Status & Quick Toggle</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {teamPlayers.map((player) => {
                                const isEditing = editingPlayerId === player.id;
                                const isInj = player.injuryStatus === 'injured' || player.injuryStatus === 'out' || player.status === 'injured';
                                const isDoubt = player.injuryStatus === 'doubtful';

                                return (
                                    <tr key={player.id} className="hover:bg-slate-850/50">
                                        <td className="py-3 px-4 font-mono font-bold text-center text-slate-300">
                                            {isEditing ? (
                                                <input type="number" defaultValue={player.number} id={`edit-num-${player.id}`} className="w-12 bg-slate-800 border border-slate-700 rounded px-1 text-center font-mono text-white text-xs" />
                                            ) : player.number}
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-white">
                                            {isEditing ? (
                                                <input type="text" defaultValue={player.name} id={`edit-name-${player.id}`} className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-white text-xs" />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span>{player.name}</span>
                                                    {(isInj || isDoubt) && <InjuryBadge injuryStatus={player.injuryStatus || 'injured'} size="xs" />}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            {isEditing ? (
                                                <select defaultValue={player.position} id={`edit-pos-${player.id}`} className="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-white text-xs">
                                                    <option value="GK">GK</option>
                                                    <option value="DF">DF</option>
                                                    <option value="MF">MF</option>
                                                    <option value="FW">FW</option>
                                                </select>
                                            ) : (
                                                <span className="font-mono uppercase text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded text-[10px]">{player.position}</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono">
                                            {isEditing ? (
                                                <input type="number" defaultValue={player.goals} id={`edit-goals-${player.id}`} className="w-12 bg-slate-800 border border-slate-700 rounded px-1 text-center text-xs" />
                                            ) : player.goals}
                                        </td>
                                        <td className="py-3 px-4 text-center font-mono">
                                            {isEditing ? (
                                                <input type="number" defaultValue={player.assists} id={`edit-assists-${player.id}`} className="w-12 bg-slate-800 border border-slate-700 rounded px-1 text-center text-xs" />
                                            ) : player.assists}
                                        </td>
                                        <td className="py-3 px-4">
                                            {isEditing ? (
                                                <div className="space-y-1">
                                                    <select defaultValue={player.injuryStatus || (player.status === 'injured' ? 'injured' : 'fit')} id={`edit-inj-${player.id}`} className="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-white text-xs w-full">
                                                        <option value="fit">Fit & Available</option>
                                                        <option value="injured">Injured (Out)</option>
                                                        <option value="doubtful">Doubtful (Late test)</option>
                                                        <option value="out">Ruled Out (Long term)</option>
                                                    </select>
                                                    <input type="text" defaultValue={player.injuryNote || ''} placeholder="Diagnosis note..." id={`edit-inj-note-${player.id}`} className="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-white text-[11px] w-full" />
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <button type="button" onClick={() => handleToggleInjury(player)} className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${isInj ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' : isDoubt ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'}`}>
                                                            <HeartPulse className="w-3.5 h-3.5" />
                                                            <span>{isInj ? 'Injured' : isDoubt ? 'Doubtful' : 'Fit'}</span>
                                                        </button>
                                                        <button type="button" onClick={() => setInjuryDialogPlayer(player)} title="Edit injury diagnosis" className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800">
                                                            <Edit2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    {(isInj || isDoubt) && (
                                                        <div className="flex items-center gap-1 text-[11px] text-amber-400/90 font-medium">
                                                            <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                                                            <span className="truncate max-w-[170px]" title={player.injuryNote || 'Medical report active'}>
                                                                {player.injuryNote || 'Under medical assessment'} {player.injuryReturnDate && `(${player.injuryReturnDate})`}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            {isEditing ? (
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button onClick={() => {
                                                        const numEl = document.getElementById(`edit-num-${player.id}`) as HTMLInputElement;
                                                        const nameEl = document.getElementById(`edit-name-${player.id}`) as HTMLInputElement;
                                                        const posEl = document.getElementById(`edit-pos-${player.id}`) as HTMLSelectElement;
                                                        const injEl = document.getElementById(`edit-inj-${player.id}`) as HTMLSelectElement;
                                                        const injNoteEl = document.getElementById(`edit-inj-note-${player.id}`) as HTMLInputElement;

                                                        const nextInjStatus = injEl ? (injEl.value as InjuryStatus) : 'fit';
                                                        
                                                        router.put(`/admin/players/${player.id}`, {
                                                            name: nameEl.value,
                                                            position: posEl.value as PlayerPosition,
                                                            number: Number(numEl.value),
                                                            status: nextInjStatus !== 'fit' ? 'injured' : 'fit',
                                                            injuryStatus: nextInjStatus,
                                                            injuryNote: nextInjStatus !== 'fit' ? injNoteEl.value.trim() : null,
                                                        }, {
                                                            onSuccess: () => {
                                                                setEditingPlayerId(null);
                                                                showFeedback(`Player ${player.name} updated.`);
                                                            }
                                                        });
                                                    }} className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold rounded text-[11px]">Save</button>
                                                    <button onClick={() => setEditingPlayerId(null)} className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-[11px]">Cancel</button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => setEditingPlayerId(player.id)} className="p-1 text-slate-400 hover:text-white" title="Edit Player">
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button onClick={() => {
                                                        if (confirm(`Remove ${player.name} from roster?`)) {
                                                            router.delete(`/admin/players/${player.id}`, {
                                                                onSuccess: () => showFeedback(`Player removed.`)
                                                            });
                                                        }
                                                    }} className="p-1 text-slate-400 hover:text-rose-400" title="Delete Player">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MEDICAL MODAL */}
            {injuryDialogPlayer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                                <HeartPulse className="w-5 h-5 text-rose-400" />
                                <h3 className="text-sm font-bold text-white">Medical Report: {injuryDialogPlayer.name}</h3>
                            </div>
                            <button type="button" onClick={() => setInjuryDialogPlayer(null)} className="text-slate-400 hover:text-white p-1">✕</button>
                        </div>
                        <form onSubmit={handleSaveInjuryDialog} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">Availability / Injury Status</label>
                                <select name="diagInjuryStatus" defaultValue={injuryDialogPlayer.injuryStatus || 'injured'} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white">
                                    <option value="fit">Fit & Match Available</option>
                                    <option value="injured">Injured (Out)</option>
                                    <option value="doubtful">Doubtful (Late Fitness Test)</option>
                                    <option value="out">Ruled Out (Long-term / Surgery)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">Injury Diagnosis Note</label>
                                <input type="text" name="diagInjuryNote" defaultValue={injuryDialogPlayer.injuryNote || ''} placeholder="e.g. Hamstring strain" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 font-semibold mb-1">Expected Return Timeline</label>
                                <input type="text" name="diagInjuryReturn" defaultValue={injuryDialogPlayer.injuryReturnDate || ''} placeholder="e.g. 7-10 days" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono" />
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                                <button type="button" onClick={() => setInjuryDialogPlayer(null)} className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-4 py-1.5 rounded-lg font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300">Save Medical Report</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

PlayersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Players Management',
            href: '/admin/players',
        },
    ],
};
