import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useMinesweeperStore = defineStore('minesweeper', () => {
    const width = ref(9);
    const height = ref(9);
    const mines = ref(16);

    const field = reactive([]);
    //#region Поле

    let skipMines = false
    function initField() {
        // очищаем существующий массив
        field.splice(0, field.length)
        // заполняем заново
        for (let y = 0; y < height.value; y++) {
            field.push(Array(width.value).fill(0))
        }
    }

    function isCorner(x, y) {
        return (
            (x === 0 && y === 0) ||
            (x === 0 && y === height.value - 1) ||
            (x === width.value - 1 && y === 0) ||
            (x === width.value - 1 && y === height.value - 1)
        )
    }

    function placeMines() {
        const total = width.value * height.value
        const forbidCorners = total >= 9 // запрет углов на больших полях
        let remaining = Math.min(mines.value, total - (forbidCorners ? 4 : 0))

        while (remaining > 0) {
            const x = Math.floor(Math.random() * width.value)
            const y = Math.floor(Math.random() * height.value)

            const notCorner = !forbidCorners || !isCorner(x, y)
            const notMine = field[y][x] !== -1

            if (notCorner && notMine) {
                field[y][x] = -1
                remaining--
            }
        }
    }

    function countNeighbours(cx, cy) {
        let count = 0

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue

                const ny = cy + dy
                const nx = cx + dx

                if (
                    ny >= 0 && ny < height.value &&
                    nx >= 0 && nx < width.value &&
                    field[ny][nx] === -1
                ) {
                    count++
                }
            }
        }

        return count
    }

    function fillNumbers() {
        for (let y = 0; y < height.value; y++) {
            for (let x = 0; x < width.value; x++) {
                if (field[y][x] !== -1) {
                    field[y][x] = countNeighbours(x, y)
                }
            }
        }
    }

    function toggleMine(x, y) {
        skipMines = true

        var isMine = field[y][x] == -1
        mines.value += isMine ? -1 : 1
        field[y][x] = isMine ? 1 : -1

        fillNumbers()
    }

    function reloadField() {
        if (!skipMines) {
            initField()
            placeMines()
        }

        skipMines = false
        fillNumbers()
    }

    //#endregion Поле

    return { width, height, mines, field, reloadField, toggleMine };
})