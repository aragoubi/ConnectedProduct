
    
	var app = {
		 
		initialize: function(){
			
		document.addEventListener("deviceready", this.onDeviceReady, false);
		//app.disconnect();
        //var myDB = null;
		},

        onDeviceReady: function(){
			
			

			
			
			
            //alert("hello");
            //myDB = window.openDatabase("test", "1.0", "Test DB", 1000000);
			
			/*this work with mobile device
            myDB = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
			*/


            //myDB.transaction(app.PopulateDatabase, app.errorDB, app.successDB);
            //myDB.transaction(this.queryDB, this.errorCB, this.querySuccess);
        },
		

        PopulateDatabase:function (tx) {
            //tx.executeSql('DROP TABLE IF EXISTS DEMO');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
            //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
            //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
            //tx.executeSql('INSERT INTO DEMO (id, data) VALUES (3, "Third row")');
        },

         errorDB :function(error) {
			console.log(error);
            alert("Error on Database creation : " + error);
        },
		
         successDB :function() {
            alert("Database is created or opened successfully");
        },

         queryDB :function(tx) {
            tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
        },

        querySuccess :function (tx, results) {
            //var len = results.rows.length;
           /* alert("DEMO table: " + len + " rows found.");
            for (var i = 0; i < len; i++) {
                alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
                	
            }*/
        },

        errorCB :function (err) 
		{
            alert("Error processing SQL: " + err.code);
        },
		
		signup: function()
		{
			
			var email = document.getElementById("email").value;
			var password = document.getElementById("password").value;
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			  // Handle Errors here.
			  alert("ciao");
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(error);
			  console.log(errorMessage);
			});
			//alert("ciao");
			/*
			});*/
			if(firebase.auth().currentUser != null){
				alert("user registered");
				app.redirect();
			}
		},
		
		signIn: function()
		{
			app.connect();
			app.redirect();
		},
		
		connect: function()
		{
		    
			firebase.auth().signOut();
			var email = document.getElementById("email").value;
			var password = document.getElementById("password").value;
			alert(email);
			alert(password);
			var utilisateur = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
     		// Handle Errors here.
			
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error);
			console.log(errorMessage);		
			if(errorCode == "auth/invalid-email")
				alert("adresse email invalide");
			else if(errorCode == "auth/wrong-password"){
			alert("wrong password");
			}						
			});			
		},
		
		
		redirect: function()
		{	
			firebase.auth().onAuthStateChanged(function(user) { 
			
				if(firebase.auth().currentUser != null){
					alert("user registered");			
					window.location.href= "/welcomePage.html";
				}
			});
		},
		
		resetPassword: function()
		{
			var email = document.getElementById("email").value;
			firebase.auth().sendPasswordResetEmail(email).catch(function(error){
				console.log(error.code);
				console.log(error.message);
		});
		},
		
		disconnect: function()
		{
		alert("wait : signing out");
		firebase.auth().signOut();
		//app.disconnectFunction();	
		alert("user signed out");			
		window.location.href= "/login.html";		
		},
				
		/*disconnectFunction: function()
		{			
			firebase.auth().onAuthStateChanged(function(user) { 		
				if(firebase.auth().currentUser = null){
					alert("user signed out");			
					window.location.href= "/login.html";
				}	
			})
		},*/
		
		
		sleep: function(ms) 
		{
			return new Promise(resolve => setTimeout(resolve, ms));
		},
		
		demo: function(ms) {
			console.log('Taking a break...');
			app.sleep(ms);
			console.log(ms + 'second later');
		},
		
	};
	
	$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
});
	
		
    