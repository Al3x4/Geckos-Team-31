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
	}

	// colors : {
	// 	init : function() {

	// 	}
		
	// }
};

//create a rename object with function to rename board and make rename card appear
let rename = {

	init : function(){
		let openRename 	= $('#open-rename'),
			closeRename = $('#close-rename'),
			renameCard 	= $('#rename'),
			renameBtn 	= $('#rename-btn');

		openRename.on('click', function(){
			renameCard.removeClass('invisible');
		});

		closeRename.on('click', function(){
			renameCard.addClass('invisible');
		});

		//update board name, hide rename card, and clear input on rename-btn click
		renameBtn.on('click', function(){
			let newName		= $('#rename-input'),
				boardName	= $('#board-name');

			//only perform tasks if value isn't empty
			if (newName.val() !== ''){
				boardName.text(newName.val());
				newName.val('');
				renameCard.addClass('invisible');
			}
		});
	}

};



// let colors = {
// 	blue : {
// 		dark : '0094ae'
// 		primary : '0079bf'
// 		accent : 
// 	}, 
// 	orange : {
// 		dark : 
// 		primary : 'd22934'
// 		accent : 
// 	}, 
// 	green : {
// 		dark : 
// 		primary : '519839'
// 		accent : 
// 	}, 
// 	red : {
// 		dark : 
// 		primary : 'b04632'
// 		accent : 
// 	}, 
// 	purple : {
// 		dark : 
// 		primary : '89609e'
// 		accent : 
// 	}, 
// 	pink : {
// 		dark : 
// 		primary : 'cd5a91'
// 		accent : 
// 	}, 



sidebar.init();
rename.init();

};
