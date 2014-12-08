function loadResults(startFrom) {
    var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
    var delay = 1000;
    $('body, html').animate({
        scrollTop: 0
    }, delay);
    var querry = $('#querry').val();
    if (querry == "") {
        alert("Давайте не пустословить!");
    } else {
        $.ajax(
            {
                url: '/FakeGoogle/',
                type: 'POST',
                data: {
                    querry: querry,
                    startFrom: startFrom
                },
                success: function (data) {
                    try {
                        result = eval('(' + data + ')');

                        if (result.queries.request[0].totalResults == 0) {

                            $("#div1").empty().append('<p>по запросу <b>' + result.queries.request[0].searchTerms + '</b> ничего не найдено.</p>');
                            if (result.spelling == undefined) {
                                $("#div1").append('<p>такое бывает даже у гугла. Это все экология и стрессы. Введите что то попроще.</p>');
                                $("#div2").empty();
                            }
                            else {
                                document.getElementById('querry').value = result.spelling.correctedQuery;
                                $("#div1").append('<p>Попробуйте поискать по этому запросу <input type="button" class="pagination" onclick="loadResults(1)" value="' + result.spelling.correctedQuery + '">');
                                $("#div2").empty();
                            }
                        }
                        else {
                            if (result.queries.request[0].startIndex == 1) {
                                $("#statistic").empty().append('<p> Результатов: ' + result.searchInformation.formattedTotalResults + ', (' + result.searchInformation.formattedSearchTime + ' сек.)</p>');
                            } else {
                                $("#statistic").empty().append('<p> Результатов: ' + result.searchInformation.formattedTotalResults + ', страница ' + (result.queries.request[0].startIndex + 9) / 10 + ' (' + result.searchInformation.formattedSearchTime + ' сек.)</p>');
                            }

                            $("#div1").empty();
                            var mainTable = document.createElement('table');
                            mainTable.id = 'mainTable';
                            var div1 = document.getElementById('div1');
                            div1.appendChild(mainTable);
                            for (var i = 0; i < result.items.length; i++) {
                                var trMain = document.createElement('tr');
                                mainTable.appendChild(trMain);

                                var tdMain = document.createElement('td');
                                tdMain.id = 'tdMain';
                                tdMain.class = 'grow';
                                trMain.appendChild(tdMain);

                                var innerTable = document.createElement('table');
                                innerTable.id = 'innerTable';
                                tdMain.appendChild(innerTable);

                                var trLink = document.createElement('tr');
                                innerTable.appendChild(trLink);

                                var trHtmlFormattedUrl = document.createElement('tr');
                                innerTable.appendChild(trHtmlFormattedUrl);

                                var trSnippet = document.createElement('tr');
                                innerTable.appendChild(trSnippet);

                                var link = document.createElement('td');
                                link.id = 'link';
                                trLink.appendChild(link);

                                var a = document.createElement('a');
                                a.href = result.items[i].link;

                                var displayLink = document.createTextNode(result.items[i].title);
                                a.appendChild(displayLink);
                                link.appendChild(a);

                                var htmlFormattedUrl = document.createElement('td');
                                htmlFormattedUrl.id = 'htmlFormattedUrl';
                                htmlFormattedUrl.innerHTML = result.items[i].htmlFormattedUrl;
                                trHtmlFormattedUrl.appendChild(htmlFormattedUrl);


                                var snippet = document.createElement('td');
                                snippet.id = 'snippet';
                                snippet.innerHTML = result.items[i].htmlSnippet;
                                trSnippet.appendChild(snippet);

                            }
                            pagination(result);

                        }
                    } catch (e) {
                        alert(e.originalEvent);
                        alert("ошибка!" + e.toString());
                    }


                },
                async: false,
                dataType: 'text'
            }
        );
    }

    $(document).ready(function () {
        $(window).scroll(function () { // При прокрутке попадаем в эту функцию
            /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
            if ($(this).scrollTop() > top_show) $('#top').fadeIn();
            else $('#top').fadeOut();
        });
        $('#top').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
            /* Плавная прокрутка наверх */
            $('body, html').animate({
                scrollTop: 0
            }, delay);
        });
    });
    return false;
}

jQuery(window).resize(function ($) {
    $('#form').css({
        position: 'absolute',
        left: ($(window).width() - $('#form').outerWidth()) / 2,
        top: ($(window).height() - $('#form').outerHeight()) / 2
    });
});
jQuery(window).resize($);

    
