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
        searchTpl()
    })
    
    $('.badgefilter').click(function(){
        if($(this).hasClass('selected')){
            $(this).removeClass('selected')
        }else{
            $(this).addClass('selected')
        }
        searchTpl()
    })
});

function searchTpl(){
    var val = $('#search').val().toLowerCase();
    var tag = document.querySelectorAll('.badgefilter.selected')
    var tagfilter = []
    for (var t of tag){
        tagfilter.push(t.innerHTML.toLowerCase());
    }
    $('.col-tpl').each(function(e){
        var title = $('.title', this).text().toLowerCase();
        var tags = $('.tags', this).text().toLowerCase();
        if (val.length > 0 && !title.includes(val) && !tags.includes(val)){
            $(this).hide();
        }else if (tagfilter.length > 0 && !includesStrList(tags, tagfilter)){
            $(this).hide();
        }else{
            $(this).show();
        }
    });

}

function includesStrList(str, list){
    for (var s of list){
        if (str.includes(s)){
            return true;
        }
    }
    return false;
}

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