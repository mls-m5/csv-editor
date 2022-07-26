"use strict";

(function () {
    let serialize = window.serialize = {};

    serialize.jsonDump = function jsonDump() {
        let table = byId("table");

        let width = table.width;
        let height = table.height;

        let result = {};

        result.width = width;
        result.height = height;
        let data = result.data = [];

        for (let y = 0; y < height; ++y) {
            let row = data[y] = [];
            for (let x = 0; x < width; ++x) {
                let cellValue = byId(`input_${x}_${y}`);
                row[x] = cellValue.value;
            }
        }
        return result;
    }

    function sanitizeCsv(str) {
        let useQuotation = false;
        if (str.indexOf(",") != -1 || str.indexOf("\"") != -1) {
            useQuotation = true;
        }
        str = str.replaceAll("\"", "\"\"");
        if (useQuotation) {
            str = `"${str}"`;
        }
        return str;
    }

    serialize.csvDump = function csvDump() {
        let table = byId("table");

        let width = table.width;
        let height = table.height;

        let rows = [];

        for (let y = 0; y < height; ++y) {
            let row = "";
            for (let x = 0; x < width; ++x) {
                let cellValue = byId(`input_${x}_${y}`);
                row += sanitizeCsv(cellValue.value) + ",";
            }
            rows.push(row);
        }

        return rows.join("\n");
    }
})();

(function () {
    function ce(tag, className, attributes) {
        let element = document.createElement(tag);
        if (typeof className !== "undefined" && className != "") {
            element.classList.add(className);
        }
        if (typeof attributes !== "undefined") {
            for (let name in attributes) {
                element.setAttribute(name, attributes[name]);
            }
        }
        return element;
    }

    function getInput(x, y) {
        return byId(`input_${x}_${y}`)
    }

    function getLabel(x, y) {
        return byId(`label_${x}_${y}`);
    }

    function updateCell(x, y) {
        getLabel(x, y).innerText = getInput(x, y).value;
    }

    function createWrapper(x, y) {
        let cell = document.createElement("td");

        let wrapper = cell.appendChild(ce("div", "cellwrapper"));
        let label = wrapper.appendChild(ce("div", "label", { id: `label_${x}_${y}` }));
        label.innerHTML = ".";
        label.x = x;
        label.y = y;
        let input = wrapper.appendChild(ce("input", "cell", { id: `input_${x}_${y}` }));
        input.x = x;
        input.y = y;
        input.on("change", () => updateCell(x, y));

        return cell;
    }

    function createRow(y, width) {
        let row = document.createElement("tr");
        for (let x = 0; x < width; ++x) {
            let cell = createWrapper(x, y);
            row.appendChild(cell);
        }
        return row;
    }

    function createTable(width, height) {
        let table = ce("table", "", { id: "table" })
        let body = table.appendChild(ce("tbody"));
        for (let i = 0; i < height; ++i) {
            let row = createRow(i, width);
            body.appendChild(row);
        }
        table.width = width;
        table.height = height;
        return table;
    }


    window.save = function save() {
        console.log(serialize.jsonDump());
        console.log(serialize.csvDump());
    }

    let container = byId("tableContainer");
    container.appendChild(createTable(3, 4));
})();