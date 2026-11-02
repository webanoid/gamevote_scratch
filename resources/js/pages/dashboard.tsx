import { Form, Head, router } from '@inertiajs/react';
import GameController from '@/actions/App/Http/Controllers/GameController';
import GameVoteController from '@/actions/App/Http/Controllers/GameVoteController';
import AddGameForm from '@/components/add-game-form';
import { Button } from '@/components/ui/button';
import type { DailyAllowance, Game } from '@/types';

type Props = {
    games: Game[] | null;
    libraryError: string | null;
    allowance: DailyAllowance;
    timezone: string;
};

export default function Dashboard({ games, libraryError, allowance }: Props) {
    return (
        <>
            <Head title="Game library" />
            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-semibold">Game Library</h1>

                <p className="text-sm text-muted-foreground">
                    {!allowance.enforced
                        ? 'Daily limits are off.'
                        : allowance.available
                            ? 'You have one action today: vote or add a game.'
                            : 'You have used today’s action.'}
                </p>

                <AddGameForm
                    disabled={!allowance.available}
                    limited={allowance.enforced}
                />

                {libraryError !== null || games === null ? (
                    <div className="rounded-xl border border-destructive p-4 text-sm">
                        <p>{libraryError ?? 'The game library could not be loaded.'}</p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => router.reload()}
                        >
                            Try again
                        </Button>
                    </div>
                ) : games.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No games yet. Suggest the first one above.
                    </p>
                ) : (
                    <ol className="divide-y rounded-xl border">
                        {games.map((game, index) => (
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
                                {game.voted ? (
                                    <Form
                                        {...GameVoteController.destroy.form(game.id)}
                                        options={{ preserveScroll: true }}
                                    >
                                        {({ processing }) => (
                                            <Button type="submit" variant="outline" size="sm" disabled={processing}>
                                                Remove vote
                                            </Button>
                                        )}
                                    </Form>
                                ) : (
                                    <Form
                                        {...GameVoteController.store.form(game.id)}
                                        options={{ preserveScroll: true }}
                                    >
                                        {({ processing }) => (
                                            <Button
                                                type="submit"
                                                size="sm"
                                                disabled={!allowance.available || processing}
                                            >
                                                Vote
                                            </Button>
                                        )}
                                    </Form>
                                )}
                                <Form
                                    {...GameController.destroy.form(game.id)}
                                    options={{ preserveScroll: true }}
                                >
                                    {({ processing }) => (
                                        <Button type="submit" variant="ghost" size="sm" disabled={processing}>
                                            Remove
                                        </Button>
                                    )}
                                </Form>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </>
    );
}
