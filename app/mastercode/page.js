

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
               
                maxindexes.push(holda, holdb);
               
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

// jc it is here you need to label the critical r 150 or something similar so you
// do not change the matrix. Then after you have done all the operations on the array filter the 150's  

var penultimate = [];
var criticalr = 0.4;
for(var l = 0; l < arr.length; l++){
                penultimate.push(150);
                    };


                    function drum() {
                      for (var i = 0; i < maxindexes.length; i += 2) {
                          let tempa = maxindexes[i];
                          let tempb = maxindexes[i + 1];
                         
                  
                          // Get the value to compare
                          let save = arr[tempa][tempb];
                          for(var j = 0; j<arr.length; j++){}
                  for(var j = 0; j<arr.length; j++){
                          // Only proceed if save is less than criticalr
                          if (save < criticalr) {
                              // Replace the corresponding column in all rows
                             
                                  arr[j][tempb] = 150;
                              
                            }
                          }
                            arr.splice(tempa, 1, penultimate); 
                      }
                      return arr;
                  }

 drum();


//JC here you need to replace the reciprocals with 555 because you have the averaged reciprocals in recipextra
//so you need to label them 555 and not change the matrix. Then the following steps will be
//first to filter for 150 second to filter for 555(filter these two together) third add the averaged reciprocals fourth ensure zero
//on the diagonals


var store555 = [];

for(var l = 0; l < arr.length; l++){
                store555.push(555);
                    };



                    function drum555() {
                      for (var i = 0; i < maxindexes.length; i += 2) {
                          let tempa = maxindexes[i];
                          let tempb = maxindexes[i + 1];
                         
                  
                          // Get the value to compare
                          let save = arr[tempa][tempb];
                          for(var j = 0; j<arr.length; j++){}
                  for(var j = 0; j<arr.length; j++){
                          // Only proceed if save is less than criticalr
                          if (save < criticalr) {
                              // Replace the corresponding column in all rows
                             
                                  arr[j][tempb] = 150;
                              
                            }
                          }
                            arr.splice(tempa, 1, penultimate); 
                      }
                      return arr;
                  }

 drum();

















//JC YOU ARE UP TO HERE---SEE LINE ABOVE

 const filtarr = [];

 for (let i = 0; i < arr.length; i++) {
     // Use filter correctly
     let filteredRow = arr[i].filter(function(num) {
         return num !== 150; // Return values that are not 150
     });
 
     // Push the filtered row to filtarr
     filtarr.push(filteredRow);
 }
   
   



const tester = []
   function avgrecip1(item){	
const count = 0
    for(var i = 0; i < recipextra.length; i++){
const counta = count + i

      var extratemp = recipextra[counta];
         
    arr[counta].splice(arr[counta].length, 0, extratemp)
 

    }

    
      };
     
     
     avgrecip1();

  
arr.push(recipextra)

//jc loop through the arr and push 0 to the end arr[i]--diagonal zero's

function push0 (){
  if (arr.length > 0) {
    // Add 0 to the last sub-array
    arr[arr.length - 1].push(0);
  }

}
push0();


//NOW DELETE ORIGINAL RECIPROCALS columns

function avgrecip2() {
  for (var i = 0; i < unique2.length; i += 2) {
    var t1 = unique2[i];
    var t2 = unique2[i + 1];
    // Modify each row of arr directly by filtering out values
    for (var j = 0; j < arr.length; j++) {
      arr[j] = arr[j].filter(function(value) {
        return value !== arr[j][t1] && value !== arr[j][t2];
      });
    }
  }
}

avgrecip2();


//NOW DELETE ORIGINAL RECIPROCALS rows

function avgrecip3() {
  // Ensure unique2 is traversed in pairs
  for (var i = 0; i < unique2.length; i += 2) {
    var t1 = unique2[i];
    var t2 = unique2[i + 1];

    // Remove elements from the array by index
    // Note: Always remove the larger index first to avoid index shifting
    if (t1 > t2) {
      arr.splice(t1, 1); // Remove the element at index t1
      arr.splice(t2, 1); // Remove the element at index t2
    } else {
      arr.splice(t2, 1); // Remove the element at index t2
      arr.splice(t1, 1); // Remove the element at index t1
    }
  }

  // Return the modified array
  return arr;
}

avgrecip3() 
   


 var theend1 = [];
 var fin1 = Math.sqrt(arr.length);
 
 function finishremoveminus1(item){
     while(arr.length > 0){
     var tempminus = arr.splice(0,fin1)
     theend1.push(tempminus);
     }
     };
 finishremoveminus1();

// now remove the 150 critical r that have been identified above here
   


 
//  testvar.push(arr)

//  var newarr = [];

//  function remove150(item){
//  var tempi = 0;
//  var tempj = 0;
//  for(var i = 0; i < arr.length; i++){
//      for(var j = 0; j < arr[i].length; j++){
//          if(arr[i][j] != 150){
//          newarr.push(arr[i][j]);
//        }
//        }
//      }
 
//  };
//  remove150();
 
//  var theend = [];
//  var fin = Math.sqrt(newarr.length);
 
//  function finishremoveminus(item){
//      while(newarr.length > 0){
//      var tempminus = newarr.splice(0,fin)
//      theend.push(tempminus);
//      }
//      };
//  finishremoveminus();
  
// const columnCount = Math.sqrt(newarr.length);
// const columnWidth = Math.sqrt(newarr.length);  // Set column width to the square root of the array length

//=================================

//Reciprocals --basically have to repeat above because we have removed the variables less than critical r
//UP TO HERE
// const link = [];

// function recipid(item){
//    for(var i = 0; i < newarr.length; i+=1){
//      var recipmax = newarr[i][0];
//      var recipa = 0;
//      var recipb = 0;
//     for(var j = 0; j < newarr[i].length; j+=1){
//     	var recipelement = newarr[i][j];

//        if(recipelement >= recipmax){
//         recipmax = recipelement;
//         recipa = i;
//         recipb = j;
              
//         }
      
//     }
      
//     link.push(recipa,recipb);
   
//   }
  
//      };
//    recipid();
 


//    const newlink1 = [];
//    function join(item){
//      for(var i = 0; i < link.length; i+=1){
//        newlink1.push(link[i]+""+link[i+=1]); 
//      }
//    };
//    join();
   
    
//     let revlink = [];
    
//     revlink = link;
    
//     function rev(item){
//     revlink.reverse();
//      }
//     rev();
    
   
   
//    const newrevlink = [];
//    function revjoin(item){
//      for(var i = 0; i<revlink.length; i+=1){
//        newrevlink.push(revlink[i]+""+revlink[i+=1]); 
//      }
//    };
//    revjoin();
   
   
//    const glue1 = [];
//    function gluenewlinks(item){
//      glue1.push(newlink1);
//      glue1.push(newrevlink);
//    }
//    gluenewlinks();
   
   
//    var dup = [];
//    var newdup = [];
   
//    function duplicate(item){
//    for(var i = 0; i < newlink1.length; i++){
//      var duptemp = newlink1[i];
//       if(newrevlink.includes(duptemp)){
//        dup.push(duptemp);
//        }
       
//      }
   
//    };
//    duplicate();
   
   
   
//    newdup = dup;
//    var joindup = newdup.join("");
//    var splitdup = joindup.split("");
   
//    var finaldup = splitdup.map(splitmap);
   
//    function splitmap(item){
//      return item;
//    }
   
   
   
//    var unique = [];
//    function uniquetemp(item){
//      for(var i = 0; i < finaldup.length; i++){
//            var uniquehold = finaldup[i];  
//          unique.push(uniquehold);
//          }
       
//      }
//    uniquetemp();
   
   
//    var unique2 = [];
//    function uniquetemp2(item){
//      for(var i = 0; i < unique.length; i++){
//        var uniquehold2 = unique[i];
//        if(unique2.includes(uniquehold2)){}else{
//          unique2.push(uniquehold2);
//        }
     
//      }
   
   
   
//    }
//    uniquetemp2();
   

// //=============================================
// //Average the Reciprocals


// function avgrecip(item){	

//   for(var i = 0; i < unique2.length; i++){
//     var reciptempa = unique2[i];
//     var reciptempb = unique2[i+=1];
   
      
//     var recipextra = [];    
//         for(var j = 0; j < newarr.length; j++){
//           var recipfinala = newarr[j][reciptempa];
//           var recipfinalb = newarr[j][reciptempb];
//   recipextra.push([recipfinala+recipfinalb]/2);             
//   var measure = newarr[j].length;
//   newarr[j].splice(reciptempa, 0, [recipfinala+recipfinalb]/2);
  
//    }
  
//   }
//     };
   
   
//    avgrecip();
  
  
  
//   function avgrecip2(item){	
  
//   for(var i = 0; i < unique2.length; i++){
//     var reciptempa = unique2[i];
//     var reciptempb = unique2[i+=1];
      
//         for(var j = 0; j < newarr.length; j++){
//           var latestore = newarr[j][0];
//           var recipfinala2 = newarr[j][reciptempa];
//           var recipfinalb2 = newarr[j][reciptempb];
//           var size = newarr[j].length;
//             for(var k = 0; k < newarr[j].length; k++){
//               newarr[reciptempa].splice(0, size);
            
            
//             }
  
  
//    }
  
//   }
//     };
   
   
//    avgrecip2();
  
 
// //=============================================
// //Ensure the diagonal zeros

// function diagonal(item){

//   var count = 0;
//   for(var i = 0; i < newarr.length; i++){
//   count = i;
//   var vcount = 1;
//   var hcount = vcount*count;
  
//       newarr[i].splice(hcount, 1, 0);
//   }
    
//   };
  
//   diagonal(); 
//console.log(mapmaxindexes)


return (
  <div className="">
    
    {theend1
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
