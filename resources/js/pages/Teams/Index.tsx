import React from 'react';
import { Head, Link } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { ClubCrest } from '@/components/ClubCrest';
import { Team } from '@/types/league';
import { EmptyState } from '@/components/EmptyState';
import { Shield } from 'lucide-react';

interface Props {
    teams: Team[];
}

export default function Index({ teams = [] }: Props) {
    return (
        <WebsiteLayout title="Clubs Directory">
            <Head title="Clubs" />
            
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Apex League Clubs Directory
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 mb-6">
                    Select any club to view their dedicated profile, squad roster, games played, and match statistics.
                  </p>
                  
                  {teams && teams.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {teams.map((team) => (
                              <Link 
                                key={team.id} 
                                href={'/teams/' + team.id}
                                className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800 transition-colors"
                              >
                                  <ClubCrest team={team} size="lg" />
                                  <h3 className="mt-4 font-semibold text-white">{team.name}</h3>
                                  <span className="text-xs font-mono text-slate-500 mt-1">{team.code}</span>
                              </Link>
                          ))}
                      </div>
                  ) : (
                      <EmptyState 
                          title="No Clubs Available" 
                          description="There are currently no clubs registered in the league database." 
                          icon={Shield} 
                      />
                  )}
                </div>
            </div>
        </WebsiteLayout>
    );
}
