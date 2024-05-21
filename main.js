'use strict';

const ORDER = [
  "cili24",
  "huajiao24",
  "hawthorn23",
]

var comments = {}

function showgif(name)
{
  document.getElementById("theimg").src = "timelapses/"+name+"/"+name+".gif";
  console.log(document.getElementById("theimg"))

  let c = comments[name];
  document.getElementById("date").innerHTML = c.start + "&nbsp; &nbsp;-&nbsp; &nbsp;" + c.end
  document.getElementById("name").innerHTML = c.plant
  document.getElementById("lname").innerHTML = c.latin
  document.getElementById("descrip").innerHTML = c.comment
}

export function loadJSON(url)
{
  let ret = null;
  let request = new XMLHttpRequest();

  request.open('GET', url, false);
  request.send();

  if (request.status >= 200 && request.status < 300)
  {
    ret = JSON.parse(request.responseText);
  }
  return ret
}



let l = document.getElementById("giflist");
for (let name of ORDER)
{
  let j = loadJSON("timelapses/" + name + "/comment.json")
  if (j === null)
    continue;

  comments[name] = j;

  let btn = document.createElement('button');
  btn.classList.add("linkbutton");
  btn.innerHTML = comments[name].name
  btn.onclick = ()=> showgif(name)


  let li = document.createElement('li');
  li.appendChild(btn)

  l.appendChild(li);

  document.getElementById("theimg").onerror = () =>
  {
    document.getElementById("theimg").src = "comingsoon.png";
  }
}
