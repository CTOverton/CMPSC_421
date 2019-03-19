<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >

      <v-layout
              align-center
              justify-center
              row
      >
        <div class="game-container">
          <div class="grid-container">
            <div class="grid-row">
              <div class="grid-cell">{{ cells[0][0] }}</div>
              <div class="grid-cell">{{ cells[0][1] }}</div>
              <div class="grid-cell">{{ cells[0][2] }}</div>
              <div class="grid-cell">{{ cells[0][3] }}</div>
            </div>
            <div class="grid-row">
              <div class="grid-cell">{{ cells[1][0] }}</div>
              <div class="grid-cell">{{ cells[1][1] }}</div>
              <div class="grid-cell">{{ cells[1][2] }}</div>
              <div class="grid-cell">{{ cells[1][3] }}</div>
            </div>
            <div class="grid-row">
              <div class="grid-cell">{{ cells[2][0] }}</div>
              <div class="grid-cell">{{ cells[2][1] }}</div>
              <div class="grid-cell">{{ cells[2][2] }}</div>
              <div class="grid-cell">{{ cells[2][3] }}</div>
            </div>
            <div class="grid-row">
              <div class="grid-cell">{{ cells[3][0] }}</div>
              <div class="grid-cell">{{ cells[3][1] }}</div>
              <div class="grid-cell">{{ cells[3][2] }}</div>
              <div class="grid-cell">{{ cells[3][3] }}</div>
            </div>
          </div>
        </div>
      </v-layout>

      <!--<v-flex xs12>-->
        <!--<button v-on:click="start(1)">Add a year</button>-->
        <!--<p>My age is {{ age }}</p>-->
      <!--</v-flex>-->



    </v-layout>
  </v-container>
</template>

<script>

  // ========== [ Grid ] ==========
  function Grid(size) {
    this.size = size;
    //this.cells = previousState ? this.fromState(previousState) : this.empty();
    this.cells = this.empty();
  }

  // Build a grid of the specified size
  Grid.prototype.empty = function () {
    let cells = [];

    for (let x = 0; x < this.size; x++) {
      let row = cells[x] = [];

      for (let y = 0; y < this.size; y++) {
        row.push(null);
      }
    }

    return cells;
  };

  Grid.prototype.fromState = function (state) {
    let cells = [];

    for (let x = 0; x < this.size; x++) {
      let row = cells[x] = [];

      for (let y = 0; y < this.size; y++) {
        let tile = state[x][y];
        row.push(tile ? new Tile(tile.position, tile.value) : null);
      }
    }

    return cells;
  };

  Grid.prototype.eachCell = function (callback) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y, this.cells[x][y]);
      }
    }
  };

  Grid.prototype.randomAvailableCell = function () {
    let cells = this.availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
  };

  Grid.prototype.availableCells = function () {
    let cells = [];

    this.eachCell(function (x, y, tile) {
      if (!tile) {
        cells.push({ x: x, y: y });
      }
    });

    return cells;
  };

  Grid.prototype.cellsAvailable = function () {
    return !!this.availableCells().length;
  };

  Grid.prototype.addRandomTile = function() {
    if (this.cellsAvailable()) {
      let value = Math.random() < 0.9 ? 2 : 4;
      let tile = new Tile(this.randomAvailableCell(), value);

      this.insertTile(tile);
    }
  };

  Grid.prototype.insertTile = function (tile) {
    this.cells[tile.x][tile.y] = tile;
  };

  Grid.prototype.removeTile = function (tile) {
    this.cells[tile.x][tile.y] = null;
  };

  Grid.prototype.withinBounds = function (position) {
    return position.x >= 0 && position.x < this.size &&
            position.y >= 0 && position.y < this.size;
  };

  Grid.prototype.start = function () {
    this.empty();
    this.addRandomTile();
    this.addRandomTile();
    return this.cells;
  };

  Grid.prototype.move = function (direction) {
    let self = this;
    let cells = this.cells;
    console.log(direction);

    let cell, tile;
    let moved = false;
    let vector = this.getVector(direction);
    let traversals = { x: [], y: [] };

    for (let pos = 0; pos < this.size; pos++) {
      traversals.x.push(pos);
      traversals.y.push(pos);
    }

    // Always traverse from the farthest cell in the chosen direction
    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    // Traverse the grid in the right direction and move tiles
    traversals.x.forEach(function (x) {
      traversals.y.forEach(function (y) {
        cell = { x: x, y: y };
        tile = self.cells[cell.x][cell.y];

        if (tile) {
          let positions = self.findFarthestPosition(cell, vector);
          let next      = self.cellContent(positions.next);

          // Only one merger per row traversal?
          if (next && next.value === tile.value && !next.mergedFrom) {
            let merged = new Tile(positions.next, tile.value * 2);
            merged.mergedFrom = [tile, next];

            self.insertTile(merged);
            self.removeTile(tile);

            // Converge the two tiles' positions
            tile.updatePosition(positions.next);

            // Update the score
            //TODO
            //self.score += merged.value;

            // The mighty 2048 tile
            if (merged.value === 2048) self.won = true;
          } else {
            self.moveTile(tile, positions.farthest);
          }

          if (!self.positionsEqual(cell, tile)) {
            moved = true; // The tile moved from its original cell!
          }
        }
      });
    });

    if (moved) {
      this.addRandomTile();

      if (!this.movesAvailable()) {
        //this.over = true; // Game over!
      }

      //this.actuate();
    }

    console.log(this.cells);
    return this.cells;
  };

  Grid.prototype.movesAvailable = function () {
    return this.cellsAvailable() || this.tileMatchesAvailable();
  };

  // Check for available matches between tiles (more expensive check)
  Grid.prototype.tileMatchesAvailable = function () {
    var self = this;

    var tile;

    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        tile = this.cellContent({ x: x, y: y });

        if (tile) {
          for (var direction = 0; direction < 4; direction++) {
            var vector = self.getVector(direction);
            var cell   = { x: x + vector.x, y: y + vector.y };

            var other  = self.cellContent(cell);

            if (other && other.value === tile.value) {
              return true; // These two tiles can be merged
            }
          }
        }
      }
    }

    return false;
  };

  Grid.prototype.getVector = function (direction) {
    // Vectors representing tile movement
    let map = {
      0: { x: 0,  y: -1 }, // Up
      1: { x: 1,  y: 0 },  // Right
      2: { x: 0,  y: 1 },  // Down
      3: { x: -1, y: 0 }   // Left
    };

    return map[direction];
  };

  Grid.prototype.moveTile = function (tile, cell) {
    this.cells[tile.x][tile.y] = null;
    this.cells[cell.x][cell.y] = tile;
    tile.updatePosition(cell);
  };

  Grid.prototype.cellAvailable = function (cell) {
    return !this.cellOccupied(cell);
  };

  Grid.prototype.cellOccupied = function (cell) {
    return !!this.cellContent(cell);
  };

  Grid.prototype.cellContent = function (cell) {
    if (this.withinBounds(cell)) {
      return this.cells[cell.x][cell.y];
    } else {
      return null;
    }
  };

  Grid.prototype.findFarthestPosition = function (cell, vector) {
    let previous;

    // Progress towards the vector direction until an obstacle is found
    do {
      previous = cell;
      cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
    } while (this.withinBounds(cell) &&
    this.cellAvailable(cell));

    return {
      farthest: previous,
      next: cell // Used to check if a merge is required
    };
  };

  Grid.prototype.positionsEqual = function (first, second) {
    return first.x === second.x && first.y === second.y;
  };

  // ========== [ Tile ] ==========
  function Tile(position, value) {
    this.x                = position.x;
    this.y                = position.y;
    this.value            = value || 2;

    this.previousPosition = null;
    this.mergedFrom       = null; // Tracks tiles that merged together
  }

  Tile.prototype.savePosition = function () {
    this.previousPosition = { x: this.x, y: this.y };
  };

  Tile.prototype.updatePosition = function (position) {
    this.x = position.x;
    this.y = position.y;
  };

  Tile.prototype.serialize = function () {
    return {
      position: {
        x: this.x,
        y: this.y
      },
      value: this.value
    };
  };


  export default {
    data: function() {
      return {
        grid: new Grid(4),
        cells: [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
        ]
      };
    },
    methods: {
      start: function() {
        this.updateGrid(this.grid.start());
      },
      updateGrid: function (state) {
        let cells = [];

        for (let x = 0; x < 4; x++) {
          let row = cells[x] = [];

          for (let y = 0; y < 4; y++) {
            let tile = state[x][y];
            row.push(tile ? tile.value : null);
          }
        }

        this.cells = cells;

      }
    },
    mounted: function () {
      this.$nextTick(function () {
        let grid = this.grid;
        let that = this;

        this.start();

        // Handle Key Events
        document.addEventListener("keyup", function(event) {
          const map = {
            38: 0, // Up
            39: 1, // Right
            40: 2, // Down
            37: 3, // Left
            75: 0, // Vim up
            76: 1, // Vim right
            74: 2, // Vim down
            72: 3, // Vim left
            87: 0, // W
            68: 1, // D
            83: 2, // S
            65: 3  // A
          };

          var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                  event.shiftKey;
          var mapped    = map[event.which];

          if (!modifiers) {
            if (mapped !== undefined) {
              event.preventDefault();
              that.updateGrid(grid.move(mapped));
            }
          }
        });
      })
    }
  }
</script>

<style>
  .game-container {
    margin-top: 40px;
    position: relative;
    padding: 15px;
    cursor: default;
    -webkit-touch-callout: none;
    -ms-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    background: #34495e;
    border-radius: 6px;
    width: 500px;
    height: 500px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .grid-container {
    position: absolute;
    z-index: 1;
    font-weight: bold;
    font-size: 55px;
    line-height: 107px;
  }

  .grid-row {
    margin-bottom: 15px;
  }
  .grid-row:last-child {
    margin-bottom: 0;
  }
  .grid-row:after {
    content: "";
    display: block;
    clear: both;
  }

  .grid-cell {
    width: 106.25px;
    height: 106.25px;
    margin-right: 15px;
    float: left;
    border-radius: 3px;
    background: #d7d7d7;
    opacity: 0.35;
  }
  .grid-cell:last-child {
    margin-right: 0;
  }
</style>
