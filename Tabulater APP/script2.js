let gCount = 0;
let gDelRow= [];
document.addEventListener("DOMContentLoaded", function () {
   
    /*
    // Sample data for demonstration
    function generateRandomData(count) {
        
        const data = [];
        for (let i = 0; i < count; i++) {
            gCount = gCount + 1;
            data.push({
                number: gCount,
                dateTime: new Date().toISOString() + i,
                text: "Text " + i
            });
        }
        return data;
    }
    */
   // printIcon
    var printIcon = function(cell, formatterParams){ //plain text value
        return "<div>print</div>";
    };

    // Initialize Tabulator
    let table = new Tabulator("#table-container", {
        layout: "fitColumns",
        // layout:"fitDataStretch",
        pagination: "local",
        paginationSize: 10,
        selectable:true,
        // autoColumns:true,
        paginationCounter:"rows",
        placeholder:"Awaiting Data, Please Load File",
        paginationSizeSelector: [10, 20, 50, 100],
        columns: [
            { title: "Id", field: "id", headerFilter: "input" },
            { title: "Print row",formatter:printIcon, cellClick:function(e, cell){
                alert("Printing row data for: " + cell.getRow().getData().name);
                console.log(this);
                this.print();
            }},
            { title: "Name", field: "name", headerFilter: "input" },
            { title: "Location", field: "location", headerFilter: "input" },
            { title: "Gender", field: "gender", headerFilter: "input" },
            { title: "Rating", field: "rating", headerFilter: "input" },
            { title: "color", field: "col", headerFilter: "input" },
            { title: "Download", field: "download", },
            
        ],
        data: [], // Initialize with empty data
        // Call the function to update row count initially
        dataLoaded: function () {
            updateRowCount();
        },
        
    });
    // select row
    table.on("rowSelectionChanged", function(data, rows){
        gDelRow = data;
        console.log(data);
        document.getElementById("select-stats").innerHTML = data.length;
    });

    //upload file
    document.getElementById("file-load-trigger").addEventListener("click", function(){
    table.import("json", ".json");
    });

    /*
    // Function to update row count
    function updateRowCount() {
        
        let rowCount = table.getPageSize();
        let totalRowCount = table.getRows().length;
        document.getElementById("row-count").innerHTML = ` Total Rows: ${totalRowCount}`;
    }
    */

    // delete selected row
    document.getElementById("del-row").addEventListener("click", function(){
        try {
            if(gDelRow.length===0)
            {
                alert("plese select row for deletion")
                return;
            }
            gDelRow.forEach(element => {
                console.log(element.id);
                table.deleteRow(element.id);
            });
            alert("selected rows are deleted")
        } catch (error) {
            console.error(error)
        }
        
    });    

    // // Add data to the table
    // document.getElementById("add-data").addEventListener("click", function () {
    //     const dataCount = document.getElementById("data-count").valueAsNumber || 1;
    //     const newData = generateRandomData(dataCount);
    //     table.addData(newData);

    //     // Update row count after adding data
    //     updateRowCount();
    // });

    
    // download as excel file
    document.getElementById("download-excel").addEventListener("click", function () {
        console.log("Excel button clicked");
        table.download("xlsx", "data.xlsx", { sheetName: "MyData" });
    });

    // download as Pdf file
    document.getElementById("download-pdf").addEventListener("click", function () {
        console.log("PDF button clicked");
        table.download("pdf", "data.pdf", { orientation: "portrait", title: "Tabulator Data" });
    });

    // function for printing
    document.getElementById("print").addEventListener("click", function () {
        console.log("Print button clicked");
        table.print();
    });
});

