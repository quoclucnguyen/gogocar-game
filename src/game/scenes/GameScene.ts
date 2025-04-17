import Phaser from 'phaser';
import { TrackBuilder } from '../track/TrackBuilder';
import { TrackDecorator } from '../track/TrackDecorator';
import { CarController } from '../car/CarController';
import { DebugHelper } from '../utils/DebugHelper';
import {
  TRACK_CONFIG,
  CAMERA_CONFIG,
  WORLD_CONFIG,
  DEBUG_CONFIG,
  ASSET_KEYS,
  ASSET_PATHS,
} from '../utils/Constants';
import { CarInfoPanel } from '../ui/CarInfoPanel';
import { SpeedControlPanel } from '../ui/SpeedControlPanel';

class GameScene extends Phaser.Scene {
  // Track objects
  private trackTiles: Phaser.GameObjects.TileSprite[] = [];
  private trackImages: Phaser.GameObjects.Image[] = [];
  private trackWidth: number = TRACK_CONFIG.DEFAULT_WIDTH;

  // Car objects
  private car!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  // Path for car to follow
  private pathPoints: Phaser.Math.Vector2[] = [];

  // UI elements
  private carPositionText!: Phaser.GameObjects.Text;
  private carInfoPanel!: CarInfoPanel;
  private speedControlPanel!: SpeedControlPanel;

  // Helper classes
  private trackBuilder!: TrackBuilder;
  private trackDecorator!: TrackDecorator;
  private carController!: CarController;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.loadCarAssets();
    this.loadRoadAssets();
  }

  create() {
    // Set the world bounds
    this.physics.world.setBounds(
      WORLD_CONFIG.BOUNDS.X,
      WORLD_CONFIG.BOUNDS.Y,
      WORLD_CONFIG.BOUNDS.WIDTH,
      WORLD_CONFIG.BOUNDS.HEIGHT
    );

    // Create track
    this.createTrack();

    // Define path for car to follow
    this.definePath();

    // Create car
    this.createCar();

    // Set up camera
    this.setupCamera();

    // Set up UI
    this.setupUI();
  }

  update() {
    // Handle car movement
    this.carController.handleCarMovement();
    this.carController.updateCarSprite();

    // Handle keyboard input
    if (this.cursors) {
      this.carController.handleKeyboardInput(this.cursors);
    }

    // Maintain fixed camera
    this.maintainFixedCamera();

    // Update UI
    this.updateUI();
  }

  /**
   * Load car assets
   */
  private loadCarAssets(): void {
    this.load.image(ASSET_KEYS.CAR.CAR1, ASSET_PATHS.CAR.CAR1);
    this.load.image(ASSET_KEYS.CAR.CAR2, ASSET_PATHS.CAR.CAR2);
    this.load.image(ASSET_KEYS.CAR.CAR3, ASSET_PATHS.CAR.CAR3);
    this.load.image(ASSET_KEYS.CAR.CAR4, ASSET_PATHS.CAR.CAR4);
    this.load.image(ASSET_KEYS.CAR.CAR5, ASSET_PATHS.CAR.CAR5);
  }

  /**
   * Load road assets
   */
  private loadRoadAssets(): void {
    this.load.image(ASSET_KEYS.ROAD.STRAIGHT, ASSET_PATHS.ROAD.STRAIGHT);
    this.load.image(ASSET_KEYS.ROAD.CURVE, ASSET_PATHS.ROAD.CURVE);
    this.load.image(ASSET_KEYS.ROAD.INTERSECTION, ASSET_PATHS.ROAD.INTERSECTION);
    this.load.image(ASSET_KEYS.ROAD.T_JUNCTION, ASSET_PATHS.ROAD.T_JUNCTION);
    this.load.image(ASSET_KEYS.ROAD.END, ASSET_PATHS.ROAD.END);
    this.load.image(ASSET_KEYS.ROAD.CORNER, ASSET_PATHS.ROAD.CORNER);
    this.load.image(ASSET_KEYS.ROAD.CROSSROAD, ASSET_PATHS.ROAD.CROSSROAD);
    this.load.image(ASSET_KEYS.ROAD.DEADEND, ASSET_PATHS.ROAD.DEADEND);
  }

  /**
   * Create the racing track
   */
  private createTrack(): void {
    // Initialize track builder and decorator
    this.trackBuilder = new TrackBuilder(this);
    this.trackDecorator = new TrackDecorator(this);

    // Add grass texture
    this.trackDecorator.addGrassTexture();

    // Create track
    const trackData = this.trackBuilder.createTrack();
    this.trackWidth = trackData.trackWidth;
    this.trackTiles = trackData.trackTiles;
    this.trackImages = trackData.trackImages;

    // Add decorations
    this.trackDecorator.addTrackDecorations();

    // Add track details
    const roadDimensions = this.trackBuilder.getRoadDimensions();
    this.trackDecorator.addTrackDetails(roadDimensions);
  }

  /**
   * Define the path for the car to follow
   */
  private definePath(): void {
    this.pathPoints = this.trackBuilder.generatePathPoints();

    // Visualize path if debug mode is enabled
    if (DEBUG_CONFIG.ENABLED) {
      DebugHelper.visualizePath(this, this.pathPoints);
    }
  }

  /**
   * Create the car
   */
  private createCar(): void {
    // Initialize car controller
    this.carController = new CarController(this, this.trackWidth, this.pathPoints);

    // Create car
    const roadDimensions = this.trackBuilder.getRoadDimensions();
    this.car = this.carController.createCar(roadDimensions);

    // Set up keyboard controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  /**
   * Set up camera
   */
  private setupCamera(): void {
    // Set fixed camera position (top-down view)
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.setZoom(CAMERA_CONFIG.ZOOM);

    // Set camera bounds
    this.cameras.main.setBounds(
      CAMERA_CONFIG.BOUNDS.X,
      CAMERA_CONFIG.BOUNDS.Y,
      CAMERA_CONFIG.BOUNDS.WIDTH,
      CAMERA_CONFIG.BOUNDS.HEIGHT
    );

    // Center the camera on the track
    this.cameras.main.centerOn(TRACK_CONFIG.CENTER_X, TRACK_CONFIG.CENTER_Y);
  }

  /**
   * Set up UI elements
   */
  private setupUI(): void {
    // Create car information panel
    this.carInfoPanel = new CarInfoPanel(this, this.car);

    // Create speed control panel
    this.speedControlPanel = new SpeedControlPanel(this, this.carController);

    // Add debug info if debug mode is enabled
    if (DEBUG_CONFIG.ENABLED) {
      // Add car position text (for debug only)
      this.carPositionText = DebugHelper.createCarPositionText(this, 10, 200);

      const debugText = DebugHelper.createDebugText(this, 10, 230, 'Debug info:');

      // Update debug text with current values
      debugText.setText(
        `Track width: ${this.trackWidth}px\n` +
        `Ideal car width: ${TRACK_CONFIG.IDEAL_CAR_WIDTH}px\n` +
        `Car scale: ${this.car.scaleX.toFixed(4)}`
      );
    } else {
      // Create an empty text object if debug is disabled
      this.carPositionText = this.add.text(0, 0, '', { fontSize: '1px' });
      this.carPositionText.setVisible(false);
    }
  }

  /**
   * Update UI elements
   */
  private updateUI(): void {
    // Update car information panel
    this.carInfoPanel.update();

    // Update speed control panel
    this.speedControlPanel.update();

    // Update car position text (debug only)
    if (DEBUG_CONFIG.ENABLED) {
      DebugHelper.updateCarPositionText(this.carPositionText, this.car, this.cameras.main);
    }
  }

  /**
   * Maintain fixed camera position
   */
  private maintainFixedCamera(): void {
    // Reset camera position if it somehow moved
    this.cameras.main.centerOn(TRACK_CONFIG.CENTER_X, TRACK_CONFIG.CENTER_Y);
  }
}

export default GameScene;
