if (document.getElementById && document.getElementsByTagName) {

var pu = {

	content : document.getElementById('content').getElementsByTagName('ul'),

	init : function() {

	this.util.configEvents();

	var cont = this.content.length;
  	for (var i=0; i<cont; i++) {
  		this.util.addEvent(this.content[i], 'click', this.openPopup, false);
  	}
	},

	openPopup : function(evt) {
		var ancLinks = pu.util.findTarget(evt, 'a', this);
		if (!ancLinks) {return;}
		var ancLen = pu.content.length;
		for (var i=0; i<ancLen; i++) {
			pu.util.stopDefault(evt);
			var wind;
			wind = window.open(ancLinks.href, 'newwindow', 'scrollbars=1,resizable=1,location=1,left=30, top=70');
			wind.focus();
			return false;
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

pu.init();

}