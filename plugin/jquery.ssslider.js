/*
 * https://github.com/vedovelli/jquery.ssslider
 */
;(function($){

	'use strict';
	// Scope variables
	var _container, _children, _panel_count, _slider, 
		_index = 0, _initialized = false, _slider_top, _slider_left, 
		_orientation = 'from_left', _behaviour = 'animated';

	// Plugin methods. Taken from here: http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
	var methods = {

		// Plugin initialization. Mandatory!
		init: function(config){
			_container = $(this); // Inside this anonymous function, this is an HTML fragment, not jQuery obj
			_children = _container.children(); // Get all container's children
			_panel_count = _children.length, // Keep number os slides cached
			_slider = $('<div class="$slider"></div>'); // Create the slider markup to be added to container
			if( typeof config === 'object' ){ // Checks if received config is an object
				if(config.orientation){
					_orientation = config.orientation; // Use the received information from object
				}
				if(config.behaviour){
					_behaviour = config.behaviour;
				}
			}
			_container.css({
				'position':'relative',
				'overflow': 'hidden'
			}); // Ensures container is relative positioned in order to keep absolute positioned children inside the container
			_slider.css({ // Sets the base CSS for the slider
				'position': 'absolute',
				'left': 0,
				'top': 0
			});
			methods.resize(); // See next method
			_container.html( _slider.html(_children) ); // Wraps all children (panes) inside the slider
			_initialized = true;
			return _container; // Keeps chainability
		},

		// Must be called after container resizing. Also used during initialization process
		resize: function(){
			var // Holds container width and height for further use. Local variables.
				container_width = _container.width(),
				container_height = _container.height();

			_children.css({ // Apply proper CSS on children in order to resize them to match container's dimensions
				'float': 'left',
				'overflow': 'auto',
				'width': container_width,
				'height': container_height
			});

			// This is necessary in case of container resizing. Keeps the selected pane selected.
			if(_behaviour === 'static'){
				_children = $(_children.get().reverse());
				_slider.css({
					'width': ( container_width * _panel_count ),
					'left': -( container_width * (_panel_count - 1) )
				});
			} else {
				switch(_orientation){
					case 'from_top':
						_children = $(_children.get().reverse());
						_slider.css({
							'height': ( container_height * _panel_count ),
							'top': -( container_height * ( _panel_count - 1) )
						});
						break;
					case 'from_right':
						_slider.css({
							'width': (container_width * _panel_count),
							'left': -(container_width*_index) || 0
						});
						break;
					case 'from_bottom':
						_slider.css({
							'height': (container_height * _panel_count),
							'top': -(_index * container_height) || 0
						});
						break;
					case 'from_left':
						_children = $(_children.get().reverse());
						_slider.css({
							'width': ( container_width * _panel_count ),
							'left': -(( container_width * _panel_count ) - container_width)
						});
						break;
					default:
						$.error( 'Orientation unknown. Possible values are "from_top", "from_right", "from_bottom" or "from_left"' );
						break;
				}
			}

			// Holds slider top and left position for further use
			_slider_top = parseInt(_slider.css('top').replace('px',''), 10);
			_slider_left = parseInt(_slider.css('left').replace('px',''), 10);
			return _container; // Keeps chainability
		},

		navigate: function(index){
			if(!_initialized){ // Error triggered if method is called before plugin initialisation
				$.error( 'Initialization needed. Use $(<selector>).ssslider();' );
			}
			if(index < 0 || index > (_panel_count-1)){ // Error triggered if the passed index is out of range
				$.error( 'Index out of range' );	
			} 
			var  // Holds container width and height for further use. Local variables.
				container_width = _container.width(),
				container_height = _container.height();
			_index = index; // Holds received index for further use.

			// Do the navigation
			if(_behaviour === 'static'){
				_slider.css({'left': _slider_left + (_index * container_width)});
			} else {
				switch(_orientation){
					case 'from_top':
						_slider.animate({'top': _slider_top + (_index * container_height)});
						break;
					case 'from_right':
						_slider.animate({'left': -(container_width*_index)});
						break;
					case 'from_bottom':
						_slider.animate({'top': -(_index * container_height)});
						break;
					case 'from_left':
						_slider.animate({'left': _slider_left + (_index * container_width)});
						break;
					default:
						$.error( 'Orientation unknown. Possible values are "from_top", "from_right", "from_bottom" or "from_left"' );
						break;
				}
			}
			return _container; // Keeps chainability
		},

		next: function(){
			if(!_initialized){
				$.error( 'Initialization needed. Use $(<selector>).ssslider();' );
			}
			if( _index > -1 && _index < (_panel_count-1) ){ // Calculates the range to find next
				methods.navigate(_index+1);
			} else {
				methods.navigate(0);
			}
			return _container; // Keeps chainability
		},

		prev: function(){
			if(!_initialized){
				$.error( 'Initialization needed. Use $(<selector>).ssslider();' );
			}
			if(_index > 0 && _index < _panel_count){  // Calculates the range to find prev
				methods.navigate(_index-1);
			} else {
				methods.navigate(_panel_count-1);
			}
			return _container; // Keeps chainability
		}
	};

	// From here: http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
	$.fn.ssslider = function(method){ // Plugin's main method
		if ( methods[method] ) { // In case of method was passed, execute it
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 )); // return in order to keep chainability
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments ); // If no method was passed, execute init. Return in order to keep chainability
		} else {
			$.error( 'Method ' +  method + ' unknown' ); // Error triggered if none of the above happened
		}    
	};

})(window.jQuery);