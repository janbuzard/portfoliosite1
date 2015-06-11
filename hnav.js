if (document.getElementById && document.querySelector && document.getElementsByTagName) {

var nv = {

	mainmenu : document.getElementById('menu'),
	main : document.querySelector('.mainmenu').getElementsByTagName('a')[0],

	init : function() {

	this.util.configEvents();

	this.util.addEvent(this.main, 'click', this.openMain, false);

	},

	openMain : function(evt) {
		if (nv.main && nv.mainmenu.className === 'menuhide') {
			nv.mainmenu.className = '';
		}
    else {
      nv.mainmenu.className = 'menuhide';
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

nv.init();

}