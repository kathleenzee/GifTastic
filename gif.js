$(function() {
    renderButtons(topics, 'squirellButton', '#squirellButtons');
});

var topics = ["Chipmunk", "Brown squirell", "Gray squirell", "Flying squirell", "Tree squirell", "Pine squirell", "American red squirrel", "Indian palm squirrel", "Indian giant squirrel"];

function renderButtons(topics, squirellButton, squirellButtons){   
    $(squirellButtons).empty();

    for (var i = 0; i < topics.length; i++){
        
        var a = $('<button>');
        a.addClass(squirellButton);
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $(squirellButtons).append(a);
    }
}

$(document).on('click', '.squirellButton', function(){
    $('#squirells').empty();
    $('.squirellButton').removeClass('active');
    $(this).addClass('active');

    var name = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var squirellDiv = $('<div class="squirell-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var squirellImage = $('<img>');
             squirellImage.attr('src', still);
             squirellImage.attr('data-still', still);
             squirellImage.attr('data-animate', animated);
             squirellImage.attr('data-state', 'still')
             squirellImage.addClass('squirellImage');

             squirellDiv.append(p)
             squirellDiv.append(squirellImage)

             $('#squirells').append(squirellDiv);
         }
    }); 
});

$(document).on('click', '.squirellImage', function() {
    var state = $(this).attr('data-state'); 
    
    if ( state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addsquirell').on('click', function(){
    var newsquirell = $('input').eq(0).val();

    if (newsquirell.length > 2){
        topics.push(newsquirell);
    }

    renderButtons(topics, 'squirellButton', '#squirellButtons');

    return false;
});