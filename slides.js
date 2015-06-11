if (document.getElementById && document.querySelectorAll) {

var jbs = {

	images : document.getElementById('content').querySelectorAll('.image'),
	nexti : document.getElementById('next'),
	previ : document.getElementById('prev'),
  one : document.getElementById('one'),
  two : document.getElementById('two'),
  three : document.getElementById('three'),
  four : document.getElementById('four'),
  five : document.getElementById('five'),
  six : document.getElementById('six'),
  seven : document.getElementById('seven'),
  i : 0,
	
	init : function() {

	this.util.configEvents();

	this.util.addEvent(this.nexti, 'click', this.displayNext, false);
	this.util.addEvent(this.previ, 'click', this.displayPrev, false);
},

	// next button
	displayNext : function(evt) {
		var nextImg = jbs.util.findTarget(evt, 'a', this);
		if (!nextImg) {return;}
    jbs.setClasses();
    switch (jbs.images[jbs.i].id) {
      case 'one' :
        jbs.two.className = 'image';
        jbs.i++;
        break;
      case 'two' :
        jbs.three.className = 'image';
        jbs.i++;
        break;
      case 'three' :
        jbs.four.className = 'image';
        jbs.i++;
        break;
      case 'four' :
        jbs.five.className = 'image';
        jbs.i++;
        break;        
      case 'five' :
        jbs.six.className = 'image';
        jbs.i++;
        break;
      case 'six' :
        jbs.seven.className = 'image';
        jbs.i++;
        break;
      case 'seven' :
        jbs.one.className = 'image';
        jbs.i++;
        break;
    }
		jbs.increment();
	},
	
  // previous button
	displayPrev : function(evt) {
		var prevImg = jbs.util.findTarget(evt, 'a', this);
		if (!prevImg) {return;}
    jbs.setClasses();
    switch (jbs.images[jbs.i].id) {
      case 'one' :
        jbs.seven.className = 'image';
        jbs.i++;
        break;
      case 'two' :
        jbs.one.className = 'image';
        jbs.i++;
        break;
      case 'three' :
        jbs.two.className = 'image';
        jbs.i++;
        break;
      case 'four' :
        jbs.three.className = 'image';
        jbs.i++;
        break;        
      case 'five' :
        jbs.four.className = 'image';
        jbs.i++;
        break;
      case 'six' :
        jbs.five.className = 'image';
        jbs.i++;
        break;
      case 'seven' :
        jbs.six.className = 'image';
        jbs.i++;
        break;
    }
    jbs.increment();
	},
	
  setClasses : function() {
    jbs.one.className = 'image nodisp'; 
    jbs.two.className = 'image nodisp';  
    jbs.three.className = 'image nodisp';
    jbs.four.className = 'image nodisp';
    jbs.five.className = 'image nodisp';
    jbs.six.className = 'image nodisp';
    jbs.seven.className = 'image nodisp';
  },

  increment : function() {
    if (jbs.i === 7) {
      jbs.i = 0;
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

jbs.init();

}