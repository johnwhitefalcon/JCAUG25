




export default function Home() {
    const arr = [[0,0.1,0.32,0.38],
                 [0.1,0,0.05,0.41],
                 [0.32,0.05,0,0.58],
                 [0.38, 0.41,0.58,0]]
    
   
     
 var maxindexes = [0,3,1,2];
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
    
     const filtarr = [];

     for (let i = 0; i < arr.length; i++) {
         // Use filter correctly
         let filteredRow = arr[i].filter(function(num) {
             return num !== 150; // Return values that are not 150
         });
     
         // Push the filtered row to filtarr
         filtarr.push(filteredRow);
     }
       
         
     
    
    
    
 //   console.log(arr)
console.log(filtarr)


    return (
      <div className="">
        
        {filtarr
      
      
      }
    
    
      </div>
    );
    
    }
    




