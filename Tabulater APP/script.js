// Sample data for demonstration
function generateRandomData() {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            number: i + 1,
            dateTime: new Date().toISOString(),
            text: "Text " + i
        });
    }
    return data;
}

// Initialize Tabulator
const table = new Tabulator("#table-container", {
    layout: "fitColumns",
    pagination: "local",
    paginationSize: 50,
    paginationSizeSelector: [10, 20, 50, 100],
    columns: [
        { title: "Number", field: "number", sorter: "number", width: 100 },
        { title: "Date Time", field: "dateTime", sorter: "datetime", width: 200 },
        { title: "Text", field: "text" },
    ],
    data: [], // Initialize with empty data
});

// Add data to the table
document.getElementById("add-data").addEventListener("click", function () {
    const newData = generateRandomData();
    table.addData(newData);
});

// Pagination controls
document.getElementById("first-page").addEventListener("click", function () {
    table.setPage(1);
});

document.getElementById("previous").addEventListener("click", function () {
    table.previousPage();
});

document.getElementById("next").addEventListener("click", function () {
    table.nextPage();
});

document.getElementById("last-page").addEventListener("click", function () {
    table.setPage(table.getPageMax());
});