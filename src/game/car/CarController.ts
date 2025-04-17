import Phaser from 'phaser';
import { TRACK_CONFIG, CAR_CONFIG, ASSET_KEYS, DEBUG_CONFIG } from '../utils/Constants';

/**
 * Class responsible for controlling the car
 */
export class CarController {
  private scene: Phaser.Scene;
  private car!: Phaser.Physics.Arcade.Sprite;
  private pathPoints: Phaser.Math.Vector2[] = [];
  private currentPathIndex: number = 0;
  private speed: number = CAR_CONFIG.SPEED;
  private readonly turnSpeed: number = CAR_CONFIG.TURN_SPEED;
  private readonly trackWidth: number;
  private readonly idealCarWidth: number = TRACK_CONFIG.IDEAL_CAR_WIDTH;
  private readonly centerX: number = TRACK_CONFIG.CENTER_X;
  private readonly centerY: number = TRACK_CONFIG.CENTER_Y;

  constructor(scene: Phaser.Scene, trackWidth: number, pathPoints: Phaser.Math.Vector2[]) {
    this.scene = scene;
    this.trackWidth = trackWidth;
    this.pathPoints = pathPoints;
  }

  /**
   * Create the car
   */
  createCar(roadDimensions: { width: number, height: number }): Phaser.Physics.Arcade.Sprite {
    const { height: roadHeight } = roadDimensions;
    const distY = roadHeight / 2;

    // Create the car at the starting position
    this.car = this.scene.physics.add.sprite(this.centerX, this.centerY - distY, ASSET_KEYS.CAR.CAR1);
    this.car.setOrigin(0.5, 0.5);

    // Apply scale based on car and track dimensions
    this.applyCarScale();

    // Set physics properties
    this.car.setCollideWorldBounds(false);
    this.car.setAngularDrag(CAR_CONFIG.ANGULAR_DRAG);
    this.car.setDamping(true);
    this.car.setDrag(CAR_CONFIG.DRAG);
    this.car.angle = 0; // Start facing right (along the track)

    return this.car;
  }

  /**
   * Apply scale to the car based on track width
   */
  private applyCarScale(): void {
    const texture = this.scene.textures.get(ASSET_KEYS.CAR.CAR1);
    const frame = texture.get();

    if (frame) {
      // Calculate the appropriate scale based on track width
      const originalWidth = frame.width;
      const originalHeight = frame.height;
      const scaleX = this.idealCarWidth / originalWidth;

      // Apply the calculated scale
      this.car.setScale(scaleX);

      if (DEBUG_CONFIG.ENABLED) {
        console.log(`Car original dimensions: ${originalWidth}x${originalHeight}px`);
        console.log(`Track width: ${this.trackWidth}px`);
        console.log(`Ideal car width: ${this.idealCarWidth}px`);
        console.log(`Applied car scale: ${scaleX}`);
        console.log(`Car display width: ${this.car.displayWidth}px`);
      }
    } else {
      // Fallback to a reasonable scale if we can't get the texture dimensions
      this.car.setScale(CAR_CONFIG.FALLBACK_SCALE);

      if (DEBUG_CONFIG.ENABLED) {
        console.log(`Using fallback scale: ${CAR_CONFIG.FALLBACK_SCALE}`);
      }
    }
  }

  /**
   * Handle car movement
   */
  handleCarMovement(): void {
    if (!this.car || this.pathPoints.length === 0) return;

    // Get the next target point on the path
    const targetPoint = this.pathPoints[this.currentPathIndex];

    // Calculate distance to the target point
    const distance = Phaser.Math.Distance.Between(
      this.car.x, this.car.y,
      targetPoint.x, targetPoint.y
    );

    // If we're close enough to the current target point, move to the next one
    if (distance < 30) {
      this.currentPathIndex = (this.currentPathIndex + 1) % this.pathPoints.length;
    }

    // Calculate the angle to the target point
    const targetAngle = Phaser.Math.Angle.Between(
      this.car.x, this.car.y,
      targetPoint.x, targetPoint.y
    );

    // Convert to degrees and adjust for Phaser's coordinate system
    const targetAngleDeg = Phaser.Math.RadToDeg(targetAngle) + 90;

    // Calculate the shortest angle difference
    const angleDiff = Phaser.Math.Angle.ShortestBetween(this.car.angle, targetAngleDeg);

    // Turn the car towards the target point
    if (Math.abs(angleDiff) > 0.5) {
      if (angleDiff > 0) {
        this.car.angle += this.turnSpeed;
      } else {
        this.car.angle -= this.turnSpeed;
      }
    }

    // Calculate velocity based on car's angle and speed
    const angleRad = Phaser.Math.DegToRad(this.car.angle - 90); // Adjust angle for proper direction
    const velocityX = Math.cos(angleRad) * this.speed;
    const velocityY = Math.sin(angleRad) * this.speed;

    // Apply velocity to the car
    this.car.setVelocity(velocityX, velocityY);
  }

  /**
   * Update car sprite based on angle
   */
  updateCarSprite(): void {
    if (!this.car) return;

    // Normalize angle to 0-360 range
    let angle = this.car.angle % 360;
    if (angle < 0) angle += 360;

    // Select appropriate sprite based on angle
    if (angle >= 0 && angle < 72) {
      this.car.setTexture(ASSET_KEYS.CAR.CAR1);
    } else if (angle >= 72 && angle < 144) {
      this.car.setTexture(ASSET_KEYS.CAR.CAR2);
    } else if (angle >= 144 && angle < 216) {
      this.car.setTexture(ASSET_KEYS.CAR.CAR3);
    } else if (angle >= 216 && angle < 288) {
      this.car.setTexture(ASSET_KEYS.CAR.CAR4);
    } else {
      this.car.setTexture(ASSET_KEYS.CAR.CAR5);
    }
  }

  /**
   * Adjust car scale (can be called to recalculate if needed)
   */
  adjustCarScale(): void {
    if (!this.car) return;

    const texture = this.scene.textures.get(ASSET_KEYS.CAR.CAR1);
    const frame = texture.get();

    if (frame) {
      // Calculate the appropriate scale based on track width
      const originalWidth = frame.width;
      const scaleX = this.idealCarWidth / originalWidth;

      // Apply the calculated scale
      this.car.setScale(scaleX);

      if (DEBUG_CONFIG.ENABLED) {
        console.log(`Adjusted car scale to: ${scaleX}`);
      }
    }
  }

  /**
   * Handle keyboard input for manual control
   */
  handleKeyboardInput(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    if (!cursors || !this.car) return;

    // Reset to automatic driving if space is pressed
    if (cursors.space?.isDown) {
      this.speed = CAR_CONFIG.SPEED;
    }
  }

  /**
   * Increase car speed
   */
  increaseSpeed(): void {
    this.speed = Math.min(this.speed + CAR_CONFIG.SPEED_INCREMENT, CAR_CONFIG.MAX_SPEED);
    if (DEBUG_CONFIG.ENABLED) {
      console.log(`Car speed increased to: ${this.speed}`);
    }
  }

  /**
   * Decrease car speed
   */
  decreaseSpeed(): void {
    this.speed = Math.max(this.speed - CAR_CONFIG.SPEED_INCREMENT, CAR_CONFIG.MIN_SPEED);
    if (DEBUG_CONFIG.ENABLED) {
      console.log(`Car speed decreased to: ${this.speed}`);
    }
  }

  /**
   * Get current car speed
   */
  getSpeed(): number {
    return this.speed;
  }
}
