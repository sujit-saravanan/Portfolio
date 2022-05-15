let activeWindows = [];


function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      alert("You've tried to open context menu");
      window.event.returnValue = false;
    });
}

function showWindow(id) {
  if (activeWindows.includes(id+"Window")){
    makeActiveWindow(id)
    return
  }
  const currentWindow = document.getElementById(id+"Window");
  currentWindow.style.display = "block";
  currentWindow.style.left = (window.innerWidth/2)-(currentWindow.offsetWidth/2) + "px";
  currentWindow.style.top = (window.innerHeight/2)-(currentWindow.offsetHeight/2) + "px";
  activeWindows.push(id+"Window");
  currentWindow.style.zIndex=(activeWindows.length);
  document.activeElement.blur();
  addElementToTaskbar(document.getElementById(id+"Name").innerText);
  makeActiveWindow(id)
}

function addElementToTaskbar(name){
  const taskbarButton = document.createElement('button');
  taskbarButton.textContent = name;
  taskbarButton.style.marginLeft = ".1rem";
  taskbarButton.style.marginRight = ".1rem";
  taskbarButton.className = "taskbarbutton";
  taskbarButton.id = name.replace(/ /g, '') + "Button"
  taskbarButton.setAttribute('onclick', "makeActiveWindow(this.textContent)");
  document.getElementById("taskbar").insertBefore(taskbarButton, document.getElementById("clock"));
}


function bringWindowToFront(id){
  deactivateTaskbarButton();
  activeWindows = activeWindows.filter(item => item !== id);
  activeWindows.unshift(id);
  activeWindows.forEach((windowID, index) => document.getElementById(windowID).style.zIndex=(activeWindows.length-index))
  setActiveTaskbarButton(id.substring(0, id.length - 6)+"Button");
}

function deactivateTaskbarButton(){
  document.getElementById(activeWindows[0].substring(0, activeWindows[0].length - 6) + "Button").className = "taskbarbutton";
}

function setActiveTaskbarButton(id){
  document.getElementById(id).className = "taskbarbuttonActive";
}

function makeActiveWindow(text){
  const id = text.replace(/ /g, '') + "Window";
  document.getElementById(activeWindows[0]).querySelector('.titlebar').id = "";
  bringWindowToFront(id);
  document.getElementById(activeWindows[0]).querySelector('.titlebar').id = "titlebarActive";
}

dragElement(document.getElementById("SkillsWindow"));
dragElement(document.getElementById("ProjectsWindow"));
dragElement(document.getElementById("ContactMeWindow"));


function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elmnt.id + "Titlebar").onmousedown = dragMouseDown;
  elmnt.onmousedown = updateZIndex;
  
  function updateZIndex() {
    makeActiveWindow(elmnt.id.substring(0, elmnt.id.length - 6));
    document.onmouseup = closeDragElement;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if ((elmnt.offsetLeft - pos1 > 0) && ((elmnt.offsetLeft - pos1 + elmnt.offsetWidth) < window.innerWidth) && (elmnt.offsetTop - pos2 > 0) && ((elmnt.offsetTop - pos2 + elmnt.offsetHeight) < window.innerHeight)) {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}