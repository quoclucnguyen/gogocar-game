import Phaser from 'phaser';
import { DEBUG_CONFIG } from './Constants';

/**
 * Helper class for debugging
 */
export class DebugHelper {
  /**
   * Create debug text display
   */
  static createDebugText(scene: Phaser.Scene, x: number, y: number, text: string): Phaser.GameObjects.Text {
    const debugText = scene.add.text(x, y, text, {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#ffff00',
      backgroundColor: '#000000',
      padding: { x: 5, y: 5 }
    });
    
    debugText.setScrollFactor(0);
    return debugText;
  }

  /**
   * Create car position text display
   */
  static createCarPositionText(scene: Phaser.Scene, x: number, y: number): Phaser.GameObjects.Text {
    const positionText = scene.add.text(x, y, 'Car position: (0, 0)', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 5, y: 5 }
    });
    
    positionText.setScrollFactor(0);
    return positionText;
  }

  /**
   * Update car position text
   */
  static updateCarPositionText(
    text: Phaser.GameObjects.Text, 
    car: Phaser.Physics.Arcade.Sprite,
    camera: Phaser.Cameras.Scene2D.Camera
  ): void {
    const x = Math.round(car.x);
    const y = Math.round(car.y);
    text.setText(`Car position: (${x}, ${y})`);

    // Change text color if car is outside camera view
    const isCarVisible = camera.worldView.contains(car.x, car.y);
    text.setColor(isCarVisible ? '#ffffff' : '#ff0000');
  }

  /**
   * Visualize path points
   */
  static visualizePath(
    scene: Phaser.Scene, 
    pathPoints: Phaser.Math.Vector2[]
  ): Phaser.GameObjects.Graphics {
    const pathGraphics = scene.add.graphics();
    pathGraphics.lineStyle(2, DEBUG_CONFIG.PATH_LINE_COLOR, DEBUG_CONFIG.PATH_LINE_ALPHA);

    // Draw lines connecting the path points
    for (let i = 0; i < pathPoints.length; i++) {
      const current = pathPoints[i];
      const next = pathPoints[(i + 1) % pathPoints.length];

      pathGraphics.lineBetween(current.x, current.y, next.x, next.y);

      // Draw a small circle at each point
      pathGraphics.fillStyle(DEBUG_CONFIG.PATH_POINT_COLOR, DEBUG_CONFIG.PATH_POINT_ALPHA);
      pathGraphics.fillCircle(current.x, current.y, DEBUG_CONFIG.PATH_POINT_SIZE);
    }

    return pathGraphics;
  }

  /**
   * Log car scale information
   */
  static logCarScaleInfo(
    originalWidth: number, 
    originalHeight: number, 
    trackWidth: number, 
    idealCarWidth: number, 
    scaleX: number, 
    displayWidth: number
  ): void {
    console.log(`Car original dimensions: ${originalWidth}x${originalHeight}px`);
    console.log(`Track width: ${trackWidth}px`);
    console.log(`Ideal car width: ${idealCarWidth}px`);
    console.log(`Applied car scale: ${scaleX}`);
    console.log(`Car display width: ${displayWidth}px`);
  }
}
