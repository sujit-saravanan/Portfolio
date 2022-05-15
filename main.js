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
  const currentWindow = document.getElementById(id+"Window");
  currentWindow.style.display = "block";
  currentWindow.style.left = (window.innerWidth/2)-(currentWindow.offsetWidth/2) + "px";
  currentWindow.style.top = (window.innerHeight/2)-(currentWindow.offsetHeight/2) + "px";
  activeWindows.push(id+"Window");
  currentWindow.style.zIndex=(activeWindows.length);
  document.activeElement.blur();
  addElementToTaskbar(document.getElementById(id+"Name").innerText);
}

function addElementToTaskbar(name){
  let taskbarButton = document.createElement('button');
  taskbarButton.textContent = name;
  taskbarButton.style.marginLeft = ".1rem";
  taskbarButton.style.marginRight = ".1rem";
  taskbarButton.id = "taskbarbutton";
  document.getElementById("taskbar").insertBefore(taskbarButton, document.getElementById("clock"));
}


dragElement(document.getElementById("SkillsWindow"));
dragElement(document.getElementById("ProjectsWindow"));
dragElement(document.getElementById("ContactMeWindow"));


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elmnt.id + "Titlebar").onmousedown = dragMouseDown;
  elmnt.onmousedown = updateZIndex;
  
  function updateZIndex(e) {
    activeWindows = activeWindows.filter(item => item !== elmnt.id);
    activeWindows.unshift(elmnt.id);

    activeWindows.forEach((windowID, index) => document.getElementById(windowID).style.zIndex=(activeWindows.length-index));
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