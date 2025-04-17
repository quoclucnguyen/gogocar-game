import Phaser from 'phaser';
import { UI_CONFIG } from '../utils/Constants';
import { CarController } from '../car/CarController';

/**
 * Class responsible for displaying speed control buttons
 */
export class SpeedControlPanel {
  private scene: Phaser.Scene;
  private carController: CarController;
  private increaseButton!: Phaser.GameObjects.Container;
  private decreaseButton!: Phaser.GameObjects.Container;
  private speedText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, carController: CarController) {
    this.scene = scene;
    this.carController = carController;
    this.createButtons();
  }

  /**
   * Create speed control buttons
   */
  private createButtons(): void {
    // Create increase speed button
    this.increaseButton = this.createButton(
      UI_CONFIG.SPEED_CONTROL.INCREASE_BUTTON_X,
      UI_CONFIG.SPEED_CONTROL.INCREASE_BUTTON_Y,
      '+',
      () => {
        this.carController.increaseSpeed();
        this.updateSpeedText();
      }
    );

    // Create decrease speed button
    this.decreaseButton = this.createButton(
      UI_CONFIG.SPEED_CONTROL.DECREASE_BUTTON_X,
      UI_CONFIG.SPEED_CONTROL.DECREASE_BUTTON_Y,
      '-',
      () => {
        this.carController.decreaseSpeed();
        this.updateSpeedText();
      }
    );

    // Create speed text display
    this.speedText = this.scene.add.text(
      UI_CONFIG.SPEED_CONTROL.DECREASE_BUTTON_X + (UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH / 2),
      UI_CONFIG.SPEED_CONTROL.DECREASE_BUTTON_Y + UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT + 5,
      `${this.carController.getSpeed()}`,
      {
        fontFamily: UI_CONFIG.SPEED_CONTROL.FONT_FAMILY,
        fontSize: UI_CONFIG.SPEED_CONTROL.FONT_SIZE,
        color: UI_CONFIG.SPEED_CONTROL.TEXT_COLOR
      }
    );
    this.speedText.setOrigin(0.5, 0);
    this.speedText.setScrollFactor(0);
  }

  /**
   * Create a button with background and text
   */
  private createButton(
    x: number,
    y: number,
    text: string,
    callback: () => void
  ): Phaser.GameObjects.Container {
    // Create container
    const container = this.scene.add.container(x, y);

    // Create background
    const background = this.scene.add.graphics();
    background.fillStyle(UI_CONFIG.SPEED_CONTROL.BACKGROUND_COLOR, UI_CONFIG.SPEED_CONTROL.BACKGROUND_ALPHA);
    background.fillRect(0, 0, UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH, UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT);
    background.lineStyle(
      UI_CONFIG.SPEED_CONTROL.BORDER_WIDTH,
      UI_CONFIG.SPEED_CONTROL.BORDER_COLOR,
      UI_CONFIG.SPEED_CONTROL.BORDER_ALPHA
    );
    background.strokeRect(0, 0, UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH, UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT);

    // Create text
    const buttonText = this.scene.add.text(
      UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH / 2,
      UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT / 2,
      text,
      {
        fontFamily: UI_CONFIG.SPEED_CONTROL.FONT_FAMILY,
        fontSize: UI_CONFIG.SPEED_CONTROL.FONT_SIZE,
        color: UI_CONFIG.SPEED_CONTROL.TEXT_COLOR
      }
    );
    buttonText.setOrigin(0.5, 0.5);

    // Add background and text to container
    container.add([background, buttonText]);

    // Make interactive
    container.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        0,
        UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH,
        UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT
      ),
      Phaser.Geom.Rectangle.Contains
    );

    // Add event listeners
    container.on('pointerdown', callback);
    container.on('pointerover', () => {
      background.clear();
      background.fillStyle(UI_CONFIG.SPEED_CONTROL.BACKGROUND_COLOR, UI_CONFIG.SPEED_CONTROL.BACKGROUND_ALPHA + 0.2);
      background.fillRect(0, 0, UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH, UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT);
      background.lineStyle(
        UI_CONFIG.SPEED_CONTROL.BORDER_WIDTH,
        UI_CONFIG.SPEED_CONTROL.BORDER_COLOR,
        UI_CONFIG.SPEED_CONTROL.BORDER_ALPHA
      );
      background.strokeRect(0, 0, UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH, UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT);
    });
    container.on('pointerout', () => {
      background.clear();
      background.fillStyle(UI_CONFIG.SPEED_CONTROL.BACKGROUND_COLOR, UI_CONFIG.SPEED_CONTROL.BACKGROUND_ALPHA);
      background.fillRect(0, 0, UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH, UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT);
      background.lineStyle(
        UI_CONFIG.SPEED_CONTROL.BORDER_WIDTH,
        UI_CONFIG.SPEED_CONTROL.BORDER_COLOR,
        UI_CONFIG.SPEED_CONTROL.BORDER_ALPHA
      );
      background.strokeRect(0, 0, UI_CONFIG.SPEED_CONTROL.BUTTON_WIDTH, UI_CONFIG.SPEED_CONTROL.BUTTON_HEIGHT);
    });

    // Make sure the button stays fixed to the camera
    container.setScrollFactor(0);

    return container;
  }

  /**
   * Update the speed text display
   */
  updateSpeedText(): void {
    this.speedText.setText(`${this.carController.getSpeed()}`);
  }

  /**
   * Update the speed control panel
   */
  update(): void {
    this.updateSpeedText();
  }
}
