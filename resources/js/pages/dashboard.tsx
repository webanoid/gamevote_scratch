import { Head } from '@inertiajs/react';
import type { Game } from '@/types';

// Sample data until the backend exists (phase 5).
const sampleGames: Game[] = [
    { id: 1, name: 'Catan', votes: 5, voted: false },
    { id: 2, name: 'Codenames', votes: 3, voted: true },
    { id: 3, name: 'Mario Kart 8 Deluxe', votes: 0, voted: false },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Game library" />
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-semibold">Game Library</h1>
                <ol className="divide-y rounded-xl border">
                    {sampleGames.map((game, index) => (
                        <li key={game.id} className="flex items-center gap-3 p-4">
                            <span className="w-6 text-right text-sm text-muted-foreground tabular-nums">
                                {index + 1}
                            </span>
                            <span className="flex-1 truncate font-medium">
                                {game.name}
                            </span>
                            <span className="text-sm tabular-nums">
                                {game.votes} votes
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    );
}
