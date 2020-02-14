$(".tab").on("click", function () {
    const idNum = $(this).attr("id");
    const setId = '#' + idNum;
    const div = '#' + idNum + '-div'

    $('.tab').removeClass('is-active');
    $(setId).addClass('is-active');

    $('.tab-content').addClass('hide');
    $(div).removeClass('hide');

});


$("#search-btn").on("click", function (event) {

    event.preventDefault();

    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    var recallQuery = "https://cors-anywhere.herokuapp.com/https://webapi.nhtsa.gov/api/Recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json";

    $.ajax({
        url: recallQuery,
        type: 'GET',
        beforeSend: loading(),

        success: function (response) {

            $("#safety-div").empty();

            var recallCount = response.Results.length;

            if (recallCount === 0) {
                $('#safety-div').append($('<h5>').text('No Data Available'));
            } else {
                for (i = 0; i < recallCount; i++) {
                    const title = response.Results[i].Component;
                    const summary = response.Results[i].Summary;
                    const recallNum = response.Results[i].NHTSACampaignNumber;
                    const t = $('<h5>').text(title)
                    const s = $('<p>').text(summary)
                    const r = $('<p>').text('NHTSA CAMPAIGN NUMBER: ' + recallNum)
                    const b = $('<br>')
                    $('#safety-div').append(t);
                    $('#safety-div').append(s);
                    $('#safety-div').append(r);
                    $('#safety-div').append(b);
                }
            }
        },

        error: function () {
            alert('Unable to get NHTSA data!');
        }

    });
    getRecall();
});

function getRecall() {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    var recallQuery = "https://cors-anywhere.herokuapp.com/https://webapi.nhtsa.gov/api/Recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json";

    $.ajax({
        url: recallQuery,
        type: 'GET',

        success: function (response) {

            $("#recall-div").empty();

            var recallCount = response.Results.length;

            if (recallCount === 0) {
                $('#recall-div').append($('<h5>').text('No Data Available'));
            } else {
                for (i = 0; i < recallCount; i++) {
                    const title = response.Results[i].Component;
                    const summary = response.Results[i].Summary;
                    const recallNum = response.Results[i].NHTSACampaignNumber;
                    const t = $('<h5>').text(title)
                    const s = $('<p>').text(summary)
                    const r = $('<p>').text('NHTSA CAMPAIGN NUMBER: ' + recallNum)
                    const b = $('<br>')
                    $('#recall-div').append(t);
                    $('#recall-div').append(s);
                    $('#recall-div').append(r);
                    $('#recall-div').append(b);
                }
            }
        },

        error: function () {
            alert('Unable to get NHTSA data!');
        }
    });
}

function loading() {
    $("#safety-div").empty();
    $("#recall-div").empty();
    $("#tsb-div").empty();
    $('#safety-div').append($('<h5>').text('Loading please wait...'));
    $('#recall-div').append($('<h5>').text('Loading please wait...'));
    $('#tsb-div').append($('<h5>').text('Loading please wait...'));
};