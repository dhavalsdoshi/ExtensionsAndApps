$(document).ready(function() {
    var lines;
    jQuery.ajax({ 
	  url : "data/data.csv", 
	  
	  success: function(data) { 
		$('#loadingMessage').hide('slow');
		lines = jQuery.csv()(data);
		$(lines).each(function(index, line){
			var word = line[0];
			var meaning = line[1];
			var sentence = line[2];
			$("<li id='"+word+"'><div><span class='word'>"+word+"</span><span class='meaning'>"+
						meaning+"</span></div><div><b>Usage</b>: "+
						sentence+"</div></li>").appendTo("#wordsList")
		});
		$('#search').keyup();
	  }
	});

	var filterWordsBy = function(text){
	  	$('li').hide();
		$('li[id^="'+text+'"]').show();
	};
	
	$('#letterLinks a').click(function(e){
		var text = $(this).text();
		$('#search').val(text);
		filterWordsBy(text);
		e.preventDefault();
	})	
	$('#search').keyup(function(){
		var text = $(this).val();
		filterWordsBy(text);
        $('#modeSwitcher').attr('href',"index.html?startString=" +text);
	});
});