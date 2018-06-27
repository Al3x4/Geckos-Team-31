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

	colors,
	
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

//make object with arrays corresponding to list names
let cardLists = {

};

//logic for "add a list..." btn onlick
let addCardlistBtn = {

	//create a function for adding new card lists to cardLists object
	init: function(){
		let addBtnDiv		= $('#add-cardlist-btn-div'),
			addListBtn 		= $('#btn-add-cardlist'),
			addListCard		= $('#card-add-list'),
			addListInput 	= $('#input-add-cardlist'),
			saveListBtn		= $('#btn-save-list'),
			closeListForm 	= $('#btn-close-list-form');

		//hide add a list button and show the add list form
		addListBtn.on('click', function(){
			addBtnDiv.hide();
			addListCard.removeClass('invisible');
			addListInput.val('');
		});

		//add the new card list to the cardLists object
		saveListBtn.on('click', function(){
			//check that the input box isn't empty first
			if(addListInput.val() !== ''){
				//add key with name of list and value of empty arr to cardLists object
				cardLists[addListInput.val()] = [];
				addListCard.addClass('invisible');
				addBtnDiv.show();
				//console.log(cardLists);
				console.log(addListInput.val());

				//create an html template for the cardlist div
				let cardList = `
				<div class="d-flex flex-column mx-1 cardlist rounded dark" id="${addListInput.val()}">
					<div class="cardlist-header text-white d-flex align-items-center">
						<h5 class="p-2 mb-0">${addListInput.val()}</h5>
					</div>
					<div class="cardlist-body m-2 flex-fill rounded">
						<!--cards go under here-->
					</div>
					<div class="cardlist-footer mt-auto">
						<button type="button" class="btn dark text-white btn-add-card d-flex justify-content-left">Add a card...</button>
					</div>
				</div>
				`;

				//prepend the card list template to main body div
				$('#main-board').prepend(cardList);
			}
		});

		//close add list card when X is clicked
		closeListForm.on('click', function(){
			addListCard.addClass('invisible');
			addBtnDiv.show();
		});
	}
	
};




sidebar.init();
rename.init();
addCardlistBtn.init();



};
