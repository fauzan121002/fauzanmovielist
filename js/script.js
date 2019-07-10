function modalMovie(){
     $(".modal-try").click(function(){
                        $.ajax({
                            url: 'https://omdbapi.com',
                            type: 'GET',
                            dataType: 'json',
                            data: {
                                'apikey' : 'ee888ae6',
                                'i' : $(this).data('id')
                            },
                            success:function(data){
                                $(".modal-tr").html(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">`+data.Title+`</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                               
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>`);
                                $("#exampleModal").modal('show');
                            }
                        });
                    });
}

function defaultMovie(){
    $.ajax({
        url:'https://omdbapi.com',
        type:'GET',
        dataType:'json',
        data:{
            'apikey' : 'ee888ae6',
            's' : 'Happy'
        },
        success:function(result){
            console.log(result);
            if(result.Response == "True"){
                const movies = result.Search;
                console.log(movies);
                $.each(movies,function(i,data){
                        $('.movie-list').append(`
                            <div class="col-md-2">
                                <div class="card mt-5 mb-5">
                                    <img src="`+ data.Poster +`" class="card-img-top" alt="..." width="50" height="auto">
                                    <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <p class="card-text"></p>
                                    <a href="" class="btn btn-primary modal-try" data-toggle="modal" data-id="`+data.imdbID+`">Order Ini!</a>
                                    </div> 
                                </div>
                            </div>
                        `);
                    });
                modalMovie();
            }else{
                $('.movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>                  
                `);  
            }
        }
    });
}

function searchMovie(){
    
    $.ajax({
        url: 'https://omdbapi.com',
        type: 'GET',
        dataType: 'json',
        data: {
            'apikey' : 'ee888ae6',
            's' : $('#search-input').val()
        },
        success: function (result) {
            if ( result.Response == "True"){
                let movies = result.Search;

                $.each(movies,function(i,data){
        
                        $('.movie-list').append(`
                            <div class="col-md-2">
                                <div class="card mt-5 mb-5">
                                    <img src="`+ data.Poster +`" class="card-img-top" alt="..." width="50" height="auto">
                                    <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <p class="card-text"></p>
                                    <a href="" class="btn btn-primary modal-try" data-toggle="modal" data-id="`+data.imdbID+`">Order Ini!</a>
                                    </div> 
                                </div>
                            </div>
                        `); 
                });
               modalMovie();
            }else{
                $('.movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>                  
                `);
            }
        }
    });

}

$('#search-button').on('click',function (){
        $(".movie-list").fadeOut('slow',function(){
            $(this).html('');
        }).fadeIn("slow",function(){
            searchMovie();
        });
});

$('#search-input').on('keyup',function (e){
    if(e.keyCode === 13){
        $(".movie-list").fadeOut('slow',function(){
            $(this).html('');
        }).fadeIn("slow",function(){
            searchMovie();
        });
        
    }
});

defaultMovie();
