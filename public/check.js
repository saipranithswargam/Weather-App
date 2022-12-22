
import someobject from ('object.json')



document.querySelector('.head').style.color = "red";

const data = JSON.stringify(someobject)

const d =  JSON.parse(data);

document.querySelector('.head').innerHTML = d[0].name;