$(document).ready(function () {
    $('#loginPreloader').hide();
    load.init();
});
var indexTable;
var firebaseConfig;
var load = {
    init: function () {
        load.login();       
    },
    login: function () {        
        $.ajax({
            type: "POST",
            url: "/config/get-firebase",                     
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            async: false,
        })
            .done(function (response) {
                firebaseConfig = {
                    apiKey: response.apiKey,
                    authDomain: response.authDomain,
                    databaseURL: response.databaseURL,
                    projectId: response.projectId,
                    storageBucket: response.storageBucket,
                    messagingSenderId: response.measurementId,
                    appId: response.appId,
                    measurementId: response.measurementId
                };
            })
            .fail(function () {               
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error from server, or request time out!',
                })
                return;
            });        
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        
        $('#btn-login').on('click', function () {
            firebase.auth().signInWithPopup(provider).then(async function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                //var aaa = await firebase.auth.currentUser();
                const Idtoken = await firebase
                    .auth()
                    .currentUser.getIdToken(true);
                await firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        //document.getElementById("uid").value = user.uid;
                    }
                })
                console.log(Idtoken);
                $.ajax({
                    type: "POST",
                    url: "/login/sign-in",
                    data: JSON.stringify({
                        Token: Idtoken,
                        FcmToken: '',
                    }),
                    beforeSend: function () {
                        $('#loginPreloader').show();
                    },
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    async: true,
                })
                    .done(function (response) {
                        $('#loginPreloader').hide();
                        if (response == "403") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error from server, request time out, or email is existed in system!',
                            })
                            return;
                        } else if (response == "500") {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Error from server, request time out, or email is existed in system!',
                            })
                            return;
                        } else {
                            window.location.assign(response);
                        }
                    })
                    .fail(function () {
                        $('#loginPreloader').hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error from server, or request time out!',
                        })
                        return;
                    });

            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            });
        });
    },          
}

