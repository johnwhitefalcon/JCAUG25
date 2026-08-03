export default function Home() {
  const arr = [
    [0, 0.1, 0.32, 0.38],
    [0.1, 0, 0.05, 0.41],
    [0.32, 0.05, 0, 0.58],
    [0.38, 0.41, 0.58, 0]
  ];

  // Highest Correlation
  var maxes = [];
  var maxindexes = [];

  function highestcorrelation(item) {
    for (var i = 0; i < arr.length; i += 1) {
      var tempmax = arr[i][0];
      var holda = i;
      var holdb = 0;
      for (var j = 0; j < arr[i].length; j += 1) {
        var currentelement = arr[i][j];

        if (currentelement > tempmax) {
          tempmax = currentelement;
          holda = i;
          holdb = j;
        }
      }

      maxes.push(tempmax);
      maxindexes.push(holda, holdb);
    }
  }
  highestcorrelation();

  var newlink = [];
  function join(item) {
    for (var i = 0; i < maxindexes.length; i += 2) {
      // Pad with leading zero so '03' doesn't collapse to '3'
      var strA = maxindexes[i].toString().padStart(2, "0");
      var strB = maxindexes[i + 1].toString().padStart(2, "0");
      newlink.push(strA + strB);
    }
  }
  join();

  var newlink1 = newlink;

  const resultseen = [];

  function ddd() {
    for (var i = 0; i < newlink1.length; i += 1) {
      var num1 = newlink1[i];
      // Reverse 4-character index string (e.g., '0003' -> '0300')
      var rev1 = num1.match(/.{1,2}/g).reverse().join("");

      if (newlink1.includes(rev1)) {
        resultseen.push(newlink1[i]);
        var revIndex = newlink1.indexOf(rev1);

        if (revIndex > i) {
          newlink1.splice(revIndex, 1);
          newlink1.splice(i, 1);
        } else if (revIndex !== i) {
          newlink1.splice(i, 1);
          newlink1.splice(revIndex, 1);
        }
        i -= 1;
      }
    }
  }

  ddd();

  const unique2 = [];

  function convert() {
    for (var i = 0; i < resultseen.length; i += 1) {
      var pair = resultseen[i];
      var indexA = parseInt(pair.substring(0, 2), 10);
      var indexB = parseInt(pair.substring(2, 4), 10);
      unique2.push(indexA, indexB);
    }
  }
  convert();

  // Average the Reciprocals
  var recipextra = [];

  function avgrecip(item) {
    for (var i = 0; i < unique2.length; i += 2) {
      var reciptempa = unique2[i];
      var reciptempb = unique2[i + 1];

      for (var j = 0; j < arr.length; j += 1) {
        var recipfinala = arr[j][reciptempa];
        var recipfinalb = arr[j][reciptempb];
        recipextra.push((recipfinala + recipfinalb) / 2);
      }
    }
  }

  avgrecip();

  // 1. Add recipextra elements as a new column to each existing row
  function addcolumn(item) {
    for (var i = 0; i < arr.length; i += 1) {
      var add1 = recipextra[i];
      arr[i].splice(arr[i].length, 0, add1);
    }
  }
  addcolumn();

  // 2. Add recipextra + diagonal 0 as a new bottom row
  function addrow(item) {
    var newrow = [];
    for (var i = 0; i < recipextra.length; i += 1) {
      var ele1 = recipextra[i];
      newrow.push(ele1);
    }
    // Diagonal element for self-correlation
    newrow.push(0); 
    arr.splice(arr.length, 0, newrow);
  }
  addrow();



  return (
    <div className="">
      {arr.map(function (row, index) {
        return (
          <div key={index}>
            {row.join(", ")}
          </div>
        );
      })}
    </div>
  );
}