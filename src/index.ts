import { Table } from "./table";

const table = new Table('#app');
table.reset();
Object.assign(window, { table });
document.querySelector(`.toolbar .clear`).addEventListener('click', () => {
    table.reset();
});