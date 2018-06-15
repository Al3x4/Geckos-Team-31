window.onload = function() {


const colors = {
	blue : {
		dark : '#055A8C',
		primary : '#0079BF',
		secondary : '#298FCA',
		accent : '#5BA4CF'
	}, 
	green : {
		dark : '#519839',
		primary : '#5AAC44',
		secondary : '6#1BD4F',
		accent : '#7BC86C'
	}, 
	orange : {
		dark : '#D29034',
		primary : '#FFAB4A',
		secondary : '#FFB968',
		accent : '#FDC788'
	}, 
	red : {
		dark : '#B04632',
		primary : '#EB5A46',
		secondary : '#EF7564',
		accent : '#EC9488'
	}, 
	yellow : {
		dark : '#D9B51C',
		primary : '#F2D600',
		secondary : '#F5DD29',
		accent : '#F3E260'
	}, 
	purple : {
		dark : '#89609E',
		primary : '#A86CC1',
		secondary : '#C377E0',
		accent : '#CD8DE5'
	}, 
}



let sidebar = {

	colors: colors,
	
	init : function(){
		let showMenu 	= $('#show-menu'),
			closeMenu 	= $('#close-menu'),
			menu 		= $('#sidebar');

		closeMenu.on('click', function(){
			menu.removeClass('open');
		});

		showMenu.on('click', function(){
			menu.addClass('open');
		});


		// $('body').on('click', function(e){
		// 	if (menu.hasClass('open') && e.target.innerText !== 'Show Menu' && e.target.innerText !==  '... Show Menu') {
		// 		console.log(e.target.innerText);
		// 		console.log(e.currentTarget);
		// 		menu.removeClass('open');
		// 	};
		// });

		this.showColors();

	},

	showColors: function() {
		let showColorList = $('#change-colors');
		let swatches = $('#swatches');
		showColorList.on('click', function(e){
			swatches.toggleClass('closed');
		})

		let colorContainer = $('#color-container');

		//for each color in the colors array create the square and add an event listener to it. 
		for(let color in this.colors){
			colorContainer.append(`<div class="col-sm-5 choose-color m-1 rounded" id="${color}" style="background-color: ${this.colors[color].primary}"></div>`);
			$(document).on('click',`#${color}`,function() {
				document.documentElement.style.setProperty('--dark', this.colors[color].dark);
				document.documentElement.style.setProperty('--primary', this.colors[color].primary);
				document.documentElement.style.setProperty('--secondary', this.colors[color].secondary);
				document.documentElement.style.setProperty('--accent', this.colors[color].accent);
			}.bind(this));
		}
	}





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






sidebar.init();
rename.init();



};
