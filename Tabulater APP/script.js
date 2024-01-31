document.addEventListener("DOMContentLoaded", function () {
    // printIcon
    let printIcon = function(cell, formatterParams) {
        // plain text value
        return "<button >Print</button>";
    };

    /*
    // data for nested table
    let arrtableDataNested = [
        {name:"Oli Bob", location:"United Kingdom", gender:"male", col:"red", dob:"14/04/1984", _children:[
            {name:"Mary May", location:"Germany", gender:"female", col:"blue", dob:"14/05/1982"},
            {name:"Christine Lobowski", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
            {name:"Brendon Philips", location:"USA", gender:"male", col:"orange", dob:"01/08/1980", _children:[
                {name:"Margret Marmajuke", location:"Canada", gender:"female", col:"yellow", dob:"31/01/1999"},
                {name:"Frank Harbours", location:"Russia", gender:"male", col:"red", dob:"12/05/1966"},
            ]},
        ]},
        {name:"Jamie Newhart", location:"India", gender:"male", col:"green", dob:"14/05/1985"},
        {name:"Gemma Jane", location:"China", gender:"female", col:"red", dob:"22/05/1982", _children:[
            {name:"Emily Sykes", location:"South Korea", gender:"female", col:"maroon", dob:"11/11/1970"},
        ]},
        {name:"James Newman", location:"Japan", gender:"male", col:"red", dob:"22/03/1998"},
    ];

    // nested table
    var table = new Tabulator("#table-container", {
        height:"311px",
        data:arrtableDataNested,
        dataTree:true,
        dataTreeStartExpanded:true,
        columns:[
        {title:"Name", field:"name", width:200, responsive:0}, 
        {title:"Location", field:"location", width:150},
        {title:"Gender", field:"gender", width:150, responsive:2}, 
        {title:"Favourite Color", field:"col", width:150},
        {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", width:150},
        ],
    });
    */

    
    // Initialize Tabulator
    let table = new Tabulator("#table-container", {
       /* maxWidth: "100%",
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        selectable: true,
        paginationCounter: "rows",
        placeholder: "Awaiting Data, Please Load File",
        paginationSizeSelector: [10, 20, 50, 100],*/
        layout: "fitColumns",
            pagination: "local",
            paginationSize: 10,
            selectable: true,
            paginationCounter: "rows",
            placeholder: "Awaiting Data, Please Load File",
            autoColumns:true,
            paginationSizeSelector: [10, 20, 50, 100],

        columns: [
            { title: "Id", field: "id", headerFilter: "input" },
            { title: "Print row", formatter: printIcon ,cellClick:function(e, cell){
                alert("Printing row data for: " + cell.getRow().getData().name);
                console.log(this);
                rowData = cell.getRow().getData();
                console.log(rowData);
                printRow(rowData);
            }
            },
            { title: "Name", field: "name", headerFilter: "input" },
            { title: "Location", field: "location", headerFilter: "input" },
            { title: "Gender", field: "gender", headerFilter: "input" },
            { title: "Rating", field: "rating", headerFilter: "input" },
            { title: "Color", field: "col", headerFilter: "input" },
            
        ],
        data: [], // Initialize with empty data
    });
    

    // Initialize Tabulator
    function printTable()
    {
        printtable.print();
    }
    let printtable;

    function printRow(objdata)
    {
        printtable = new Tabulator("#print-container", {
            layout: "fitColumns",
            pagination: "local",
            paginationSize: 10,
            selectable: true,
            paginationCounter: "rows",
            placeholder: "Awaiting Data, Please Load File",
            autoColumns:true,
            paginationSizeSelector: [10, 20, 50, 100],
            
            data: [objdata]// Initialize with empty data
        });
    }
    

    // Other event listeners and configurations...

    document.getElementById("file-load-trigger").addEventListener("click", function(){
        table.import("json", ".json");
    });

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

    document.getElementById("download-excel").addEventListener("click", function () {
        console.log("Excel button clicked");
        table.download("xlsx", "data.xlsx", { sheetName: "MyData" });
    });

    document.getElementById("download-pdf").addEventListener("click", function () {
        console.log("PDF button clicked");
        table.download("pdf", "data.pdf", { orientation: "portrait", title: "Tabulator Data" });
    });

    document.getElementById("print").addEventListener("click", function () {
        console.log("Print button clicked");
        table.print();
    });

    document.getElementById("printSelectedRow").addEventListener("click", function () {
        console.log("Print button clicked");
        printtable.print();
    });

});