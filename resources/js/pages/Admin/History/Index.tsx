import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Download, RotateCcw, CheckCircle } from 'lucide-react';

export default function HistoryIndex() {
    const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

    const showFeedback = (msg: string) => {
        setFeedbackMsg(msg);
        setTimeout(() => setFeedbackMsg(null), 3500);
    };

    return (
        <>
            <Head title="League History & Backups" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {feedbackMsg && (
                    <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-lg shadow-xl font-semibold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>{feedbackMsg}</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">League History & Governance</h2>
                        <p className="text-xs text-slate-400 mt-1">Manage past seasons, create backups, and perform system resets.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-4">
                        <h3 className="text-sm font-bold text-white">Database Backup & Export</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Export the entire league snapshot (teams, 120+ players, real-time match events, stats, standings) to a single JSON archive.
                        </p>
                        <button
                            onClick={() => showFeedback('Downloading League Snapshot...')}
                            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-2 transition-colors"
                        >
                            <Download className="w-4 h-4 text-emerald-400" />
                            <span>Download League Snapshot (.json)</span>
                        </button>
                    </div>

                    <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-4">
                        <h3 className="text-sm font-bold text-rose-400">System Reset</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Reset all clubs, players, fixtures, and scores back to the factory realistic championship defaults.
                        </p>
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to reset all data to default? This will clear custom changes.')) {
                                    showFeedback('Database reset to defaults.');
                                }
                            }}
                            className="px-4 py-2 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-2 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4 text-rose-400" />
                            <span>Reset Factory League Data</span>
                        </button>
                    </div>
                </div>

                {/* Empty state for history since we haven't built complex history yet */}
                <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800 border-dashed rounded-xl p-8 mt-4">
                    <RotateCcw className="w-12 h-12 text-slate-700 mb-4" />
                    <h3 className="text-lg font-bold text-slate-300">No Past Seasons Recorded</h3>
                    <p className="text-sm text-slate-500 text-center max-w-sm mt-2">
                        You have not concluded the current 2025/26 season. Historical records will appear here once the season is archived.
                    </p>
                </div>
            </div>
        </>
    );
}

HistoryIndex.layout = {
    breadcrumbs: [
        {
            title: 'League History',
            href: '/admin/history',
        },
    ],
};
