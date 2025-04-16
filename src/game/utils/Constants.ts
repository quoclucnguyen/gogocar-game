/**
 * Game constants and configuration
 */

// Track configuration
export const TRACK_CONFIG = {
  CENTER_X: 400,
  CENTER_Y: 300,
  DEFAULT_WIDTH: 128,
  IDEAL_CAR_WIDTH: 35,
  ROAD_SCALE: 0.5,
  TRACK_WIDTH_RATIO: 0.6, // Percentage of road width to use as track width
};

// Car configuration
export const CAR_CONFIG = {
  SPEED: 150,
  TURN_SPEED: 2,
  FALLBACK_SCALE: 0.07,
  ANGULAR_DRAG: 200,
  DRAG: 0.95,
};

// Camera configuration
export const CAMERA_CONFIG = {
  ZOOM: 0.8,
  BOUNDS: {
    X: 0,
    Y: 0,
    WIDTH: 800,
    HEIGHT: 600,
  },
};

// World configuration
export const WORLD_CONFIG = {
  BOUNDS: {
    X: 0,
    Y: 0,
    WIDTH: 1600,
    HEIGHT: 1200,
  },
};

// Debug configuration
export const DEBUG_CONFIG = {
  ENABLED: true,
  PATH_LINE_COLOR: 0x00ff00,
  PATH_LINE_ALPHA: 0.5,
  PATH_POINT_COLOR: 0xff0000,
  PATH_POINT_ALPHA: 0.5,
  PATH_POINT_SIZE: 5,
};

// Asset keys
export const ASSET_KEYS = {
  CAR: {
    CAR1: 'car1',
    CAR2: 'car2',
    CAR3: 'car3',
    CAR4: 'car4',
    CAR5: 'car5',
  },
  ROAD: {
    STRAIGHT: 'road_straight',
    CURVE: 'road_curve',
    INTERSECTION: 'road_intersection',
    T_JUNCTION: 'road_t_junction',
    END: 'road_end',
    CORNER: 'road_corner',
    CROSSROAD: 'road_crossroad',
    DEADEND: 'road_deadend',
  },
};

// Asset paths
export const ASSET_PATHS = {
  CAR: {
    CAR1: 'assets/Car_1_Main_Positions/Car_1_01.png',
    CAR2: 'assets/Car_1_Main_Positions/Car_1_02.png',
    CAR3: 'assets/Car_1_Main_Positions/Car_1_03.png',
    CAR4: 'assets/Car_1_Main_Positions/Car_1_04.png',
    CAR5: 'assets/Car_1_Main_Positions/Car_1_05.png',
  },
  ROAD: {
    STRAIGHT: 'assets/Road_01/Road_01_Tile_01/Road_01_Tile_01.png',
    CURVE: 'assets/Road_01/Road_01_Tile_02/Road_01_Tile_02.png',
    INTERSECTION: 'assets/Road_01/Road_01_Tile_03/Road_01_Tile_03.png',
    T_JUNCTION: 'assets/Road_01/Road_01_Tile_04/Road_01_Tile_04.png',
    END: 'assets/Road_01/Road_01_Tile_05/Road_01_Tile_05.png',
    CORNER: 'assets/Road_01/Road_01_Tile_06/Road_01_Tile_06.png',
    CROSSROAD: 'assets/Road_01/Road_01_Tile_07/Road_01_Tile_07.png',
    DEADEND: 'assets/Road_01/Road_01_Tile_08/Road_01_Tile_08.png',
  },
};
