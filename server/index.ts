import express from 'express';
import { Player } from '../shared/entities/player';
import { Vector } from '../shared/utils/vector';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 3001);

server.listen(3001, () => {
    console.log('Starting server on port 3001');
});

io.on('connection', (socket: any) => {
    socket.on('disconnect', function() {
        players = players.filter((player: Player) => player.id !== socket.id);
    });
});

setInterval(function() {
    io.sockets.emit('state', Player.serialize(players));
}, 1000 / 60);

let players: Array<Player> = [];

io.on('connection', (socket: any) => {
    socket.on('new player', () => {
        players.push(new Player(socket.id, 300, 300));
    });
    socket.on('movement', (data: any) => {
        const player = players.find(
            (player: Player) => player.id === socket.id
        );
        let x = 0;
        let y = 0;

        if (player) {
            if (data.left) {
                x = -5;
            }
            if (data.up) {
                y = -5;
            }
            if (data.right) {
                x = 5;
            }
            if (data.down) {
                y = 5;
            }
            player.updatePosition(new Vector(x, y));
        }
    });
});
