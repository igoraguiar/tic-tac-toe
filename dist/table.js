define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Table = void 0;
    class Table {
        constructor(selector, size = 3) {
            this.squares = [];
            this.values = [];
            this.valuesLabels = {
                X: 'X',
                O: '⚫'
            };
            this.nextValue = 'X';
            this.winner = null;
            this.container = document.querySelector(`${selector}`);
            for (let y = 0; y < size; y++) {
                const valuesRow = [];
                const divsRow = [];
                const row = document.createElement('div');
                row.className = 'row';
                this.squares.push(divsRow);
                this.values.push(valuesRow);
                for (let x = 0; x < size; x++) {
                    const div = document.createElement('div');
                    div.className = 'square';
                    row.appendChild(div);
                    div.appendChild(document.createElement('span'));
                    div.addEventListener('click', () => {
                        this.handleMove(y, x);
                    });
                    divsRow.push(div);
                    valuesRow.push(' ');
                }
                this.container.appendChild(row);
            }
        }
        draw() {
            this.values.forEach((row, y) => {
                row.forEach((value, x) => {
                    const div = this.squares[y][x];
                    const span = div.childNodes[0];
                    span.innerHTML = this.valuesLabels[value] || '';
                    span.className = value === 'X' ? 'x' : (value === 'O' ? 'o' : '');
                    if (value === ' ') {
                        div.classList.remove('filled');
                    }
                    else {
                        div.classList.add('filled');
                    }
                    div.classList.remove('win');
                    if (this.winner) {
                        this.winner.forEach(pair => {
                            if (pair[0] === y && pair[1] === x) {
                                div.classList.add('win');
                            }
                        });
                    }
                });
            });
        }
        reset() {
            this.values.forEach((row, y) => {
                row.forEach((value, x) => {
                    this.values[y][x] = ' ';
                });
            });
            this.nextValue = 'X';
            this.winner = null;
            this.draw();
        }
        handleMove(y, x) {
            if (this.winner) {
                return;
            }
            const currentValue = this.values[y][x];
            if (currentValue === ' ') {
                const value = this.nextValue;
                this.setValue(y, x, value);
                this.nextValue = this.nextValue === 'X' ? 'O' : 'X';
            }
        }
        setValue(y, x, value) {
            this.values[y][x] = value;
            this.winner = this.checkMove(y, x, value);
            this.draw();
        }
        checkMove(y, x, value) {
            const len = this.values.length;
            let result = [];
            result.push([y, 0]);
            for (let i = 1; i < len; i++) {
                const previous = this.values[y][i - 1];
                const current = this.values[y][i];
                if (current !== previous) {
                    result.length = 0;
                    break;
                }
                result.push([y, i]);
            }
            if (result.length > 0) {
                return result;
            }
            result.push([0, x]);
            for (let i = 1; i < len; i++) {
                const previous = this.values[i - 1][x];
                const current = this.values[i][x];
                if (current !== previous) {
                    result.length = 0;
                    break;
                }
                result.push([i, x]);
            }
            if (result.length > 0) {
                return result;
            }
            if (x === y) {
                result.push([0, 0]);
                for (let i = 1; i < len; i++) {
                    const previous = this.values[i - 1][i - 1];
                    const current = this.values[i][i];
                    if (current !== previous) {
                        result.length = 0;
                        break;
                    }
                    result.push([i, i]);
                }
                if (result.length > 0) {
                    return result;
                }
            }
            if (x + y === len - 1) {
                result.push([len - 1, 0]);
                for (let i = 1; i < len; i++) {
                    const previous = this.values[len - i][i - 1];
                    const current = this.values[len - 1 - i][i];
                    if (current !== previous) {
                        result.length = 0;
                        break;
                    }
                    result.push([len - 1 - i, i]);
                }
                if (result.length > 0) {
                    return result;
                }
            }
            return null;
        }
    }
    exports.Table = Table;
});
//# sourceMappingURL=table.js.map
