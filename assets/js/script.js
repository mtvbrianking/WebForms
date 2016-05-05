$reg_uname = /^(?=.*[a-z])[a-z0-9]{6,20}$/g;
// only lowercase chars and numbers, min-length 6 
$reg_pswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*?[^\w\s]).{8,}$/g;

$.validator.addMethod( 'regex', function(value, element, pattern) {
		var regexp = new RegExp(pattern);
    	return this.optional(element) || regexp.test(value);
	}, "RegExp validation failed" );

$('#form').validate({

	rules: {
    	username: {
    		required: true,
    		minlength: 5,
    		maxlength: 15
    	},
    	email: {
    		required: true,
    		email: true,
    		remote: {
		        url: "isEmailAvailable.php",
		        type: "post",
		        data: {
		          	email: function() {
		            	return $( "#form :input[name='email']" ).val();
		          	}
		        }
		    }
    	},
    	password: {
    		required: true,
    		regex: $reg_pswd
    	},
        confirm_password: {
            required: true,
            equalTo: "#password"
        },
        agreement: {
            required: true
        }
    },
    messages: {
    	username: {
    		required: "Please enter a username",
    		minlength: "Username must be 5-15 characters",
			maxlength: "Username must be 5-15 characters"
    	},
    	email: {
    		required: "Please provide an email address",
    		email: "Please enter a valid email address.",
    		remote: jQuery.validator.format("Email address: '{0}' is already registered.")
    	},
    	password: {
    		required: "Please provide your password",
    		regex: "Password must be at least 8 alphanumeric; uppercase & lowercase characters with symbols"
    	},
        confirm_password: {
            required: "Please confirm password",
            equalTo: "Passwords are not matching"
        },
        agreement: {
        	required: "(Agreed?) "
        }
    },
    /* Highligt form-group if it has an error *
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    /* Unhighligt form-group if it the error is cleared *
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    /* Make the error message appear in a 'span' */
    errorElement: 'span',
    /* Give error span class '.error-message' so that it's highlighted */
    errorClass: 'error-message',
    /* Handle where the error message will appear if '.input-group' is used in form-group */
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }

});

$('#form').on('click', '#submit', function(){

    if($("#form").valid()){
		
		$.ajax({
	        url: "processForm.php",
	        type: 'POST',
	        data: $('#form').serialize(),
	        datatype: 'json',
	        success: processResponse,
	        error: function(e) {
	        	console.log(e.message);
	        }
	    });
	    
	}

});

function processResponse(response) {

	response = $.parseJSON(response);
    
    if(response.error){
    	$('<span class="error-message">'+response.error+'</span>').insertAfter( ".form-title" );
    	console.warn(response.exception);
    }else{
    	alert(response.status);
    	window.location.replace("index.html");
    }
    
}