import Phaser from 'phaser';
import { TRACK_CONFIG } from '../utils/Constants';

/**
 * Class responsible for decorating the racing track
 */
export class TrackDecorator {
  private scene: Phaser.Scene;
  private readonly centerX: number = TRACK_CONFIG.CENTER_X;
  private readonly centerY: number = TRACK_CONFIG.CENTER_Y;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Add grass texture to the background
   */
  addGrassTexture(): void {
    // Add some random small circles to represent grass texture
    const grass = this.scene.add.graphics();
    grass.fillStyle(0x3a7d19, 0.5); // Darker grass patches

    // Add more grass patches for a richer texture
    for (let i = 0; i < 200; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      const size = Phaser.Math.Between(5, 15);
      grass.fillCircle(x, y, size);
    }

    // Add some lighter grass patches
    grass.fillStyle(0x5cb82d, 0.3); // Lighter green

    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      const size = Phaser.Math.Between(3, 10);
      grass.fillCircle(x, y, size);
    }
  }

  /**
   * Add decorative elements to the track
   */
  addTrackDecorations(): void {
    this.addTrees();
    this.addBushes();
    this.addRocks();
  }

  /**
   * Add details to the track (start line, barriers, etc.)
   */
  addTrackDetails(roadDimensions: { width: number, height: number }): void {
    const { width: roadWidth, height: roadHeight } = roadDimensions;
    const distY = roadHeight / 2;
    const distX = roadWidth * 0.7;

    this.addCheckeredPattern(distY);
    this.addStartIndicator(distY);
    this.addBarriers(distX);
    this.addTireBarriers(distX);
    this.addCones(roadWidth, roadHeight);
  }

  /**
   * Add checkered pattern near start/finish line
   */
  private addCheckeredPattern(distY: number): void {
    const checkerPattern = this.scene.add.graphics();
    checkerPattern.fillStyle(0x000000, 1);

    // Create a small checkered pattern
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 2; j++) {
        if ((i + j) % 2 === 0) {
          checkerPattern.fillRect(this.centerX - 15 + (i * 5), this.centerY - distY - 5 + (j * 5), 5, 5);
        }
      }
    }
  }

  /**
   * Add starting position indicator and text
   */
  private addStartIndicator(distY: number): void {
    // Add a starting position indicator
    const startPosition = this.scene.add.graphics();
    startPosition.fillStyle(0xffff00, 1); // Yellow
    startPosition.fillCircle(this.centerX, this.centerY - distY + 10, 3);

    // Add START text
    this.scene.add.text(this.centerX - 20, this.centerY - distY + 15, 'START', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 3, y: 3 }
    }).setOrigin(0, 0);
  }

  /**
   * Add barriers to the track
   */
  private addBarriers(distX: number): void {
    const barriers = this.scene.add.graphics();
    barriers.fillStyle(0xff0000, 1); // Red and white barriers

    // Add curbs at key points around the track
    // Right curve barriers
    this.addCurbSection(barriers, this.centerX + distX, this.centerY - 30, this.centerX + distX, this.centerY + 30, 6);

    // Left curve barriers
    this.addCurbSection(barriers, this.centerX - distX, this.centerY - 30, this.centerX - distX, this.centerY + 30, 6);
  }

  /**
   * Add tire barriers at sharp turns
   */
  private addTireBarriers(distX: number): void {
    const tireBarriers = this.scene.add.graphics();
    tireBarriers.fillStyle(0x000000, 1); // Black tires

    // Right turn tire stack
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        tireBarriers.fillCircle(this.centerX + distX + 10 + (i * 5), this.centerY + (j * 5), 3);
      }
    }

    // Left turn tire stack
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        tireBarriers.fillCircle(this.centerX - distX - 10 - (i * 5), this.centerY + (j * 5), 3);
      }
    }
  }

  /**
   * Add cones around the track
   */
  private addCones(roadWidth: number, roadHeight: number): void {
    const cones = this.scene.add.graphics();
    cones.fillStyle(0xff6600, 1); // Orange cones

    // Place cones around the outer edge of the track
    const radiusX = roadWidth * 1.2;
    const radiusY = roadHeight * 1.2;

    for (let angle = 0; angle < 360; angle += 45) {
      const radian = Phaser.Math.DegToRad(angle);
      const x = this.centerX + Math.cos(radian) * radiusX;
      const y = this.centerY + Math.sin(radian) * radiusY;

      cones.fillTriangle(
        x, y - 5,
        x - 3, y + 2,
        x + 3, y + 2
      );
    }
  }

  /**
   * Add trees around the track
   */
  private addTrees(): void {
    const decorations = this.scene.add.graphics();
    decorations.fillStyle(0x663300, 1); // Brown for trunks

    // Add trees around the track
    for (let i = 0; i < 15; i++) {
      const angle = i * Math.PI * 2 / 15;
      const x = this.centerX + Math.cos(angle) * 350;
      const y = this.centerY + Math.sin(angle) * 300;

      // Tree trunk
      decorations.fillRect(x - 6, y - 12, 12, 24);

      // Tree top
      decorations.fillStyle(0x005500, 1); // Dark green
      decorations.fillTriangle(x - 25, y - 12, x + 25, y - 12, x, y - 60);
      decorations.fillStyle(0x663300, 1); // Reset to brown for next trunk
    }
  }

  /**
   * Add bushes around the track
   */
  private addBushes(): void {
    const bushes = this.scene.add.graphics();
    bushes.fillStyle(0x228B22, 1); // Forest green

    // Add bushes around the inner part of the track
    for (let i = 0; i < 20; i++) {
      const angle = i * Math.PI * 2 / 20;
      const x = this.centerX + Math.cos(angle) * 120;
      const y = this.centerY + Math.sin(angle) * 90;

      // Draw a bush (circle)
      bushes.fillCircle(x, y, 12);
    }
  }

  /**
   * Add rocks around the track
   */
  private addRocks(): void {
    const rocks = this.scene.add.graphics();
    rocks.fillStyle(0x808080, 1); // Gray

    // Add rocks at specific locations
    const rockPositions = [
      { x: this.centerX + 240, y: this.centerY + 180 },
      { x: this.centerX - 240, y: this.centerY + 180 },
      { x: this.centerX + 220, y: this.centerY - 220 },
      { x: this.centerX - 220, y: this.centerY - 220 }
    ];

    rockPositions.forEach(pos => {
      // Draw a rock (irregular polygon)
      rocks.fillCircle(pos.x, pos.y, 18);
      rocks.fillCircle(pos.x + 12, pos.y + 6, 12);
      rocks.fillCircle(pos.x - 10, pos.y + 10, 15);
    });
  }

  /**
   * Add curb section to the track
   */
  addCurbSection(
    graphics: Phaser.GameObjects.Graphics, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number, 
    segments: number
  ): void {
    // Calculate the step size for each segment
    const stepX = (x2 - x1) / segments;
    const stepY = (y2 - y1) / segments;

    // Draw alternating red and white curb segments
    for (let i = 0; i < segments; i++) {
      if (i % 2 === 0) {
        graphics.fillStyle(0xff0000, 1); // Red
      } else {
        graphics.fillStyle(0xffffff, 1); // White
      }

      graphics.fillRect(
        x1 + (stepX * i),
        y1 + (stepY * i),
        15, 15
      );
    }
  }
}
