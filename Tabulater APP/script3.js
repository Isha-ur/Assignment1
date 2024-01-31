document.addEventListener("DOMContentLoaded", function () {
    let tableData = [];
    let table = new Tabulator("#table-container", {
      maxWidth: "100%",
      layout: "fitColumns",
      selectable: true,
      pagination: "local",
      dataTree: true,
      dataTreeStartExpanded: false,
      dataTreeFilter: true,
      persistence: true,
      paginationSize: 50,
      paginationCounter: "rows",
      paginationSizeSelector: [10, 20, 50, 100, true],
      data: [], // Initialize with an empty dataset
      
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
            let strFileName = cell.getRow().getData().name;
            table.download("csv", strFileName, {}, "selected");
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
    
    function generateRandomData(count) {
        var newData = [];
        for (var i = 0; i < count; i++) {
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
        return newData;
      }
    
    

     // Add data to the table
    document.getElementById("add-data").addEventListener("onclick", function () {
        const dataCount = document.getElementById("data-count").valueAsNumber;
        const newData = generateRandomData(dataCount);
        table.addData(newData);
    });
  });