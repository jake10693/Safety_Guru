$("#search-btn").on("click", function (event) {
    event.preventDefault();

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
                $('#tsb-div').addClass('hide');
            }

        },

        error: function () {
            alert('Unable to get NHTSA data!');
        }
    });

});