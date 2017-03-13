/*global $*/
$('#contactus').on('click', function (e) {
    var fieldsArr = ['message','email','name'];
    var fields = {};
    for(var x = 0;x<fieldsArr.length;x++){
        fields[fieldsArr[x]] = $('#' + fieldsArr[x]).val();
    }
    var postBody = {
        endpoint : "M-C-C/assets",
        title    : fields.message.substr(0,20),
        body     : 'Name: ' + fields.name + '\nEmail: ' + fields.email +'\n\n' + fields.message
    }
    console.log(postBody);
    if(fields.message && fields.email && fields.name){
        contactUs(postBody);
    } else {
        //show whats required that they missed
        var error = 'Missing ';
        for(var y = 0;y<fieldsArr.length;y++){
            if (fields[fieldsArr[y]] == ''){
                error += fieldsArr[y].charAt(0).toUpperCase() + fieldsArr[y].substr(1,fieldsArr[y].length) + ', ';
            }
        }
        $('#danger').text(error.substr(0,error.length-2) + '.');
        $('#danger').removeClass('hide');
    }

})
function contactUs(obj){
    //disable form
    
    var requestBody = JSON.stringify(obj); 
    console.log(requestBody);
	var r = new XMLHttpRequest();
    r.open("POST", "https://mcc-issue.herokuapp.com/api/issue", true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.onreadystatechange = function () {
      if (r.readyState != 4 || r.status != 200) {
        //alert("Success: " + r.responseText);
        
        $('#info').removeClass('hide');
        console.log('r.responseText: ' + r.responseText);
        console.log('r.response: ' + r.response);
        var responseObj = r.responseText;
        //var obj = r.responseText;
        $('#info').html('<a target="_blank" href="'+responseObj.url+'">Thanks for submitting this feedback</a>');
      }
    };
    r.send(requestBody);
}

/*global L*/

var map = L.map('map').setView([44.980642, -93.269924], 20);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([44.980642, -93.269924]).addTo(map)
    .bindPopup('<a href="http://www.hclib.org/about/locations/minneapolis-central">Central Library</a>')
    .openPopup();