window.onload = function() {



let sidebar = {
	
	init : function(){
		let showMenu 	= $('#show-menu'),
			closeMenu 	= $('#close-menu'),
			menu 		= $('#sidebar');

		showMenu.on('click', function(){
			menu.removeClass('invisible');
		});

		closeMenu.on('click', function(){
			menu.addClass('invisible');
		});
	},

	colors : {
		init : function() {

		}
		
	}
}




let colors = {
	blue : {
		dark : '0094ae'
		primary : '0079bf'
		accent : 
	}, 
	orange : {
		dark : 
		primary : 'd22934'
		accent : 
	}, 
	green : {
		dark : 
		primary : '519839'
		accent : 
	}, 
	red : {
		dark : 
		primary : 'b04632'
		accent : 
	}, 
	purple : {
		dark : 
		primary : '89609e'
		accent : 
	}, 
	pink : {
		dark : 
		primary : 'cd5a91'
		accent : 
	}, 



sidebar.init();

}
