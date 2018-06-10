window.onload = function() {

const 	showMenu 	= $('#show-menu'),
		closeMenu 	= $('#close-menu'),
		menu 		= $('#sidebar');

showMenu.on('click', function(){
	menu.removeClass('invisible');
});
closeMenu.on('click', function(){
	menu.addClass('invisible');
});



}
