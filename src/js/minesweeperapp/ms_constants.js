const MS_CURSOR_TOGGLE = 16;
const MS_NUM_BOMBS     =  8;

const MS_FLAG_DELAY    = 10;

const MS_TILE_COLOR = new ESColor(218, 218, 218);
const MS_BOMB_COLOR = new ESColor( 64,  64,  64);
const MS_FLAG_COLOR = new ESColor(196, 196,  64);
const MS_CURS_COLOR = new ESColor(255,   0, 255);

const MS_SURROUNDING_COLORS = [
	new ESColor( 48,  48, 196), // Blue
	new ESColor( 64, 196,  64), // Green
	new ESColor(196,  32,  32), // Red
	new ESColor(128,  32, 196), // Purple
	new ESColor(155,  56,  42), // Brown
	new ESColor( 64, 128, 128), // Cyan
	new ESColor( 64,  64,  64), // Grey
	new ESColor(196, 128,  64)  // Orange
];