var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.devicereadyListener.bind(this), false);

        // navigator.geolocation.getCurrentPosition(geolocationSuccess,
        //     [geolocationError],
        //     [geolocationOptions]);
        var localStorage = window.localStorage;

        $("#menubar").click(this.menuBar);
        $("#add_button").click(this.addButton);
        $("#go_back").click(this.backListner);
        $("#save_btns").click(this.newListListner);
        $("#delete_completed").click(this.deleteListListner);
        $("#refresh").click(this.refreshListner);
        $("#delete").click(this.deleteListner);
    },

    // When the user clicks on the menu button
    menuBar: function () {
        document.getElementById($("#myDropdown")).classList.toggle('show');
    },
    deleteListListner: function(e){
        alert("Here");
        var target = $(e.target );
        if (target.is(":checked")) {
            alert("No del");
            document.getElementById("delete").disabled = false;
            localStorage.setItem("cbo", 1);
        } else {
            alert("No del");
            document.getElementById("delete").disabled = true;
             localStorage.removeItem("cbo");
        }
            var list = $("#list").html();
  localStorage.setItem("list", list);
          
        //   var list = $("#list").html();
        //   localStorage.setItem("list", list);
          
    },

    addButton: function () {

        // hide list 
        $('#list_page').addClass("inactive_page");
        // display new task adding
        $('#add_task').removeClass("inactive_page");
    },

    newListListner: function () {

        var userList = $('#new_tasks').val();
        if (userList == "") {
            alert("Sorry! You cannot save empty list");
            return;
        }
        else {
            // var userList = $('#new_tasks').val();
            $('#new_tasks').val('');
            var newitem = '<table class="table" border="1" border-collapse="collapse"> <tr> <td><input id="cbo" type="checkbox" name="checkbox-name"/> ' + userList + 
            '</td> <td><input type="button" disabled="true" value="Delete" id="delete" class="btn btn-info btn-md"/> </td></tr></table>';
            $('#list').append(newitem);

            var list = $("#list").html();
            localStorage.setItem('list', list);
            alert("Task Added!");
            // return false;
            // hide new task window 
            $('#add_task').addClass("inactive_page");
            // display list
            $('#list_page').removeClass("inactive_page");
        }
    },
deleteListner: function () {
    alert("Delete Listner");
    var parent = $(this).parent();
  parent.remove();

  var list = $("#list").html();
  localStorage.setItem("list", list);
  return false;
},
comboListner: function () {

},
    devicereadyListener: function () {
        // alert(navigator.geolocation);
        // var onSuccess = function(position) {
        //     alert('Latitude: '          + position.coords.latitude          + '\n' +
        //           'Longitude: '         + position.coords.longitude         + '\n' +
        //           'Altitude: '          + position.coords.altitude          + '\n' +
        //           'Accuracy: '          + position.coords.accuracy          + '\n' +
        //           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //           'Heading: '           + position.coords.heading           + '\n' +
        //           'Speed: '             + position.coords.speed             + '\n' +
        //           'Timestamp: '         + position.timestamp                + '\n');
        // };
     
        // // onError Callback receives a PositionError object
        // //
        // function onError(error) {
        //     alert('code: '    + error.code    + '\n' +
        //           'message: ' + error.message + '\n');
        // }
     
        // navigator.geolocation.getCurrentPosition(onSuccess, onError);
        // alert(navigator.camera);
        $('#list_page').removeClass("inactive_page");
        if (localStorage.getItem('list')) {
            $('#list').html(localStorage.getItem('list'));
        }
        // $('#delete').click(function() {
        //     // var parent = $(this).parent();
        //     alert("Delete button delete");
        //     // parent.remove();
        //     localStorage.removeItem("cbo");
        //     var list = $("#list").html();
        //     localStorage.removeItem("list", list);
        //     return false;
        //   });

          $('#cbo').change(function() {
            if ($(this).prop('checked')) {
                alert("CBO check");
                document.getElementById("delete").disabled = false;
            //   $(this).attr('checked', 'checked');
            } else {
                document.getElementById("delete").disabled = true;
            //   $(this).removeItem('checked');
            }
            var list = $("#list").html();
            localStorage.setItem("list", list);
          });
    },

    refreshListner: function () {
        console.log("Refresh");
        document.location.reload(true);
    },

    backListner: function (event) {
        // e.preventDefault();
        // hide new task window 
        $('#add_task').addClass("inactive_page");
        // display list
        $('#list_page').removeClass("inactive_page");
    },
};

app.initialize();