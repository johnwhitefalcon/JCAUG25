


export default function Home() {
    const arr = [[0,0.1,0.32,0.38],
                 [0.1,0,0.05,0.41],
                 [0.32,0.05,0,0.58],
                 [0.38, 0.41,0.58,0]]
    

   const unique2 = [2.3]
   function avgrecip2() {
    for (var i = 0; i < unique2.length; i += 2) {
      var t1 = unique2[i];
      var t2 = unique2[i + 1];
      // Modify each row of arr directly by filtering out values
      for (var j = 0; j < arr.length; j++) {
        arr[j] = arr[j].filter(function(value) {
          return value !== t1 && value !== t2;
        });
      }
    }
  }

  avgrecip2();
    
  
    
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
    

