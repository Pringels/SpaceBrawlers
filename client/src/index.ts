import io from 'socket.io-client';
import { SerializedPlayer } from '../../shared/entities/player';
import { Vector } from '../../shared/utils/vector';

let app = document.querySelector('#app');

var socket = io('localhost:3001');
socket.on('message', function(data: any) {
    console.log(data);
});

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};

socket.emit('new player');

const emitMovement = () => {
    socket.emit('movement', movement);
    window.requestAnimationFrame(emitMovement);
};

emitMovement();

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = (<any>canvas).getContext('2d');

let idleTimeStamp = 0;

const draw = (players: Array<SerializedPlayer>, i: number) => {
    if (i === idleTimeStamp) {
        return;
    }
    idleTimeStamp = i;
    console.log('drawing', i);
    ctx.clearRect(0, 0, 800, 600);
    players.forEach((player: SerializedPlayer) => {
        const { pos: { x, y }, color } = player;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x - 10, y - 10, 20, 20);
        ctx.fill();
        ctx.closePath();
    });
};

socket.on('state', (players: Array<SerializedPlayer>) =>
    window.requestAnimationFrame(i => draw(players, i))
);
