var pagination = function (result) {
    try {

        var currentStartFrom = result.queries.request[0].startIndex;
        var currentPage = (currentStartFrom - 1) / 10;
        var lastPage;
        var lastStartFrom;
        if (result.queries.request[0].totalResults > 100) {
            lastPage = 9;
        } else {
            lastPage = Math.floor(result.queries.request[0].totalResults / 10);
        }
        lastStartFrom = lastPage * 10 + 1;

        $("#div2").empty();
        if (currentPage != 0) {
            $("#div2").append('<input type="button" class="pagination" onclick=loadResults(1) value="Первая">');
            $("#div2").append('<input type="button" class="pagination"  onclick=loadResults(result.queries.previousPage[0].startIndex) value="Предыдущая">');
        }
        /*alert(currentStartFrom + " - curr");*/
        var tmpCurPage = currentPage;
        if (currentPage < 4) {
            tmpCurPage = +3;
        }
        for (var i = tmpCurPage - 2; i <= tmpCurPage + 4; i++) {
            if (i > lastPage + 1) {
                break;
            }
            if (i == currentPage + 1) {
                $("#div2").append('<input type="button" class="pagination" style="color : crimson" onclick=loadResults(' + ((i - 1) * 10 + 1) + ') value ="' + i + '">');
            } else {
                $("#div2").append('<input type="button" class="pagination" onclick=loadResults(' + ((i - 1) * 10 + 1) + ') value = "' + i + '">');
            }
        }


        /*alert(lastStartFrom);*/
        if (currentPage != lastPage) {
            /*alert(currentPage + " " + lastPage);*/
            $("#div2").append('<input type="button" class="pagination" onclick=loadResults(result.queries.nextPage[0].startIndex) value="Следующая">');
            $("#div2").append('<input type="button" class="pagination" onclick=loadResults(' + lastStartFrom + ') value ="Последняя">');
        }


    }
    catch (e) {
        alert(e);
    }

};