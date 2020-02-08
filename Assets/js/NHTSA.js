$("#search-btn").on("click", function (event) {
    event.preventDefault();

    var year = 2000;
    var make = 'nissan';
    var model =  'altima';
    
    //$('#startYear').val();

    var query = 'https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/' + year + '/make/' + make + '/model/' + model + '?format=json';

    //search


    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        $("#data-div").text(JSON.stringify(response));
    })

});