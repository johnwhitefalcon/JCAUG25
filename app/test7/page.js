

export default function Home() {
const arr = [[0,0.1,0.32,0.38],
             [0.1,0,0.05,0.41],
             [0.32,0.05,0,0.58],
             [0.38, 0.41,0.58,0]]

//Highest Correlation
            var maxes = [];
            var maxindexes = [];
            const print = []
            
            function highestcorrelation(item){
               for(var i = 0; i < arr.length; i+=1){
                 var tempmax = arr[i][0];
                 var holda = 0;
                  var holdb = 0;
                for(var j = 0; j < arr[i].length; j+=1){
                  var currentelement = arr[i][j];
                 
                   if(currentelement > tempmax){
                    tempmax = currentelement;
                    holda = i;
                    holdb = j;
                          
                    }
                  
                }
               
                maxes.push(tempmax);
               console.log(holda)
                maxindexes.push( parseInt(holda.toString().padStart(2, "0"), 10),
  parseInt(holdb.toString().padStart(2, "0"), 10));
               
              }
             
             
                 };
               highestcorrelation();
             
               var newlink = [];
               function join(item){
                 for(var i = 0; i<maxindexes.length; i+=1){
                   newlink.push(maxindexes[i]+""+maxindexes[i+=1]); 
                 }
               };
               join();

var newlink1 = newlink.map(Number);
console.log(newlink1)
//jc try and do it step by step--the longest way possible
// var newlink = [24, 56, 13, 42];

// Convert the array into a string and reverse it
const strNum = newlink1.toString();
const revnewlink = strNum.split('').reverse().join('');
const resultseen = [];
const finalseen = [];

function ddd() {
  for (let i = 0; i < newlink1.length; i++) {
    const num1 = newlink1[i].toString();
    const rev1 = num1.split('').reverse().join('');
    const numrev1 = Number(rev1);

    // Check if the reversed number exists and is distinct
    if (newlink1.includes(numrev1) && newlink1[i] !== numrev1) {
      resultseen.push(newlink1[i]);
      // Remove both the original number and its reversed counterpart to avoid duplication
      newlink1.splice(i, 1); // Remove current number
      newlink1.splice(newlink1.indexOf(numrev1), 1); // Remove reversed counterpart
      i--; // Adjust loop index after removal
    }
  }
}

ddd();
 

const rec1 = resultseen.toString();
const rec2 = rec1.split('');
const unique2 = [];

function convert(){
for(var i = 0; i < rec2.length; i++){
  var con1 = rec2[i]
  unique2.push(Number(con1))
}

}
convert();
// Jc it might be best to average the reciprocals here and then delete the variables that are less than critical r after

// //=============================================
// //Average the Reciprocals
 var recipextra = [];


function avgrecip(item){	

  for(var i = 0; i < unique2.length; i+=2){
    var reciptempa = unique2[i];
    var reciptempb = unique2[i+=1];
   
        for(var j = 0; j < arr.length; j++){
          var recipfinala = arr[j][reciptempa];
          var recipfinalb = arr[j][reciptempb];
  recipextra.push([recipfinala+recipfinalb]/2);  
  

  
   }

  }
    };
   
   
   avgrecip();

//this is just a testblock to check if my loop is detecting the correct maxindexes
//because the first maxindes is 3 and not 03


function drumtest() {
  for (var i = 0; i < maxindexes.length; i += 2) {
    let tempat = maxindexes[i];
    let tempbt = maxindexes[i + 1];

    let savet = arr[tempat][tempbt];
    console.log(savet)

    }
     return arr;
  }
 

drumtest();
                


// jc it is here you need to label the critical r 150 or something similar so you
// do not change the matrix. Then after you have done all the operations on the array filter the 150's  
//jc the below is working --you just need to find the right maxindexes now and correct the first maxindex
//the below works --you just need to splice to replace the correct whole row and column with 150

// var penultimate = [];
// var criticalr = 0.5;
// for(var l = 0; l < arr.length; l++){
//                 penultimate.push(150);
//                     };

// function drum() {
//   for (var i = 0; i < maxindexes.length; i += 2) {
//     let tempa = maxindexes[i];
//     let tempb = maxindexes[i + 1];

//     let save = arr[tempa][tempb];

//     for (var j = 0; j < arr.length; j++) {
//       for (var k = 0; k < arr[j].length; k++) {
//         if (arr[j][k] === save && save < criticalr) {
//           arr[j][k] = 150;
//         }
//       }
//     }
//   }
//   return arr;
// }

// drum();
                

// jc you are ready to test the below and see if it puts 555 in the right spots. 
// The below works but only for the row/ it does not put 555 in the column(up to fixing this)

// var store555 = [];

// for(var l = 0; l < arr.length; l++){
//                 store555.push(555);
//                     };



//                     function drum555() {
//                       for (var i = 0; i < unique2.length; i += 2) {
//                           let temparecip = unique2[i];
//                           let tempbrecip = unique2[i + 1];
                         
                  
//                           // Get the value to compare
//                           let saverecip = arr[temparecip][tempbrecip];
//                           console.log(saverecip)
//                           for(var y = 0; y<arr.length; y++){

//                       // Replace the corresponding column in all rows
                             
//                                   saverecip = 555;

//                           }
                 
                          

                              
                        
//                             arr.splice(temparecip, 1, store555); 
//                       }
//                       return arr;
//                   }

//  drum555();

// console.log(arr);



return (
  <div className="">
    
    {arr
    /* {theend1.map(function(item, index) {
      return (
        <div key={index}>
          {item}
          <br />
        </div>
      );
    })} */}


  </div>
);

}








