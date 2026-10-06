import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Team, Player, Match } from '@/types/league';

interface Props {
    teams: Team[];
    players: Player[];
    matches: Match[];
}

export default function Dashboard({ teams, players, matches }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
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
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
