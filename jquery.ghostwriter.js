/*****************************
jQuery ghostWriter plugin
*****************************/
$.fn.ghostWriter = function(string, options) {
	
	if (typeof string === 'object') {
		options = string;
		string = null;
	}
	
	var defaults = {
		cursor 		: true,
		cursorSpeed : 250,
		//keepString  : false,
		keyStart	: 10,
		keyPress    : 150,
		keySpace	: 200
	};
	
	var counter = 0;
	var timer   = null;
	
	options = $.extend(defaults, options);
	
	/**=======================================*
		Private object stores all functions
	*========================================*/
	var ghost = {
		/**
		  init ghostwriter on object
		
		  @param {Object} that jQuery object being passed by plugin
		  @private
	    */
		init : function(that) {
			
			if (!string) {
				string = that.text();
			}
			that.empty();
			
			string = string.split('');
			
			var text = $('#jq_ghost_text');
			if (!text.length) {
				console.log('test');
				that.append('<span id="jq_ghost_wrapper"><span id="jq_ghost_text"></span></span>');
				var text = $('#jq_ghost_text');

				if (options.cursor) {
					$('#jq_ghost_wrapper').append('<span id="jq_ghost_cursor">_</span>');
					setInterval(function() {
						var cursor = $('#jq_ghost_cursor');
						cursor.html() === '_' ? cursor.html('&nbsp;') : cursor.html('_');
					}, options.cursorSpeed);
				}
			}
			
			ghost.write(text, counter);
		},	//end ghost.init()
		
		/**
		  Let the man speak... err... type
		
		  @param {Object} that jQuery object being passed by plugin
		  @param {int} 	  counter
		  @private
		*/
		write : function(that, counter) {
			if (counter === 0) { //reset
				clearInterval(timer);
				that.text('');
			}
			
			var nextLetter  = string[counter];
			var text = that.text();
			text = text + nextLetter;
			that.text(text);
			counter = counter + 1;
			if (counter < string.length) {
			    var interval;
				if (nextLetter === ' ') {
			        interval = options.keySpace;
			    } else {
					interval = options.keyStart + Math.floor(Math.random()*options.keyPress);
				}
				timer = setTimeout(function() {
					ghost.write(that, counter)
				}, interval);
			}
		},	//end portfolio.morpheusTyper()
		
	}
	
	return this.each(function() {
		var that = $(this);
		counter = 0;
		timer = null;
		ghost.init(that);
	});
	
};