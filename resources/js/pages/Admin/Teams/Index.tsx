import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Team } from '@/types/league';
import { ClubCrest } from '@/components/ClubCrest';
import { Shield } from 'lucide-react';

interface Props {
    teams: Team[];
}

export default function TeamsIndex({ teams }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newShortName, setNewShortName] = useState('');
    const [newManager, setNewManager] = useState('');
    const [newStadium, setNewStadium] = useState('');

    const handleCreateTeam = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/admin/teams', {
            name: newName,
            shortName: newShortName,
            manager: newManager,
            stadium: newStadium,
        }, {
            onSuccess: () => {
                setIsAdding(false);
                setNewName('');
                setNewShortName('');
                setNewManager('');
                setNewStadium('');
            }
        });
    };
    return (
        <>
            <Head title="Teams Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Teams Management</h2>
                        <p className="text-xs text-slate-400 mt-1">Manage league clubs, stadiums, and manager details.</p>
                    </div>
                    <button onClick={() => setIsAdding(!isAdding)} className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors">
                        <Shield className="w-4 h-4" />
                        <span>{isAdding ? 'Cancel' : 'Add New Club'}</span>
                    </button>
                </div>

                {/* Add Team Form */}
                {isAdding && (
                    <form onSubmit={handleCreateTeam} className="bg-slate-900/80 p-5 rounded-xl border border-emerald-500/30 space-y-4">
                        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Register New Club
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div>
                                <label className="block text-slate-300 mb-1">Club Name</label>
                                <input required type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Zenith City" className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Short Name (Abbr)</label>
                                <input required type="text" value={newShortName} onChange={(e) => setNewShortName(e.target.value)} placeholder="e.g. ZEN" maxLength={4} className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono uppercase" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Manager</label>
                                <input required type="text" value={newManager} onChange={(e) => setNewManager(e.target.value)} placeholder="e.g. Thomas Tuchel" className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-1">Stadium</label>
                                <input required type="text" value={newStadium} onChange={(e) => setNewStadium(e.target.value)} placeholder="e.g. Zenith Arena" className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white">Cancel</button>
                            <button type="submit" className="px-4 py-1.5 rounded text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300">Register Club</button>
                        </div>
                    </form>
                )}

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teams.map((team) => (
                        <div key={team.id} className="flex flex-col p-5 bg-slate-900/60 rounded-xl border border-slate-800 shadow-sm hover:border-slate-700 transition-colors">
                            <div className="flex items-start gap-4">
                                <ClubCrest team={team} size="md" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{team.name}</h3>
                                    <p className="text-xs text-slate-400">{team.stadium}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
                                <div className="flex flex-col">
                                    <span className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Manager</span>
                                    <span className="text-slate-300 font-medium">{team.manager}</span>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <span className="text-slate-500 uppercase text-[10px] font-bold tracking-wider">Abbr</span>
                                    <span className="text-slate-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">{team.shortName}</span>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-1.5 rounded transition-colors">
                                    Edit Details
                                </button>
                                <button onClick={() => router.get('/admin/players')} className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold py-1.5 rounded border border-emerald-500/20 transition-colors">
                                    View Roster
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

TeamsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Teams Management',
            href: '/admin/teams',
        },
    ],
};
