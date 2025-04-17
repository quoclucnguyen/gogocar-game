# Assets Directory Structure

This document provides a detailed overview of the assets used in the GoGoCar racing game.

## Directory Structure

```
src/assets/
├── Car_1_Main_Positions/
│   ├── Car_1_01.png
│   ├── Car_1_02.png
│   ├── Car_1_03.png
│   ├── Car_1_04.png
│   └── Car_1_05.png
├── Road_01/
│   ├── Road_01_Tile_01/
│   │   ├── Layers/
│   │   │   ├── Road_Main.png
│   │   │   ├── Road_Side_01.png
│   │   │   └── Road_Side_02.png
│   │   └── Road_01_Tile_01.png
│   ├── Road_01_Tile_02/
│   ├── Road_01_Tile_03/
│   ├── Road_01_Tile_04/
│   ├── Road_01_Tile_05/
│   ├── Road_01_Tile_06/
│   ├── Road_01_Tile_07/
│   └── Road_01_Tile_08/
└── react.svg
```

## Asset Details

### Car Assets

The `Car_1_Main_Positions` directory contains sprite images for the main car in different positions or animation frames:

| File | Description | Size |
|------|-------------|------|
| Car_1_01.png | Car position/frame 1 | 264 KB |
| Car_1_02.png | Car position/frame 2 | 264 KB |
| Car_1_03.png | Car position/frame 3 | 282 KB |
| Car_1_04.png | Car position/frame 4 | 314 KB |
| Car_1_05.png | Car position/frame 5 | 326 KB |

These images likely represent different states or angles of the car for animation purposes in the racing game.

### Road Assets

The `Road_01` directory contains various road tile images organized in subdirectories:

#### Road Tile Structure

Most road tile directories follow this pattern:
- A main PNG file for the complete tile
- A `Layers` subdirectory containing component parts of the tile

For example, `Road_01_Tile_01` contains:
- `Road_01_Tile_01.png`: The complete road tile (327 KB)
- `Layers/`: Subdirectory with component images:
  - `Road_Main.png`: The main road surface (210 KB)
  - `Road_Side_01.png`: One side of the road (102 KB)
  - `Road_Side_02.png`: Another side element (10 KB)

Some tiles like `Road_01_Tile_05` only contain the main PNG file without layer components.

The road tiles appear to be designed for building a complete race track by combining different sections.

### Other Assets

| File | Description | Size |
|------|-------------|------|
| react.svg | React logo SVG | 4 KB |

## Usage in Game

- **Car Images**: Used for rendering the player's car with different positions/angles during gameplay
- **Road Tiles**: Used to construct the racing track by combining different tile sections
- **Layer Components**: Allow for more detailed rendering or customization of road sections

## Notes for Developers

- When adding new car sprites, follow the naming convention `Car_X_YY.png` where X is the car model number and YY is the position/frame number
- Road tiles should be organized in their own directories with any component layers in a `Layers` subdirectory
- The road tiles can be combined to create various track layouts in the game
