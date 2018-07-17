window.onload = function () {


	const colors = {
		blue: {
			dark: '#055A8C',
			primary: '#0079BF',
			secondary: '#298FCA',
			accent: '#5BA4CF'
		},
		green: {
			dark: '#519839',
			primary: '#5AAC44',
			secondary: '6#1BD4F',
			accent: '#7BC86C'
		},
		orange: {
			dark: '#D29034',
			primary: '#FFAB4A',
			secondary: '#FFB968',
			accent: '#FDC788'
		},
		red: {
			dark: '#B04632',
			primary: '#EB5A46',
			secondary: '#EF7564',
			accent: '#EC9488'
		},
		yellow: {
			dark: '#D9B51C',
			primary: '#F2D600',
			secondary: '#F5DD29',
			accent: '#F3E260'
		},
		purple: {
			dark: '#89609E',
			primary: '#A86CC1',
			secondary: '#C377E0',
			accent: '#CD8DE5'
		},
	}



	let sidebar = {

		colors,

		init: function () {
			let showMenu = $('#show-menu'),
				closeMenu = $('#close-menu'),
				menu = $('#sidebar');

			closeMenu.on('click', function () {
				menu.removeClass('open');
			});

			showMenu.on('click', function () {
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

		showColors: function () {
			let showColorList = $('#change-colors');
			let swatches = $('#swatches');
			showColorList.on('click', function (e) {
				swatches.toggleClass('closed');
			})

			let colorContainer = $('#color-container');

			//for each color in the colors array create the square and add an event listener to it. 
			for (let color in this.colors) {
				colorContainer.append(`<div class="col-sm-5 choose-color m-1 rounded" id="${color}" style="background-color: ${this.colors[color].primary}"></div>`);
				$(document).on('click', `#${color}`, function () {
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

		init: function () {
			let openRename = $('#open-rename'),
				closeRename = $('#close-rename'),
				renameCard = $('#rename'),
				renameBtn = $('#rename-btn');

			openRename.on('click', function () {
				renameCard.removeClass('invisible');
			});

			closeRename.on('click', function () {
				renameCard.addClass('invisible');
			});

			//update board name, hide rename card, and clear input on rename-btn click
			renameBtn.on('click', function () {
				let newName = $('#rename-input'),
					boardName = $('#board-name');

				//only perform tasks if value isn't empty
				if (newName.val() !== '') {
					boardName.text(newName.val());
					newName.val('');
					renameCard.addClass('invisible');
				}
			});
		}

	};

	//make object with arrays corresponding to list names
	let cardLists = {};

	//logic for "add a list..." btn onlick
	let addCardlistBtn = {

		//create a function for adding new card lists to cardLists object
		init: function () {
			let addBtnDiv = $('#add-cardlist-btn-div'),
				addListBtn = $('#btn-add-cardlist'),
				addListCard = $('#card-add-list'),
				addListInput = $('#input-add-cardlist'),
				saveListBtn = $('#btn-save-list'),
				closeListForm = $('#btn-close-list-form');

			//hide add a list button and show the add list form
			addListBtn.on('click', function () {
				addBtnDiv.hide();
				addListCard.removeClass('invisible');
				addListInput.val('');
			});

			//add the new card list to the cardLists object
			saveListBtn.on('click', function () {
				//check that the input box isn't empty first
				if (addListInput.val() !== '') {
					//add key with name of list and value of empty arr to cardLists object
					cardLists[addListInput.val()] = [];
					addListCard.addClass('invisible');
					addBtnDiv.show();
					console.log(cardLists);
					//console.log(addListInput.val());

					//create an html template for the cardlist div
					let cardList = `
						<div class="d-flex flex-column flex-shrink-0 mx-1 cardlist rounded dark" id="${addListInput.val()}">
							
							<div class="cardlist-header text-white d-flex align-items-center">
								<h5 class="p-2 mb-0 mt-1">${addListInput.val()}</h5>
							</div>
							<input type="text" class="d-none change-listname m-2"></input>
							<div class="cardlist-body m-2 flex-fill rounded" id="${addListInput.val()}-body">
								<!--cards go under here-->
							</div>
							<div class="cardlist-footer mt-auto">
								<button type="button" class="btn dark text-white btn-add-card d-flex justify-content-left">Add a card...</button>
								<div class="d-none m-2">
									<textarea class="form-control w-100 card-name-input" rows="2"></textarea>	
									<div class="d-flex justify-items-start mt-2">	
										<button type="button" class="btn primary text-white btn-add mr-3">Add</button>
										<button type="button" class="text-white close btn-close-card">
											<span><i class="fas fa-times"></i></span>
										</button>
									</div>
								</div>
							</div>
						
						</div>
						`;

					//prepend the card list template to main body div
					$(cardList).insertBefore('.btn-add-cardlist-div');

					//allow card list to be renamed on click of title
					$(document).on('click', '.cardlist-header', function(){
						$(this).removeClass('d-flex').addClass('d-none');
						$(this).next().removeClass('d-none').focus();
						$(this).next().keyup(function(event){
							if (event.keyCode === 13){
								console.log( $(this).val() );
								$(this).prev().find('h5').text( $(this).val() );
								$(this).removeClass('d-flex').addClass('d-none');
								$(this).prev().removeClass('d-none');
							}
						});
					});

					//sort function via http://jsfiddle.net/jaakkytt/FVyS2/
					$(".cardlist-container").sortable({
						connectWith: ".cardlist-container",
						handle: ".cardlist-header",
						start: function (event, ui) {
							console.log('starting');
							ui.item.addClass('tilt');
							tilt_direction(ui.item);
						},
						stop: function (event, ui) {
							ui.item.removeClass("tilt");
							$("html").unbind('mousemove', ui.item.data("move_handler"));
							ui.item.removeData("move_handler");
						}
					});

					$(".cardlist")
						.addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
						.find(".cardlist-header")
						.addClass("ui-widget-header ui-corner-all")
						.prepend("<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

					$(".cardlist-toggle").click(function () {
						var icon = $(this);
						icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
						icon.closest(".cardlist").find(".cardlist-body").toggle();
					});

					$(".cardlist-body").sortable({
						connectWith: ".cardlist-body",
						cancel: ".cardlist-header"
					}).disableSelection();

					function tilt_direction(item) {
						var left_pos = item.position().left,
							move_handler = function (e) {
								if (e.pageX >= left_pos) {
									item.addClass("right");
									item.removeClass("left");
								} else {
									item.addClass("left");
									item.removeClass("right");
								}
								left_pos = e.pageX;
							};
						$("html").bind("mousemove", move_handler);
						item.data("move_handler", move_handler);
					}
				}
			});

			//close add list card when X is clicked
			closeListForm.on('click', function () {
				addListCard.addClass('invisible');
				addBtnDiv.show();
			});
		}





	};

	//logic for adding a new card
	let addCard = {

		init: function () {

			//since add-card button is added dynamically to DOM, must use a new document query
			$(document).on('click', '.btn-add-card', function (event) {
				//console.log(this);
				$(this).removeClass('d-flex');
				$(this).addClass('d-none');
				$(this).siblings().removeClass('d-none');
				$(this).siblings().addClass('d-flex flex-column');
				event.preventDefault();
			});

			//append a card to the list body div when 'add' clicked
			$(document).on('click', '.btn-add', function (event) {
				//store value of the text area in cardTitle
				let cardTitle = $(this).parent().prev().val();
				//create template for new card
				let newCard = `
				<div class="listed-card rounded my-2 d-flex flex-wrap justify-content-end">
					<div class="card-overlay d-flex position-absolute">
						<div class="overlay-row d-none">
							<button class="btn btn-sm btn-overlay btn-overlay-edit">
								<span><i class="fas fa-pencil-alt fa-sm"></i></span>
							</button>
							<button class="btn btn-sm btn-overlay btn-overlay-delete">
								<span><i class="fas fa-trash-alt fa-sm"></i></span>
							</button>
						</div>
					</div>
					<p class="p-2 w-100 card-title">${cardTitle}</p>
					<div class="d-none p-2 edit-card-form">
						<textarea class="form-control card-namechange-input" rows="2"></textarea>	
							<div class="d-flex justify-items-start mt-2">	
								<button type="button" class="btn primary text-white btn-savename mr-3">Save</button>
								<button type="button" class="close close-rename">
									<span><i class="fas fa-times"></i></span>
								</button>
							</div>
					</div>					
				</div>
			`;

				//append the card to the card list body
				if (cardTitle !== '') {
					$(this).parent().parent().parent()
						.prev().append(newCard);
				}

				//close the button group
				$(this).parent().prev().val('');
				$(this).parent().parent().addClass('d-none').removeClass('d-flex');
				$(this).parent().parent().prev().removeClass('d-none');
			});

			//close button group when X is clicked
			$(document).on('click', '.btn-close-card', function (event) {
				$(this).parent().prev().val('');
				$(this).parent().parent().addClass('d-none').removeClass('d-flex');
				$(this).parent().parent().prev().removeClass('d-none');
			});

			//make btn-overlay appear on mouseover of card
			$(document).on('mouseover', '.listed-card', (function (e) {
					$(this).find('div.overlay-row').removeClass('d-none');
				}))
				//btn-overlay disappear on mouseout
				.on('mouseout', '.listed-card', (function (e) {
					$(this).find('div.overlay-row').addClass('d-none');
				}));

			//btn-overlay-delete deletes card on click
			$(document).on('click', '.btn-overlay-delete', function (e) {
				$(this).closest('div.listed-card').remove();
			});

			//btn-overlay-edit allows you to edit card
			$(document).on('click', '.btn-overlay-edit', function (e) {
				let cardTitle = $(this).closest('div.listed-card').find('p.card-title');
				const parentCard = $(this).closest('div.listed-card');
				const editCardForm = $(this).closest('div.listed-card').find('div.edit-card-form');

				//hide card overlay and title
				$(parentCard).find('p.card-title').addClass('d-none');
				$(parentCard).find('div.overlay-row').children().addClass('d-none');

				// show the rename card form
				editCardForm.removeClass('d-none');
				editCardForm.find('textarea').val(cardTitle.text()).focus();
				//this textarea unofucses for whatever reason, so made function to focus on click
				$(document).on('click', '.card-namechange-input', function () {
					$(this).focus();
				});

				//update card title when save btn is clicked
				$(document).on('click', '.btn-savename', function () {
					let newName = $(this).parent().prev().val();
					//make sure val isnt blank
					if (newName === '') {
						console.log('blank name');
					} else {
						cardTitle.text(newName);
					}
					//hide card overlay and title
					$(parentCard).find('p.card-title').removeClass('d-none');
					$(parentCard).find('div.overlay-row').children().removeClass('d-none');
					// show the rename card form
					editCardForm.addClass('d-none');
				});
				
				//close out form and show card when X clicked
				$(document).on('click', '.close-rename', function(){
					$(parentCard).find('p.card-title').removeClass('d-none');
					$(parentCard).find('div.overlay-row').children().removeClass('d-none');
					editCardForm.addClass('d-none');
				});
				

			});

		}

	};




	sidebar.init();
	rename.init();
	addCardlistBtn.init();
	addCard.init();



};