"use strict";

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

    function createWrapper(x, y) {
        let cell = document.createElement("td");

        let wrapper = cell.appendChild(ce("div", "cellwrapper"));
        wrapper.appendChild(ce("div", "label", { id: `label_${x}_${y}` })).innerHTML = ".";
        wrapper.appendChild(ce("input", "cell", { id: `input_${x}_${y}` }));

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

    function serialize() {
        let table = document.getElementById("table");
        return table.width + "," + table.height;
    }

    window.save = function save() {
        console.log(serialize());
    }

    let container = document.getElementById("tableContainer");
    container.appendChild(createTable(3, 4));

})();