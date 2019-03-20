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

      <!-- Top Scores List -->
      <v-layout row>
        <v-flex xs12>

          <p>Score {{ score }}</p>

          <v-form
                  ref="form"
          >
            <v-text-field
                    v-model="name"
                    label="Name"
            ></v-text-field>


            <v-btn
                    color="info"
                    @click="newGame"
            >
              New Game
            </v-btn>
            <v-btn
                    color="info"
                    @click="saveScore"
            >
              Save Score
            </v-btn>
          </v-form>

            <v-list two-line subheader>
              <v-subheader inset>Top Scores</v-subheader>

              <v-list-tile
                      v-for="item in items"
                      :key="item.name"
                      @click=""
              >

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.score }}</v-list-tile-sub-title>
                </v-list-tile-content>


              </v-list-tile>
            </v-list>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>

  import firebase from 'firebase';

  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyCAE641Q4bEEQf8nkqOlr0h9dk8iWh-1Ew",
    authDomain: "cmpsc421-hw1.firebaseapp.com",
    databaseURL: "https://cmpsc421-hw1.firebaseio.com",
    projectId: "cmpsc421-hw1",
    storageBucket: "cmpsc421-hw1.appspot.com",
    messagingSenderId: "177821847281"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();

  export default {
    data: function() {
      return {
        score: 0,
        name: '',
        docRefId: null,
        cells: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null]
        ],
        items: [
          /*{
            name: 'Christian',
            score: 2048,
            date: 'time'
          },
          {
            name: 'Person 2',
            score: 208,
            date: 'time'
          },
          {
            name: 'Person 3',
            score: 20,
            date: 'time'
          }*/
        ]
      };
    },
    methods: {
      newGame: function() {
        console.log('New Game');

        this.cells = [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null]
        ];

        this.addTile();
        this.addTile();
      },
      addTile: function() {
        let cells = this.cells;
        let available = this.availableCells();
        if (available.length) {
          let cell = available[Math.floor(Math.random() * available.length)];
          let value = Math.random() < 0.9 ? 2 : 4;
          cells[cell.x][cell.y] = value;
          this.updateGrid(cells);
        }
      },
      updateGrid: function (state) {
        let cells = [];

        for (let x = 0; x < 4; x++) {
          let row = cells[x] = [];

          for (let y = 0; y < 4; y++) {
            let value = state[x][y];
            row.push(value ? value : null);
          }
        }

        this.cells = cells;
      },
      availableCells: function () {
        let available = [];
        for (let x=0; x < 4; x++){
          for (let y=0; y < 4; y++){
            if (this.cells[x][y] == null) {
              available.push({ x: x, y: y });
            }
          }
        }
        return available;
      },
      move: function(direction) {
        switch (direction) {
          case 0: this.moveUp(); break;
          case 1: this.moveRight(); break;
          case 2: this.moveDown(); break;
          case 3: this.moveLeft(); break;
          default: break;
        }
      },
      moveRight: function() {
        let cells = this.cells;
        let i, j, col;
        for(i = 0; i < 4; i++) {
          for(j = 4 - 2; j >= 0; j--) {
            if(cells[i][j]) {
              col = j;
              while (col + 1 < 4) {
                if (!cells[i][col + 1]) {
                  cells[i][col + 1] = cells[i][col];
                  cells[i][col] = 0;
                  col++;
                } else if (cells[i][col] == cells[i][col + 1]) {
                  cells[i][col + 1] *= 2;
                  this.score +=  cells[i][col + 1];
                  cells[i][col] = 0;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        this.addTile();
        this.updateGrid(cells);
      },
      moveLeft: function() {
        let cells = this.cells;
        let i, j, col;
        for(i = 0; i < 4; i++) {
          for(j = 1; j < 4; j++) {
            if(cells[i][j]) {
              col = j;
              while (col - 1 >= 0) {
                if (!cells[i][col - 1]) {
                  cells[i][col - 1] = cells[i][col];
                  cells[i][col] = 0;
                  col--;
                } else if (cells[i][col] == cells[i][col - 1]) {
                  cells[i][col - 1] *= 2;
                  this.score +=   cells[i][col - 1];
                  cells[i][col] = 0;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        this.addTile();
        this.updateGrid(cells);
      },
      moveUp: function() {
        let cells = this.cells;
        let i, j, row;
        for(j = 0; j < 4; j++) {
          for(i = 1; i < 4; i++) {
            if(cells[i][j]) {
              row = i;
              while (row > 0) {
                if(!cells[row - 1][j]) {
                  cells[row - 1][j] = cells[row][j];
                  cells[row][j] = 0;
                  row--;
                } else if (cells[row][j] == cells[row - 1][j]) {
                  cells[row - 1][j] *= 2;
                  this.score +=  cells[row - 1][j];
                  cells[row][j] = 0;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        this.addTile();
        this.updateGrid(cells);
      },
      moveDown: function() {
        let cells = this.cells;
        let i, j, row;
        for(j = 0; j < 4; j++) {
          for(i = 4 - 2; i >= 0; i--) {
            if(cells[i][j]) {
              row = i;
              while (row + 1 < 4) {
                if (!cells[row + 1][j]) {
                  cells[row + 1][j] = cells[row][j];
                  cells[row][j] = 0;
                  row++;
                } else if (cells[row][j] == cells[row + 1][j]) {
                  cells[row + 1][j] *= 2;
                  this.score +=  cells[row + 1][j];
                  cells[row][j] = 0;
                  break;
                } else {
                  break;
                }
              }
            }
          }
        }
        this.addTile();
        this.updateGrid(cells);
      },
      saveScore: function () {
        let that = this;
        db.collection("hw_3").add({
          name: this.name,
          score: this.score
        }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          that.docRefId = docRef.id;
        });
      }
    },
    watch: {
      score: function (val) {
        if (this.docRefId != null) {
          db.collection("hw_3").doc(this.docRefId).set({
            score: val
          }, { merge: true });
        }
      },
    },
    mounted: function () {
      this.$nextTick(function () {
        this.newGame();

        let that = this;

        // Handle Key Events
        document.addEventListener("keyup", function(event) {
          const map = {
            38: 0, // Up
            39: 1, // Right
            40: 2, // Down
            37: 3, // Left
            // 75: 0, // Vim up
            // 76: 1, // Vim right
            // 74: 2, // Vim down
            // 72: 3, // Vim left
            // 87: 0, // W
            // 68: 1, // D
            // 83: 2, // S
            // 65: 3  // A
          };

          let modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                  event.shiftKey;
          let mapped    = map[event.which];

          if (!modifiers) {
            if (mapped !== undefined) {
              event.preventDefault();
              that.move(mapped);
            }
          }
        });

        db.collection("hw_3")
                .orderBy("score", "asc")
                .onSnapshot(
                snapshot => {
                  let changes = snapshot.docChanges();
                  changes.forEach(change => {
                    if (change.type == "added") {
                      this.items.push(change.doc.data());
                    }
                    else if (change.type == "removed") {
                      for (let i=0; i < this.items.length; i++){
                        if ( this.items[i].name === change.doc.data().name) {
                          this.items.splice(i, 1);
                        }
                      }
                    }
                    else if (change.type === "modified") {
                      for (let i=0; i < this.items.length; i++){
                        if ( this.items[i].name === change.doc.data().name) {
                          this.items[i] = change.doc.data();
                        }
                      }
                    }
                  })
                }
        )

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
