$(document).ready(function() {

    // process the form
    $('form').submit(function(event) {
	
		$('.error').html(''); 
       
        var formData = {
            'nom'               : $('#nom').val(),
            'email'             : $('#email').val(),
            'sujet'    			: $('#sujet').val(),
            'antispam'    		: $('#antispam').val(),
			'message'    		: $('#message').val()
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'process.php', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
                        encode          : true
        })
            // using the done promise callback
            .done(function(data) {
		
				// log data to the console so we can see
				console.log(data);
		
				// here we will handle errors and validation messages
				if ( ! data.success) {
					
					if (data.errors.nom) {
						$('.error').append(data.errors.nom); 
					}
		
					if (data.errors.email) {
						$('.error').append(data.errors.email); 
					}
		
					if (data.errors.sujet) {
						$('.error').append(data.errors.sujet); 
					}

					if (data.errors.antispam) {
						$('.error').append(data.errors.antispam); 
					}
					
					if (data.errors.message) {
						$('.error').append(data.errors.message); 
					}
		
				} else {
		
					// ALL GOOD! just show the success message!
					$('.error').append(data.message);	
				}
		
			});

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
