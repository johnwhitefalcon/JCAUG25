export default function Home() {
  const arr = [
    [0, -0.1, 0.32, 0.38, 0, 0.14, 0.37, 0.47, 0.1, 0.31, -0.02, 0.22, 0.09, -0.23, -0.12, 0.37, 0.01, 0.05, -0.07, 0],
    [-0.1, 0, 0.05, 0.41, -0.16, 0.18, 0.25, 0.32, 0.35, 0.07, 0.05, 0.11, 0.09, -0.07, 0.29, 0.02, -0.05, 0.14, 0.03, 0.15],
    [0.32, 0.05, 0, 0.58, 0.16, -0.15, 0.41, 0.4, 0.06, 0.16, -0.06, 0.27, 0.29, 0.29, 0.25, 0.3, 0.21, 0.21, 0.32, 0.05],
    [0.38, 0.41, 0.58, 0, 0.09, 0.01, 0.58, 0.7, 0.29, 0.3, 0.02, 0.49, 0.04, 0.09, 0.06, 0.42, 0.23, 0.3, 0.27, -0.02],
    [0, -0.16, 0.16, 0.09, 0, 0.02, -0.2, -0.04, 0.04, -0.3, -0.09, 0.25, 0.3, 0.25, 0.05, -0.06, 0.2, 0.22, 0.46, 0.1],
    [0.14, 0.18, -0.15, 0.01, 0.02, 0, -0.02, 0, -0.11, 0.16, 0.08, -0.07, 0.09, -0.19, 0.13, -0.12, -0.1, 0.46, -0.21, -0.14],
    [0.37, 0.25, 0.41, 0.58, -0.2, -0.02, 0, 0.76, 0.12, 0.47, -0.19, 0.34, 0.04, 0.06, 0.06, 0.71, -0.07, 0.15, 0.2, -0.15],
    [0.47, 0.32, 0.4, 0.7, -0.04, 0, 0.76, 0, 0.26, 0.47, -0.08, 0.55, -0.05, -0.05, -0.09, 0.7, 0.21, 0.32, 0.32, 0.1],
    [0.1, 0.35, 0.06, 0.29, 0.04, -0.11, 0.12, 0.26, 0, 0.08, -0.14, 0.17, 0.04, -0.23, 0.03, 0.15, 0.31, 0.12, 0.11, 0.14],
    [0.31, 0.07, 0.16, 0.3, -0.3, 0.16, 0.47, 0.47, 0.08, 0, 0.16, 0.08, 0.02, 0.02, -0.18, 0.4, -0.19, 0, 0.1, -0.08],
    [-0.02, 0.05, -0.06, 0.02, -0.09, 0.08, -0.19, -0.08, -0.14, 0.16, 0, 0, -0.07, 0.32, 0.04, -0.23, -0.1, -0.09, 0.18, -0.12],
    [0.22, 0.11, 0.27, 0.49, 0.25, -0.07, 0.34, 0.55, 0.17, 0.08, 0, 0, -0.14, 0.2, -0.23, 0.27, 0.15, 0.17, 0.21, -0.03],
    [0.09, 0.09, 0.29, 0.04, 0.3, 0.09, 0.04, -0.05, 0.04, 0.02, -0.07, -0.14, 0, 0.29, 0.12, 0.02, -0.03, -0.01, 0.1, 0.1],
    [-0.23, -0.07, 0.29, 0.09, 0.25, -0.19, 0.06, -0.05, -0.23, 0.02, 0.32, 0.2, 0.29, 0, 0.22, -0.02, 0.03, -0.19, 0.42, 0.2],
    [-0.12, 0.29, 0.25, 0.06, 0.05, 0.13, 0.06, -0.09, 0.03, -0.18, 0.04, -0.23, 0.12, 0.22, 0, 0.05, -0.02, 0.12, 0.31, 0.25],
    [0.37, 0.02, 0.3, 0.42, -0.06, -0.12, 0.71, 0.7, 0.15, 0.4, -0.23, 0.27, 0.02, -0.02, 0.05, 0, 0.01, 0.24, 0.32, -0.01],
    [0.01, -0.05, 0.21, 0.23, 0.2, -0.1, -0.07, 0.21, 0.31, -0.19, -0.1, 0.15, -0.03, 0.03, -0.02, 0.01, 0, 0.09, 0.16, 0.29],
    [0.05, 0.14, 0.21, 0.3, 0.22, 0.46, 0.15, 0.32, 0.12, 0, -0.09, 0.17, -0.01, -0.19, 0.12, 0.24, 0.09, 0, 0.31, -0.04],
    [-0.07, 0.03, 0.32, 0.27, 0.46, -0.21, 0.2, 0.32, 0.11, 0.1, 0.18, 0.21, 0.1, 0.42, 0.31, 0.32, 0.16, 0.31, 0, 0.24],
    [0, 0.15, 0.05, -0.02, 0.1, -0.14, -0.15, 0.1, 0.14, -0.08, -0.12, -0.03, 0.1, 0.2, 0.25, -0.01, 0.29, -0.04, 0.24, 0]
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

  // Threshold variable
  var criticalr = 0.35;

  // 3. Replace rows/cols for highest correlation pairs below criticalr with 111
  function drum() {
    for (var i = 0; i < maxindexes.length; i += 2) {
      let tempa = maxindexes[i];
      let tempb = maxindexes[i + 1];

      let save = arr[tempa][tempb];

      if (save < criticalr) {
        // Fill row tempa with 111
        for (let col = 0; col < arr[tempa].length; col++) {
          arr[tempa][col] = 111;
        }

        // Fill column tempb across all rows with 111
        for (let row = 0; row < arr.length; row++) {
          arr[row][tempb] = 111;
        }
      }
    }
  }

  drum();

  // 4. Overwrite ALL reciprocal peak correlation rows & cols with 222
  function drumReciprocal() {
    for (var i = 0; i < unique2.length; i += 2) {
      let reciptempa = unique2[i];
      let reciptempb = unique2[i + 1];

      // Fill row reciptempa with 222
      for (let col = 0; col < arr[reciptempa].length; col++) {
        arr[reciptempa][col] = 222;
      }

      // Fill column reciptempb across all rows with 222
      for (let row = 0; row < arr.length; row++) {
        arr[row][reciptempb] = 222;
      }
    }
  }

  drumReciprocal();

  // 5. Overwrite all rows & cols used for recipfinala and recipfinalb with 333
  function drumRecipExtra() {
    for (var i = 0; i < unique2.length; i += 2) {
      let sourceColA = unique2[i];     // Source index for recipfinala
      let sourceColB = unique2[i + 1]; // Source index for recipfinalb

      // Overwrite row and col for sourceColA
      for (let col = 0; col < arr[sourceColA].length; col++) {
        arr[sourceColA][col] = 333;
      }
      for (let row = 0; row < arr.length; row++) {
        arr[row][sourceColA] = 333;
      }

      // Overwrite row and col for sourceColB
      for (let col = 0; col < arr[sourceColB].length; col++) {
        arr[sourceColB][col] = 333;
      }
      for (let row = 0; row < arr.length; row++) {
        arr[row][sourceColB] = 333;
      }
    }
  }

  drumRecipExtra();

  // 6. Filter out rows & cols with 111, 222, 333 and ensure 0 on diagonal
  let filteredArr = [];

  function filterMatrix() {
    const isSentinel = (val) => val === 111 || val === 222 || val === 333;

    // Identify which row indices consist entirely of sentinel values
    const removeIndices = new Set();

    arr.forEach((row, rowIndex) => {
      if (row.every(isSentinel)) {
        removeIndices.add(rowIndex);
      }
    });

    // Filter out both rows and columns that match sentinel indices
    filteredArr = arr
      .filter((_, rowIndex) => !removeIndices.has(rowIndex))
      .map((row) => row.filter((_, colIndex) => !removeIndices.has(colIndex)));

    // Ensure 0 along the main diagonal
    for (let i = 0; i < filteredArr.length; i++) {
      if (filteredArr[i]) {
        filteredArr[i][i] = 0;
      }
    }
  }

  filterMatrix();

  return (
    <div className="">
      {filteredArr.map(function (row, index) {
        return (
          <div key={index}>
            {row.join(", ")}
          </div>
        );
      })}
    </div>
  );
}