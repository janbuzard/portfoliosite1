if (document.getElementsByTagName) {

var cn = {

	content : document.getElementsByTagName('p')[0],

	init : function() {

	this.util.configEvents();

	this.util.addEvent(window, 'load', this.cont, false);

	},

	cont : function() {
    var fa = "\u006A\u0041\u006E";
    var db = '\u002e';
    var lc = "\u0062\u0075\u005A\u0061\u0072\u0064";
    var ad = '\u0040';
    var de = "\u0063\u004F\u006D\u0063\u0061\u0053\u0074";
    var nf = "\u006E\u0045\u0074";
    var x = fa + db + lc + ad + de + db + nf;
    x = x.toLowerCase();
    var cont = document.createTextNode(x);
    cn.content.appendChild(cont);
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

cn.init();

}