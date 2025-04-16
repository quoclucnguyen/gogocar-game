import Phaser from 'phaser';
import { TRACK_CONFIG, ASSET_KEYS, DEBUG_CONFIG } from '../utils/Constants';

/**
 * Class responsible for building the racing track
 */
export class TrackBuilder {
  private scene: Phaser.Scene;
  private trackTiles: Phaser.GameObjects.TileSprite[] = [];
  private trackImages: Phaser.GameObjects.Image[] = [];
  private trackWidth: number = TRACK_CONFIG.DEFAULT_WIDTH;
  private readonly centerX: number = TRACK_CONFIG.CENTER_X;
  private readonly centerY: number = TRACK_CONFIG.CENTER_Y;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Create the racing track
   */
  createTrack(): { trackWidth: number, trackTiles: Phaser.GameObjects.TileSprite[], trackImages: Phaser.GameObjects.Image[] } {
    // Set the background color (grass)
    this.scene.cameras.main.setBackgroundColor('#4a8f29');

    // Create the track using image tiles
    this.createImageTrack();

    // Calculate the track width based on the road texture
    this.calculateTrackWidth();

    return {
      trackWidth: this.trackWidth,
      trackTiles: this.trackTiles,
      trackImages: this.trackImages
    };
  }

  /**
   * Get road dimensions based on texture
   */
  getRoadDimensions(): { width: number, height: number } {
    const roadTexture = this.scene.textures.get(ASSET_KEYS.ROAD.STRAIGHT);
    let width = 100; // Default values
    let height = 50;

    if (roadTexture) {
      const frame = roadTexture.get();
      if (frame) {
        width = frame.width * TRACK_CONFIG.ROAD_SCALE;
        height = frame.height * TRACK_CONFIG.ROAD_SCALE;
      }
    }

    return { width, height };
  }

  /**
   * Calculate the track width based on the road texture
   */
  private calculateTrackWidth(): void {
    const roadTexture = this.scene.textures.get(ASSET_KEYS.ROAD.STRAIGHT);
    if (roadTexture) {
      const frame = roadTexture.get();
      if (frame) {
        const roadWidth = frame.width * TRACK_CONFIG.ROAD_SCALE;
        this.trackWidth = roadWidth * TRACK_CONFIG.TRACK_WIDTH_RATIO;

        if (DEBUG_CONFIG.ENABLED) {
          console.log(`Road texture width: ${frame.width}px`);
          console.log(`Road scaled width: ${roadWidth}px`);
          console.log(`Track width set to: ${this.trackWidth}px`);
        }
      }
    }
  }

  /**
   * Create the track using image tiles
   */
  private createImageTrack(): void {
    // Get road dimensions
    const { width: roadWidth, height: roadHeight } = this.getRoadDimensions();
    
    // Calculate distances
    const distY = roadHeight / 2;
    const distX = roadWidth / 2;

    // Top straight road
    const topRoad = this.scene.add.image(this.centerX, this.centerY - distY, ASSET_KEYS.ROAD.STRAIGHT);
    topRoad.setOrigin(0.5, 0.5);
    topRoad.setScale(TRACK_CONFIG.ROAD_SCALE);
    this.trackImages.push(topRoad);

    // Bottom straight road
    const bottomRoad = this.scene.add.image(this.centerX, this.centerY + distY, ASSET_KEYS.ROAD.STRAIGHT);
    bottomRoad.setOrigin(0.5, 0.5);
    bottomRoad.setScale(TRACK_CONFIG.ROAD_SCALE);
    bottomRoad.angle = 180;
    this.trackImages.push(bottomRoad);

    // Left curve
    const leftCurve = this.scene.add.image(this.centerX - distX, this.centerY, ASSET_KEYS.ROAD.CURVE);
    leftCurve.setOrigin(0.5, 0.5);
    leftCurve.setScale(TRACK_CONFIG.ROAD_SCALE);
    leftCurve.angle = 90;
    this.trackImages.push(leftCurve);

    // Right curve
    const rightCurve = this.scene.add.image(this.centerX + distX, this.centerY, ASSET_KEYS.ROAD.CURVE);
    rightCurve.setOrigin(0.5, 0.5);
    rightCurve.setScale(TRACK_CONFIG.ROAD_SCALE);
    rightCurve.angle = 270;
    this.trackImages.push(rightCurve);

    // T-junction at the top
    const topJunction = this.scene.add.image(
      this.centerX, 
      this.centerY - distY - roadHeight * 0.8, 
      ASSET_KEYS.ROAD.T_JUNCTION
    );
    topJunction.setOrigin(0.5, 0.5);
    topJunction.setScale(TRACK_CONFIG.ROAD_SCALE);
    topJunction.angle = 180;
    this.trackImages.push(topJunction);

    // Dead end extending from the T-junction
    const topExtension = this.scene.add.image(
      this.centerX, 
      this.centerY - distY - roadHeight * 1.6, 
      ASSET_KEYS.ROAD.DEADEND
    );
    topExtension.setOrigin(0.5, 0.5);
    topExtension.setScale(TRACK_CONFIG.ROAD_SCALE);
    topExtension.angle = 0;
    this.trackImages.push(topExtension);

    // Create a TileSprite for the start/finish line
    const startLine = this.scene.add.tileSprite(
      this.centerX,
      this.centerY - distY,
      roadWidth * 0.6, // width
      roadHeight * 0.2, // height
      ASSET_KEYS.ROAD.STRAIGHT
    );
    startLine.setOrigin(0.5, 0.5);
    startLine.setTint(0xFFFFFF); // White tint for the start line
    this.trackTiles.push(startLine);
  }

  /**
   * Generate path points for the car to follow
   */
  generatePathPoints(): Phaser.Math.Vector2[] {
    const pathPoints: Phaser.Math.Vector2[] = [];
    const { width: roadWidth, height: roadHeight } = this.getRoadDimensions();
    
    // Generate points along an oval path
    const numPoints = 16; // Number of points to generate
    const radiusX = roadWidth * 0.9; // Horizontal radius based on road width
    const radiusY = roadHeight * 0.9; // Vertical radius based on road height
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const x = this.centerX + Math.cos(angle) * radiusX;
      const y = this.centerY + Math.sin(angle) * radiusY;
      
      pathPoints.push(new Phaser.Math.Vector2(x, y));
    }
    
    // Add a point for the starting position
    const distY = roadHeight / 2;
    pathPoints.unshift(new Phaser.Math.Vector2(this.centerX, this.centerY - distY));
    
    return pathPoints;
  }
}
