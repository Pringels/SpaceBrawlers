import { Vector } from '../utils/vector';

import { getRandomColor } from '../utils/general';

export interface SerializedPlayer {
    pos: {
        x: number;
        y: number;
    };
    color: string;
}

export class Player {
    private position: Vector;
    public color: string;

    constructor(public id: string, x: number, y: number) {
        this.position = new Vector(x, y);
        this.color = getRandomColor();
    }

    getPosition(): Vector {
        return this.position.get();
    }

    updatePosition(v: Vector) {
        this.position.add(v);
    }

    static serialize(players: Array<Player>): Array<SerializedPlayer> {
        return players.map((player: Player): SerializedPlayer => ({
            pos: player.getPosition(),
            color: player.color
        }));
    }
}
