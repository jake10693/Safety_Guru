$("#search-btn").on("click", function (event) {
    event.preventDefault();

    var year = '2009';
    var make = 'toyota';
    var model = 'corolla';

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
                const t = $('<h5>')
                const s = $('<p>')
                const r = $('<p>')
                t.text(title)
                s.text(summary)
                r.text(recallNum)
                $('#recall-div').append(t);
                $('#recall-div').append(s);
                $('#recall-div').append(r);
            }

        },

        error: function () {
            alert('Unable to get data!');
        }
    });

});