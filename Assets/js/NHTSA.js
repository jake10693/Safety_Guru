//TAB CONTROL
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
    getSafety();
    getRecall();
});


function getSafety() {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    const vehId = 7523;
    const safetyQuery = "https://cors-anywhere.herokuapp.com/https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/" + vehId + "?format=json";

    $.ajax({
        url: safetyQuery,
        type: 'GET',
        beforeSend: loading(),

        success: function (response) {

            $("#safety-div").empty();

            var safetyCount = response.Results.Count;

            if (safetyCount === 0) {
                $('#safety-div').append($('<h5>').text('No safety data available for this vehicle'));
            } else {
                const overallRating = response.Results[0].OverallRating;
                const overallFrontCrashRating = response.Results[0].OverallFrontCrashRating;
                const frontCrashDriversideRating = response.Results[0].FrontCrashDriversideRating;
                const frontCrashPassengersideRating = response.Results[0].FrontCrashPassengersideRating;
                const overallSideCrashRating = response.Results[0].OverallSideCrashRating;
                const sideCrashDriversideRating = response.Results[0].SideCrashDriversideRating;
                const sideCrashPassengersideRating = response.Results[0].SideCrashPassengersideRating;
                const rolloverRating = response.Results[0].RolloverRating;
                const sidePoleCrashRating = response.Results[0].SidePoleCrashRating;
                const nhtsaElectronicStabilityControl = response.Results[0].NHTSAElectronicStabilityControl;
                const nhtsaForwardCollisionWarning = response.Results[0].NHTSAElectronicStabilityControl;
                const nhtsaLaneDepartureWarning = response.Results[0].NHTSALaneDepartureWarning;

                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Overall Rating: </span>' + '<span class="safety-desc">' + overallRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Overall Front Crash Rating: </span>' + '<span class="safety-desc">' + overallFrontCrashRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Drivers Front Crash Rating: </span>' + '<span class="safety-desc">' + frontCrashDriversideRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Passenger Front Crash Rating: </span>' + '<span class="safety-desc">' + frontCrashPassengersideRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Overall Side Crash Rating: </span>' + '<span class="safety-desc">' + overallSideCrashRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Drivers Side Crash Rating: </span>' + '<span class="safety-desc">' + sideCrashDriversideRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Passenger Side Crash Rating: </span>' + '<span class="safety-desc">' + sideCrashPassengersideRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Rollover Rating: </span>' + '<span class="safety-desc">' + rolloverRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Side Pole Crash Rating: </span>' + '<span class="safety-desc">' + sidePoleCrashRating + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Electronic Stability Control: </span>' + '<span class="safety-desc">' + nhtsaElectronicStabilityControl + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Forward Collision Warning: </span>' + '<span class="safety-desc">' + nhtsaForwardCollisionWarning + '</span></div>');
                $('#safety-div').append('<div class="rating-row"><span class="safety-title">Lane Departure Warning: </span>' + '<span class="safety-desc">' + nhtsaLaneDepartureWarning + '</span></div>');


            }
        },

        error: function () {
            alert('ERROR! Unable to get NCAP safety data!');
        }

    });
}


function getRecall() {
    var year = $('#car-years').val();
    var make = $('#car-makes').val();
    var model = $('#car-models').val();

    const recallQuery = "https://cors-anywhere.herokuapp.com/https://webapi.nhtsa.gov/api/Recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json";

    $.ajax({
        url: recallQuery,
        type: 'GET',

        success: function (response) {

            $("#recall-div").empty();

            var recallCount = response.Results.length;

            if (recallCount === 0) {
                $('#recall-div').append($('<h5>').text('No recall data available for this vehicle'));
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
            alert('ERROR! Unable to get NHTSA recall data!');
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