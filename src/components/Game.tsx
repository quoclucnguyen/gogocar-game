import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameScene } from '../game';

const Game: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 }, // No gravity for a racing game
          debug: false
        },
      },
      scene: [GameScene],
      parent: 'phaser-game',
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return <div id="phaser-game" />;
};

export default Game;
