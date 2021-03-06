Utility.Game.addState('connecting', {

    onready: function (game) {
        
        var ws = getWebSocket({
            onmessage: function (msg) {
                console.log(msg);
            }
        });

        ws.onmessage = function (msg) {
            var data;

            try {
                data = JSON.parse(msg.data);
            } catch (ex) {
                console.error(ex);
                return;
            }

            if (!data.hasOwnProperty('c')) {
                return 0;
            }

            console.log(data);

            switch (data.c) {
                case 'start':
                    game.states.get('game').onplayerconnect(ws, data);
                    game.setState('game');
                    break;
            }
        };
    },

    update: function () {

    },

    render: function (canvas) {
        canvas.drawText('Waiting for other player...', new Utility.Vector2(100));
    }
});