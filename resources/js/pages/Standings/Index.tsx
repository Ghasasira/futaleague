import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { LeagueTable } from '@/components/LeagueTable';
import { LeagueStanding, Team } from '@/types/league';

interface Props {
    standings: LeagueStanding[];
    teams: Team[];
}

export default function Index({ standings, teams }: Props) {
    return (
        <WebsiteLayout title="League Standings">
            <Head title="Standings" />
            
            <div className="max-w-6xl mx-auto space-y-8">
                <LeagueTable 
                    standings={standings}
                    teams={teams}
                    onSelectTeam={(tId) => {
                        window.location.href = '/teams/' + tId;
                    }}
                />
            </div>
        </WebsiteLayout>
    );
}
