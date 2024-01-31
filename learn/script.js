document.addEventListener("DOMContentLoaded", function () {
  var table = new Tabulator("#example-table", {
    data: tableData,
    maxWidth: "100%",
    layout: "fitColumns",
    selectable: true,
    pagination: "local",
    dataTree: true,
    dataTreeStartExpanded: false,
    dataTreeFilter: true,
    // downloadRowRange:"selected",
    persistence: true,
    paginationSize: 50,
    paginationCounter: "rows",
    paginationSizeSelector: [10, 20, 50, 100, true],
    data: [], // Initialize with an empty dataset
    persistenceWriterFunc: function (id, type, data) {
      //id - tables persistence id
      //type - type of data being persisted ("sort", "filter", "group", "page" or "columns")
      //data - array or object of data

      localStorage.setItem("loca", JSON.stringify(data));
      console.log("setItem triggered " + id + " " + type + " " + data);
    },
    persistenceReaderFunc: function (id, type) {
      //id - tables persistence id
      //type - type of data being persisted ("sort", "filter", "group", "page" or "columns")

      storedData = localStorage.getItem("loca");
      console.log("getitemtriggered-> " + id + " " + type + " ");

      return storedData ? JSON.parse(storedData) : false;
    },
    columns: [
      {
        title: "Number",
        field: "number",
        sorter: "number",
        headerFilter: "input",
      },
      {
        title: "Date Time",
        field: "datetime",
        sorter: "datetime",
        headerFilter: "input",
      },
      { title: "Text", field: "text", headerFilter: "input" },
      {
        title: "Action",
        formatter: "buttonCross", // Using built-in cross button formatter

        headerSort: false,
        cellClick: function (e, cell) {
          var row = cell.getRow();
          row.delete();
        },
      },
      {
        title: "Download",
        formatter: "buttonTick", // Using built-in cross button formatter

        headerSort: false,
        cellClick: function (e, cell) {
          table.download("csv", "data.csv", {}, "selected");
          //working on delete.
        },
      },
    ],

    downloadConfig: {
      pdf: {
        orientation: "portrait", // set page orientation to portrait
        title: "Table Data", // add title to report
      },
      excel: {
        sheetName: "Table Data", // add sheet name to report
      },
    },
  });
  var storedData = localStorage.getItem("tabularData");
  var tableData = storedData ? JSON.parse(storedData) : [];

  function saveDataLocally(data) {
    localStorage.setItem("tabularData", JSON.stringify(data));
  }
  document.getElementById("print-table").addEventListener("click", function () {
    table.print(false, true);
  });

  function addRandomData() {
    var newData = [];
    for (var i = 0; i < 100; i++) {
      newData.push({
        number: Math.floor(Math.random() * 1000),
        datetime: new Date().toISOString(),
        text: "Text " + Math.floor(Math.random() * 100),
        _children: [
          {
            number: Math.floor(Math.random() * 1000),
            datetime: new Date().toISOString(),
            text: "Some Random Text",
          }, //child rows nested under billy bob
        ],
      });
    }
    table.addData(newData).then(() => {
      alert("Data added successfully!");
    });
    table.setPage(1); // Reset to the first page after adding data
    saveDataLocally(table.getData());
  }

  function updateColumnCount() {
    document.getElementById("columnCount").value = `${
      table.getColumns().length
    } / ${table.columnManager.columns.length}`;
  }

  //display rows.
  var intervalId = window.setInterval(function () {
    updateRowCount();
  }, 1000);
  // Function to update row count
  function updateRowCount() {
    var visibleRowCount = table.getPageSize();
    var totalRowCount = table.getDataCount();
    document.getElementById("visibleRowCount").innerText = visibleRowCount;
    document.getElementById("totalRowCount").innerText = totalRowCount;
  }

  document
    .getElementById("download-excel")
    .addEventListener("click", function () {
      console.log("Excel button clicked");
      table.download("csv", "data.csv", { sheetName: "MyData" });
    });
  document.getElementById("pdf-import").addEventListener("click", function () {
    console.log("pdf import button clicked!");
    table.import("csv", ".csv");
  });

  document
    .getElementById("download-pdf")
    .addEventListener("click", function () {
      console.log("PDF button clicked");
      table.download("pdf", "data.pdf", {
        orientation: "portrait",
        title: "Tabulator Data",
      });
    });

  function goToPage() {
    var pageNumber = document.getElementById("pageNumberInput").value;
    if (pageNumber && !isNaN(pageNumber)) {
      table.setPage(parseInt(pageNumber));
    }
  }

  document
    .getElementById("addDataButton")
    .addEventListener("click", addRandomData);
  document
    .getElementById("firstPageButton")
    .addEventListener("click", function () {
      table.setPage(1);
    });
  document
    .getElementById("prevPageButton")
    .addEventListener("click", function () {
      table.previousPage();
    });
  document
    .getElementById("nextPageButton")
    .addEventListener("click", function () {
      table.nextPage();
    });
  document
    .getElementById("lastPageButton")
    .addEventListener("click", function () {
      table.setPage(table.getPageMax());
    });
  document
    .getElementById("downloadPdfButton")
    .addEventListener("click", downloadPdf);
  document
    .getElementById("downloadExcelButton")
    .addEventListener("click", downloadExcel);
  document.getElementById("goToPageButton").addEventListener("click", goToPage);
  document
    .getElementById("searchInput")
    .addEventListener("input", function (e) {
      // table.setFilter("text", "like", e.target.value);
      table.setPage(parseInt(e.target.value));
    });

  table.subscribe("rowMoved", updateRowCount);
  table.subscribe("rowAdded", updateRowCount);
  table.subscribe("rowDeleted", updateRowCount);
});
