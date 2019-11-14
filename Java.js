//Detta visar SL Platsuppslag och Site id.

getdata();
function getsiteId() {

  const span = document.getElementById("info");
  savedata(span.value);
  const div = document.getElementById("siteid");
  
 
  const url = "https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/typeahead.json?key=ad3bdf9df10042aeb61dc4a07264b872&searchstring=" + span.value + "&stationsonly=True&maxresults=1";
  
  fetch(url)
    .then((resp) => resp.json())//Filen som du öppnar jason filen
    .then(function (data) {
      let info = data.ResponseData;

      return info.map(function (info) {
        div.innerHTML += info.SiteId; //+ " " + info.name + " " + info.X + " " + info.Y + '<br>';
      getrealinfo();
      hidebuttons();

      });
    })

    .catch(function (error) {
      console.log(error);
    });
}




//Denna funtion är för SL Realtidsinformation 4 som vissar Nästa avgång
function getrealinfo() {
  const span = document.getElementById("siteid").innerHTML;
  
  const div = document.getElementById("real");
  div.innerHTML=" <tr><th>Linje</th><th>Mot</th><th>Gå om</th><th>Nästa Avgång</th></tr>";
console.log(span);
console.log(div);

  const url = "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=b7c11531cd1e4197ba90387fa0236b3d&siteid=" + span + "&timewindow=60";

  fetch(url)
    .then((resp) => resp.json())//Filen som du öppnar jason filen
    .then(function (data) {
      if (document.getElementById("Metros").checked === true) {
       info = data.ResponseData.Metros;
      } else if (document.getElementById("buses").checked === true)
       {
       info = data.ResponseData.Buses;
        
      } 



//Vissar tidtabellen samt när jag ska börja gå hemifrån och nästa avgång

      return info.map(function (info) {
        if (mytime(info.ExpectedDateTime)>0){

        div.innerHTML += "<tr> <td>"+ info.LineNumber +"</td> <td>" + info.Destination +" </td> <td>" + mytime(info.ExpectedDateTime) + "min" + "</td> <td>"+ info.TimeTabledDateTime +"</td> <td>" + "</td> <td>"+ "</td> </tr>";
        }
        console.log(div);
      })
    })
    .catch(function (error) {
      console.log(error);
    });

}



//Denna funtion sparar och hämtar din hållplats
function getdata(){

const url = "https://cors-anywhere.herokuapp.com/http://primat.se/services/data/hakimlaoukili@gmail.com-tidtabell_app.json";

  fetch(url)
    .then((resp) => resp.json())//Filen som du öppnar jason filen

    .then(function (data) {
      let info = data.data;
      return info.map(function (info) {
        document.getElementById("info").value = info.Station; /* + " " + " <br> " +" <br>"+"<br>"+ info.DisplayTime; + "<br>" */
        
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}



//Denna funtion spara din senaste Hållplats

function savedata(Stationsplats){

  const url = "https://cors-anywhere.herokuapp.com/http://primat.se/services/sendform.aspx?xid=tidtabell_app&xmail=hakimlaoukili@gmail.com&Station=" + Stationsplats;
  
    fetch(url)
      .then((resp) => resp.json())//Filen som du öppnar jason filen
      .then(function (data) {
        let info = data.data;
        return info.map(function (info) {
           /* + " " + " <br> " +" <br>"+"<br>"+ info.DisplayTime; + "<br>" */
          console.log(div); 
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }



 
  //När jag ska gå hemmifån 
function mytime(ExpectedDateTime){

  var date1 = new Date();
  var date2 = Date.parse(ExpectedDateTime);
  var diff = 0;
  var gåOm = 0;

  var minutediff=Math.round((date2-date1) / 1000/60)
  /* return minutediff -8;} */
  diff = Math.floor (minutediff - document.getElementById("stånd").value);
  return diff;
}



//Functionen som gömmer knapparna
 function hidebuttons(){
  document.getElementById("hide").style.display= "none";
  document.getElementById("tillbaka").style.display= "block";
   document.getElementById("real").style.display= "block";

}


//Functionen som vissar knapparna
function showbutton(){
document.getElementById("tillbaka").style.display="none";
document.getElementById("hide").style.display="block";
document.getElementById("real").style.display="none";
/* document.getElementById("real").style.display= "block"; */
} 
   


  //Goggel Maps ska länktill till
    

/*
//Reseplanerare där du söker från en destnation till en ananan
function reseplan(){
  const span = document.getElementById("siteid").innerHTML;
  const div = document.getElementById("reseplan");
console.log(span);
console.log(div);

const url = "https://cors-anywhere.herokuapp.com/https://api.resrobot.se/v2/trip.json?key=8bb73df0-2d0f-4948-b2ae-5821ee5f3d0d&findstaion";

fetch(url)
    .then((resp) => resp.json())//Filen som du öppnar jason filen
    .then(function (data) {
      let info = data.ResponseData.Metros;
      return info.map(function (info) {
        div.innerHTML += info.GroupOfLine + " <br> " + info.DisplayTime; + "<br>";
        console.log(div)
      })
    })
    .catch(function (error) {
      console.log(error);
    });

}
*/

