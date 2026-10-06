import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { AdminDashboard } from '@/Components/AdminDashboard';
import { Team, Player, Match } from '@/types/league';

interface Props {
    teams: Team[];
    players: Player[];
    matches: Match[];
}

export default function Dashboard({ teams, players, matches }: Props) {
    return (
        <AppLayout title="Admin Console">
            <Head title="Admin Console" />
            
            <AdminDashboard 
                teams={teams}
                players={players}
                matches={matches}
                onUpdateMatch={() => {}}
                onAddMatch={() => {}}
                onAddPlayer={() => {}}
                onUpdatePlayer={() => {}}
                onDeletePlayer={() => {}}
                onSendTestEmail={() => {}}
                onResetData={() => {}}
                onExportData={() => {}}
                onImportData={() => {}}
            />
        </AppLayout>
    );
}
