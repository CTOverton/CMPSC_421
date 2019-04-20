/*
let ringPositions = [
    [ // Tower 0
        1,
        2,
        3
    ],
    [ // Tower 1
        null,
        null,
        null
    ],
    [ // Tower 2
        null,
        null,
        null
    ],
];
let observers = [];
function emitChange() {
    observers.forEach(o => o && o(ringPositions))
}
export function observe(o) {
    observers.push(o);
    emitChange();
    return () => {
        observers = observers.filter(t => t !== o)
    }
}
export function moveRing(fromTower, toTower) {

    let ring = getTopRing(fromTower);
    let other = getTopRing(toTower);
    if (ring.value !== null) {
        if (other.value == null) {
            ringPositions[fromTower][ring.height] = null;
            ringPositions[toTower][other.height] = ring.value;
            emitChange()
        } else {
            if (ring.value < other.value) {
                if (other.height-1 !== -1 && ringPositions[toTower][other.height-1] == null) {
                    ringPositions[fromTower][ring.height] = null;
                    ringPositions[toTower][other.height-1] = ring.value;
                    emitChange()
                }
            }
        }

    }
    console.log(ringPositions);
}

function getTopRing(tower) {
    for (let i = 0; i<ringPositions[tower].length; i++) {
        if (ringPositions[tower][i] != null) {
            return {
                height: i,
                value: ringPositions[tower][i]
            }
        }
    }
    return {
        height: 2,
        value: null
    };
}*/
