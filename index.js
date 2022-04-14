//use command 'node index.js' OR 'nodemon index.js' to run the code

//use command 'npm install sqlite3' to install sqlite3
//use command 'npm install nodemon' to install nodemon
//use command 'npm install alert' to install alert

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
let alert = require('alert'); 


const names = ["A Little Red Flower",
"Bad Boys for Life",
"Frozen",
"Iron Man 3",
"Jurassic Park",
"King Solomon's Mines",
"Sonic the Hedgehog",
"Tenet",
"The Eight Hundred",
"The Million Dollar Mystery"];

const actors = ["Jackson Yee",
"Will Smith",
"Jonathan",
"Robert Downey Jr.",
"Sam Neill",
"Stewart Granger",
"Ben Schwartz",
"John David",
"Vision Wei",
"James Cruze"];

const actresses = ["Liu Haocun",
"Paola Nunez",
"Idina Menzel",
"Gwyneth Kate",
"Laura",
"Deborah Kerr",
"Colleen",
"Elizabeth",
"Augusta Holland",
"Margaret Snow"];

const directors = ["Han Yan",
"Adil & Bilal",
"Chris Buck",
"Shane Black",
"Steven Speilberg",
"Compton Benett",
"Jeff Fowler",
"Christopher Nolan",
"Guan Hu",
"Howell Hansel"];

const years = [2020,
    2020,                                                                            
    2013,
    2013,
    1993,
    1950,
    2020,
    2020,
    2020,
    1914];    

    db.serialize(function() {
        db.run("CREATE TABLE movies (name, actor, actress, director, year)");
        insertData();
        accessData();
    });
    
    db.close();

function insertData(){
    var insertQuery = db.prepare("INSERT INTO movies VALUES (?,?,?,?,?)");
    for (var i = 0; i < names.length; i++) {
        insertQuery.run(names[i], actors[i], actresses[i], directors[i], years[i]);
        console.log("Data inserted successfully...");
    }
    insertQuery.finalize();
}


function accessData(){
    db.each("SELECT * FROM movies", function(err, row) {
        if(err) return console.log(err.message);
        else console.log(row.name + " - " + row.actor+" - "+row.actress+" - "+row.director+" - "+row.year);
        // else alert(row.name + " - " + row.actor+" - "+row.actress+" - "+row.director+" - "+row.year);
        //the above line can be alternatively used to display the data in alert box
    });
}

