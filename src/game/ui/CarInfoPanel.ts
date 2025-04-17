import Phaser from 'phaser';
import { UI_CONFIG } from '../utils/Constants';

/**
 * Class responsible for displaying car information panel
 */
export class CarInfoPanel {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private background!: Phaser.GameObjects.Graphics;
  private titleText!: Phaser.GameObjects.Text;
  private infoTexts: Phaser.GameObjects.Text[] = [];
  private car: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, car: Phaser.Physics.Arcade.Sprite) {
    this.scene = scene;
    this.car = car;
    this.createPanel();
  }

  /**
   * Create the car information panel
   */
  private createPanel(): void {
    // Create container for all panel elements
    this.container = this.scene.add.container(UI_CONFIG.CAR_INFO_PANEL.X, UI_CONFIG.CAR_INFO_PANEL.Y);
    
    // Create background
    this.background = this.scene.add.graphics();
    this.background.fillStyle(UI_CONFIG.CAR_INFO_PANEL.BACKGROUND_COLOR, UI_CONFIG.CAR_INFO_PANEL.BACKGROUND_ALPHA);
    this.background.fillRoundedRect(
      0, 
      0, 
      UI_CONFIG.CAR_INFO_PANEL.WIDTH, 
      UI_CONFIG.CAR_INFO_PANEL.HEIGHT, 
      UI_CONFIG.CAR_INFO_PANEL.CORNER_RADIUS
    );
    this.background.lineStyle(
      UI_CONFIG.CAR_INFO_PANEL.BORDER_WIDTH, 
      UI_CONFIG.CAR_INFO_PANEL.BORDER_COLOR, 
      UI_CONFIG.CAR_INFO_PANEL.BORDER_ALPHA
    );
    this.background.strokeRoundedRect(
      0, 
      0, 
      UI_CONFIG.CAR_INFO_PANEL.WIDTH, 
      UI_CONFIG.CAR_INFO_PANEL.HEIGHT, 
      UI_CONFIG.CAR_INFO_PANEL.CORNER_RADIUS
    );
    
    // Add background to container
    this.container.add(this.background);
    
    // Create title text
    this.titleText = this.scene.add.text(
      UI_CONFIG.CAR_INFO_PANEL.PADDING, 
      UI_CONFIG.CAR_INFO_PANEL.PADDING, 
      'THÔNG SỐ XE', 
      {
        fontFamily: UI_CONFIG.CAR_INFO_PANEL.FONT_FAMILY,
        fontSize: UI_CONFIG.CAR_INFO_PANEL.TITLE_FONT_SIZE,
        color: UI_CONFIG.CAR_INFO_PANEL.TITLE_COLOR,
        fontStyle: 'bold'
      }
    );
    
    // Add title to container
    this.container.add(this.titleText);
    
    // Create info texts
    const infoLabels = [
      'Tốc độ:',
      'Góc quay:',
      'Vị trí X:',
      'Vị trí Y:',
      'Tỉ lệ:',
    ];
    
    infoLabels.forEach((label, index) => {
      const y = this.titleText.y + this.titleText.height + UI_CONFIG.CAR_INFO_PANEL.PADDING + 
                (index * (UI_CONFIG.CAR_INFO_PANEL.LINE_HEIGHT + UI_CONFIG.CAR_INFO_PANEL.LINE_SPACING));
      
      const text = this.scene.add.text(
        UI_CONFIG.CAR_INFO_PANEL.PADDING, 
        y, 
        `${label} 0`, 
        {
          fontFamily: UI_CONFIG.CAR_INFO_PANEL.FONT_FAMILY,
          fontSize: UI_CONFIG.CAR_INFO_PANEL.INFO_FONT_SIZE,
          color: UI_CONFIG.CAR_INFO_PANEL.INFO_COLOR
        }
      );
      
      this.infoTexts.push(text);
      this.container.add(text);
    });
    
    // Make sure the panel stays fixed to the camera
    this.container.setScrollFactor(0);
  }

  /**
   * Update the car information panel
   */
  update(): void {
    if (!this.car) return;
    
    // Update speed
    const speed = Math.sqrt(Math.pow(this.car.body.velocity.x, 2) + Math.pow(this.car.body.velocity.y, 2));
    this.infoTexts[0].setText(`Tốc độ: ${Math.round(speed)} px/s`);
    
    // Update angle
    this.infoTexts[1].setText(`Góc quay: ${Math.round(this.car.angle)}°`);
    
    // Update position
    this.infoTexts[2].setText(`Vị trí X: ${Math.round(this.car.x)}`);
    this.infoTexts[3].setText(`Vị trí Y: ${Math.round(this.car.y)}`);
    
    // Update scale
    this.infoTexts[4].setText(`Tỉ lệ: ${this.car.scaleX.toFixed(3)}`);
  }
}
