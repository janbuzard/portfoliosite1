if (document.getElementById) {

var jb = {

	// for rollover menus
	navHolder : document.getElementById('nav'), 
	navItems : document.getElementById('nav').getElementsByTagName('a'), 
	lists : document.getElementById('subnav').getElementsByTagName('ul'), 
	allNavItems : 0, 
	allLists : 0, 
 	openMenus : [], 
	pressedNav : [], 
	timer : null, 
	subMenus : [],	
	
	init : function() {
	
	// for rollover menus
	this.allNavItems = this.navItems.length; 
    this.allLists = this.lists.length;

	this.util.configEvents();

     // for rollover menus 
    this.buildMenuAssociations(); 
	
    for (var i=0; i<this.allLists; i++) { 
         this.lists[i].style.visibility = 'hidden'; 
    } 

    for (i=0; i<this.allNavItems; i++) { 
         this.navItems[i].number = i; 
    } 

    this.util.addEvent(this.navHolder, 'mouseover', this.displaySubMenu, false); 
    this.util.addEvent(this.navHolder, 'focus', this.displaySubMenu, true); 
    this.util.addEvent(this.navHolder, 'focusin', this.displaySubMenu, false); 
    this.util.addEvent(this.navHolder, 'mouseout', this.setTimer, false); 
    this.util.addEvent(this.navHolder, 'blur', this.setTimer, true); 
    this.util.addEvent(this.navHolder, 'focusout', this.setTimer, false); 	
	},
	
	// for rollover menus
	buildMenuAssociations : function() { 
 
		this.subMenus[1] = 'subnav'; 

	}, 
 
	// for rollover menus
	displaySubMenu : function(evt) { 
 
		var linkChosen = jb.util.findTarget(evt, 'a', this); 
 
		if (!linkChosen) { return; } 
 
		if (jb.timer) { clearTimeout(jb.timer); } 
 
		var menuLvl, menuToShow; 
		var num = linkChosen.number; 
 
		if (num <= 3) { menuLvl = 1; } 
 
		if (num > 3) { menuLvl = 2; } 
 
		if (jb.openMenus[menuLvl] && 	
			jb.openMenus[menuLvl] === jb.subMenus[num]) { return; } 
	
		if (jb.openMenus[menuLvl]) { jb.closeAllMenus(menuLvl); } 
 
		if (jb.subMenus[num]) { 
			menuToShow = document.getElementById(jb.subMenus[num]).style; 
			menuToShow.visibility = 'visible'; 
		} 
 
		jb.openMenus[menuLvl] = jb.subMenus[num]; 

		if (linkChosen.className) { return; } 
		linkChosen.className = 'over'; 
 
		if (jb.pressedNav[menuLvl]) { jb.pressedNav[menuLvl].className = 
''; } 
		jb.pressedNav[menuLvl] = linkChosen; 
 
		}, 
 
	setTimer : function() { 
		if (jb.timer) { clearTimeout(jb.timer); } 
		jb.timer = setTimeout('jb.closeAllMenus(1)',4000); 
	}, 
 
	closeAllMenus : function(lvl) { 
 
		for (var i=jb.openMenus.length - 1; i>=lvl; i--) { 
			if (jb.openMenus[i]) { 
				var menuToHide = document.getElementById(jb.openMenus[i]).style; 
				menuToHide.visibility = 'hidden'; 
			} 	
			jb.openMenus[i] = null; 
			if (jb.pressedNav[i]) { 
				jb.pressedNav[i].className = ''; 
				jb.pressedNav[i] = null; 
			} 
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
  
  createCookie : function(name,value,expiration,path,domain,secure) {
    var data = name + "=" + escape(value);
    if (expiration) { 
        var expiresAt = new Date();
        expiresAt.setTime(expiration);
        data += "; expires=" + expiresAt.toGMTString();
    }
    if (path) { data += "; path=" + path; }
    if (domain) { data += "; domain=" + domain; }
    if (secure) { data += "; secure"; }
    document.cookie = data;
  },
  
  findCookie : function(name) {  
    var query = name + "=";
    var queryLength = query.length;
    var cookieLength = document.cookie.length;
    var i=0;
    while (i<cookieLength) {
      var position = i + queryLength;
      if (document.cookie.substring(i,position) === query) {
         return this.findCookieValue(position);
      }
      i = document.cookie.indexOf(" ", i) + 1;
      if (i === 0) { break; }  
    }
    return null;  
  },

  findCookieValue : function(position) {
    var endsAt = document.cookie.indexOf(";", position);
    if (endsAt === -1) { endsAt = document.cookie.length; }
    return unescape(document.cookie.substring(position,endsAt));
  },
}

};

jb.init();

}