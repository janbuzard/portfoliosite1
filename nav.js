if (document.getElementById && document.querySelector && document.getElementsByTagName) {

var nvp = {

	submenu : document.getElementById('subnav'),
	mainmenu : document.getElementById('menu'),
	subnav : document.getElementById('nav'),
	main : document.querySelector('.mainmenu').getElementsByTagName('a')[0],
	port : document.querySelector('.portmenu').getElementsByTagName('a')[0],

	init : function() {

	this.util.configEvents();

	this.util.addEvent(this.main, 'click', this.openMain, false);
	this.util.addEvent(this.port, 'click', this.openPort, false);

	},

	openMain : function(evt) {
		if (nvp.main && nvp.mainmenu.className === 'menuhide') {
			nvp.mainmenu.className = '';
		}
    else {
      nvp.mainmenu.className = 'menuhide';
    }
	},

	openPort : function(evt) {
		if (nvp.port && nvp.submenu.className === 'menuhide') {
			nvp.submenu.className = '';
			nvp.subnav.className = '';
		}
    else {
      nvp.submenu.className = 'menuhide';
      nvp.subnav.className = "backhide";
    }
	},

util : {

  configEvents : function() {
    
    if (document.addEventListener) {
    
        this.addEvent = function(el, type, func, capture) {
          el.addEventListener(type, func, capture);  
        };
 
        this.stopBubble = function(evt) { evt.stopPropagation(); };

        this.stopDefault = function(evt) { evt.preventDefault(); };

        this.findTarget = function(evt, targetNode, container) {
          var currentNode = evt.target;
          while (currentNode && currentNode !== container) {
            if (currentNode.nodeName.toLowerCase() === targetNode) {
                return currentNode; break;
            }
            else { currentNode = currentNode.parentNode; }
          };
          return false;
        };
    }
    
    else if (document.attachEvent) {
    
        this.addEvent = function(el, type, func) {
          el["e" + type + func] = func;
          el[type + func] = function() { el["e" + type + func](window.event); };
          el.attachEvent("on" + type, el[type + func]);
        };

        this.stopBubble = function(evt) { evt.cancelBubble = true; };

        this.stopDefault = function(evt) { evt.returnValue = false; };

        this.findTarget = function(evt, targetNode, container) {
          var currentNode = evt.srcElement;
          while (currentNode && currentNode !== container) {
            if (currentNode.nodeName.toLowerCase() === targetNode) {
                return currentNode; break;
            }
            else { currentNode = currentNode.parentNode; }
          };
          return false;
        };
    }
  },
}

};

nvp.init();

}