import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { HistoricalSeasonsView } from '@/components/HistoricalSeasonsView';
import { Team } from '@/types/league';
import { EmptyState } from '@/components/EmptyState';
import { History } from 'lucide-react';

interface Props {
    teams?: Team[];
    seasons?: any[];
}

export default function Index({ teams = [], seasons = [] }: Props) {
    return (
        <WebsiteLayout title="League History">
            <Head title="League History" />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
                {seasons && seasons.length > 0 ? (
                    <HistoricalSeasonsView teams={teams} />
                ) : (
                    <EmptyState 
                        title="No History Available" 
                        description="Historical data for previous seasons has not been compiled or published yet."
                        icon={History}
                    />
                )}
            </div>
        </WebsiteLayout>
    );
}
