import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bell, Sliders } from 'lucide-react';

interface WebsiteLayoutProps {
    title?: string;
    children: React.ReactNode;
}

export default function WebsiteLayout({ title, children }: WebsiteLayoutProps) {
    const { url } = usePage();
    const unreadNotifCount = 0; // Example placeholder

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            {title && <Head title={title} />}
            
            <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
                {/* Brand */}
                <Link
                    href="/"
                    className="text-lg md:text-xl font-extrabold tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-2 text-left"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                    <span>Apex League</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-xs md:text-sm font-medium text-slate-400">
                    <Link
                        href="/matches"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url.startsWith('/matches') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        Matches
                    </Link>
                    <Link
                        href="/standings"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url.startsWith('/standings') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        Standings
                    </Link>
                    <Link
                        href="/teams"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url.startsWith('/teams') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        Clubs
                    </Link>
                    <Link
                        href="/players"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url === '/players' || url.startsWith('/players/') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        Rankings
                    </Link>
                    <Link
                        href="/compare"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url.startsWith('/compare') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        Compare
                    </Link>
                    <Link
                        href="/history"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url.startsWith('/history') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        History
                    </Link>
                    <Link
                        href="/calendar"
                        className={`hover:text-white transition-colors pb-0.5 ${
                            url.startsWith('/calendar') ? 'text-white border-b-2 border-emerald-400 font-semibold' : ''
                        }`}
                    >
                        Events
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2.5">
                    <button
                        className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        title="Notification Center & Email Alerts"
                    >
                        <Bell className="w-4 h-4" />
                        {unreadNotifCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center font-mono animate-pulse">
                                {unreadNotifCount}
                            </span>
                        )}
                    </button>

                    <Link
                        href="/dashboard"
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            url.startsWith('/dashboard')
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                : 'bg-slate-900 text-slate-200 border-slate-700 hover:bg-slate-800'
                        }`}
                    >
                        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">CMS Login</span>
                        <span className="sm:hidden">Login</span>
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
}
