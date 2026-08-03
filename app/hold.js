


//=================================

//Reciprocals

var link = [];

function recipid(item){
   for(var i = 0; i < newarr.length; i+=1){
     var recipmax = newarr[i][0];
     var recipa = 0;
     var recipb = 0;
    for(var j = 0; j < newarr[i].length; j+=1){
    	var recipelement = newarr[i][j];

       if(recipelement >= recipmax){
        recipmax = recipelement;
        recipa = i;
        recipb = j;
              
        }
      
    }
   
   
    link.push(recipa,recipb);
   
  }
 
 
     };
   recipid();
 
 
var newlink = [];
function join(item){
	for(var i = 0; i<link.length; i+=1){
  	newlink.push(link[i]+""+link[i+=1]); 
  }
};
join();

 
 var revlink = [];
 
 revlink = link;
 
 function rev(item){
 revlink.reverse();
  }
 rev();
 


var newrevlink = [];
function revjoin(item){
	for(var i = 0; i<revlink.length; i+=1){
  	newrevlink.push(revlink[i]+""+revlink[i+=1]); 
  }
};
revjoin();


var glue = [];
function gluenewlinks(item){
	glue.push(newlink);
  glue.push(newrevlink);
}
gluenewlinks();


var dup = [];
var newdup = [];

function duplicate(item){
for(var i = 0; i < newlink.length; i++){
	var duptemp = newlink[i];
   if(newrevlink.includes(duptemp)){
    dup.push(duptemp);
    }
  	
  }

};
duplicate();



newdup = dup;
var joindup = newdup.join("");
var splitdup = joindup.split("");

var finaldup = splitdup.map(splitmap);

function splitmap(item){
	return item;
}



var unique = [];
function uniquetemp(item){
	for(var i = 0; i < finaldup.length; i++){
  			var uniquehold = finaldup[i];  
			unique.push(uniquehold);
      }
    
  }
uniquetemp();


var unique2 = [];
function uniquetemp2(item){
	for(var i = 0; i < unique.length; i++){
  	var uniquehold2 = unique[i];
    if(unique2.includes(uniquehold2)){}else{
    	unique2.push(uniquehold2);
    }
  
  }



}
uniquetemp2();


//=============================================
//Average the Reciprocals


function avgrecip(item){	

for(var i = 0; i < unique2.length; i++){
	var reciptempa = unique2[i];
  var reciptempb = unique2[i+=1];
 
		
  var recipextra = [];    
      for(var j = 0; j < newarr.length; j++){
				var recipfinala = newarr[j][reciptempa];
        var recipfinalb = newarr[j][reciptempb];
recipextra.push([recipfinala+recipfinalb]/2);             
var measure = newarr[j].length;
newarr[j].splice(reciptempa, 0, [recipfinala+recipfinalb]/2);

 }

}
  };
 
 
 avgrecip();



function avgrecip2(item){	

for(var i = 0; i < unique2.length; i++){
	var reciptempa = unique2[i];
  var reciptempb = unique2[i+=1];
    
      for(var j = 0; j < newarr.length; j++){
				var latestore = newarr[j][0];
        var recipfinala2 = newarr[j][reciptempa];
        var recipfinalb2 = newarr[j][reciptempb];
        var size = newarr[j].length;
        	for(var k = 0; k < newarr[j].length; k++){
          	newarr[reciptempa].splice(0, size);
          
          
          }


 }

}
  };
 
 
 avgrecip2();



//=============================================
//Ensure the diagonal zeros

function diagonal(item){

var count = 0;
for(var i = 0; i < newarr.length; i++){
count = i;
var vcount = 1;
var hcount = vcount*count;

    newarr[i].splice(hcount, 1, 0);
}
  
};

diagonal();


//===========================================
//Replace added items with -1's
var rowofones = [];

for(var a = 0; a < theend.length; a++){
	rowofones.push(-1);
};

function minusones(item){	

for(var i = 0; i < unique2.length; i+=1){
	var minustempa = unique2[i];
  var minustempb = unique2[i+=1];
		
  var minusextra = [];    
      for(var j = 0; j < theend.length; j++){
			//	var minusfinala = theend[j][reciptempa];
      //  var minusfinalb = theend[j][reciptempb];
//recipextra.push([recipfinala+recipfinalb]/2);             
var measure = theend[j].length;
theend[j].splice(minustempb, 1, -1);

  }

var measure = theend.length;
theend.splice(minustempa, 1, rowofones);
}

  };
 minusones();

//==========================================
// Remove the -1's

remminusones = [];
var lengthcount = 0;
var lengthstore = 0;

function close(item){
var minustempi = 0;
var minustempj = 0;
for(var i = 0; i < theend.length; i++){
  	for(var j = 0; j < theend.length; j++){
      	if(theend[i][j] != -1){
       	remminusones.push(theend[i][j]);
        lengthcount = lengthcount+1;
      
      }
      
      }
      
    }

}

close();

lengthstore = Math.sqrt(lengthcount);

var m1 = [];
  
function createm1(item){
    while(remminusones.length > 0){
    var m1temp = remminusones.splice(0,lengthstore)
    m1.push(m1temp);
    }
    };
 createm1();




