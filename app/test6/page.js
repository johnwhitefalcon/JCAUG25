




export default function Home() {
    const arr = [[0,0.1,0.32,0.38],
                 [0.1,0,0.05,0.41],
                 [0.32,0.05,0,0.58],
                 [0.38, 0.41,0.58,0]]
    
 
    
const tester = []
function avgrecip1(item){	
var count = 0
var counta = 0
 for(var i = 0; i < arr.length; i++){
counta = count + i
   var extratemp = 555

      
  arr[i].splice(i, 0, extratemp)


 }

 
   };
  
  
  avgrecip1();

function push0(item){
  

 arr[arr.length-1].push(555)

  

}
push0();


  console.log(arr)
      
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
    




