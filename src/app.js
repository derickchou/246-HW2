
(function(){
	var temp_li='<li><input type="text"><span></span></li>';
	var add_button=$('#add');
	var connected=$('.connected');
	var placeholder=$('#placeholder');
	var mainUI=$('.main');
	var deleteUI=$('.delete');
	var doneUI=$('.done');

	// var toDoArr=[];
	load();

	add_button.on('click',function(){
		$(temp_li).prependTo(mainUI).addClass('is-editing').find('input').focus();
	});


	mainUI.on('keyup','input',function(event){
		//.on( events [, selector ] [, data ], handler )
		if(event.which===13){
			var input = $(this);
			var li = $(this).parents('li');
			 // alert(input.val());

			 li.find('span').text(input.val());
			 li.removeClass('is-editing');

			 //toDoArr.push(input.val());
			 save();
		}
		
	});

	function save(){
		if(typeof(Storage)!='undefined'){
			var toDoArr=[];

			mainUI.find('li').each(function(){
				var li = $(this);
				var liObj={
					text: li.find('span').text(),
					isDone: li.hasClass('is-done')
				}
				toDoArr.push(liObj);
			});
			localStorage.toDoList=JSON.stringify(toDoArr);

		}
	}

	function load(){
		if(typeof(Storage)!='undefined'){
			if(!localStorage.toDoList){return;}

			var toDoArr=JSON.parse(localStorage.toDoList);

			for(var i=0;i<toDoArr.length;i++){
				// alert(toDoArr[i].text);
				if(toDoArr[i].isDone){
					$(temp_li).appendTo(mainUI).addClass('is-done').find('span').text(toDoArr[i].text);
				}else{
					$(temp_li).appendTo(mainUI).find('span').text(toDoArr[i].text);
				}
			}
		}
	}

	connected.sortable({
		connectWith: connected,
		tolerance: 'pointer'
		// tolerance: 'intersect'
	});

	connected.on('sortstart', function(){
		placeholder.addClass('is-dragging');
	}).on('sortstop', function(){
 		placeholder.removeClass('is-dragging');
  		// save();
	});

	connected.on('sortupdate',function(event,ui){
		save();
	});

	deleteUI.on('sortreceive',function(event,ui){
		ui.item.remove();
	});
	doneUI.on('sortreceive',function(event,ui){
		$(ui.sender).sortable('cancel');
		ui.item.addClass('is-done');
	});

}());
