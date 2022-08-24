$(document).ready(function(){
    $('.tile').click(function(){
        var url = $(this).attr('file');
        var desc = $(this).attr('desc');
        var img = this.querySelector('img').src;
        $('#modal-title').html($(this).attr('title'))
        $('#modal-body').html("<img class='modal-img' src='"+img+"'><p>"+desc+"<p/><div class=\"btn-group\"><a href='#' class='btn btn-success' onclick=\"importTemplate('"+url+"')\">Import</a></div>");
        $('#modal').modal('show');
    })
    $('.close').click(function(){
        $('#modal').modal('hide');
    })

    $('#search').on('input',function(){
        var val = $('#search').val().toLowerCase();
        $('.col-tpl').each(function(e){
            var title = $('.title', this).text().toLowerCase();
            var tags = $('.tags', this).text().toLowerCase();
            if (val.length > 0 && !title.includes(val) && !tags.includes(val)){
                $(this).hide();
            }else{
                $(this).show();
            }
        })
    })
});

function importTemplate(url){
    $.ajax({
        type: "GET",
        url: url,
        crossDomain: true,
        cache: false,
        process_data: false,
        success: function (data) {
            window.parent.postMessage({ message: "import", value: data }, "*");
        },
    });
}