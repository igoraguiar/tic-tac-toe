define(["require", "exports", "./table"], function (require, exports, table_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const table = new table_1.Table('#app');
    table.reset();
    Object.assign(window, { table });
    document.querySelector(`.toolbar .clear`).addEventListener('click', () => {
        table.reset();
    });
});
//# sourceMappingURL=index.js.map