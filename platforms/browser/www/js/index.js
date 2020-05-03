var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.devicereadyListener.bind(this), false);

        var localStorage = window.localStorage;

        $("#menubar").click(this.menuBar);
        $("#add_button").click(this.addButton);
        $("#go_back").click(this.backListner);
        $("#save_btn").click(this.newListListner);
        $("#delete_completed").click(this.deleteListListner);
        $("#refresh").click(this.refreshListner);
        $("#delete").click(this.deleteListner);
        // $("#cbo").click(this.comboListner);
        $("#camera_button").click(this.cameraListner);
        $("#location_button").click(this.locationListner);
    },

    // When the user clicks on the menu button
    menuBar: function () {
        document.getElementById($("#myDropdown")).classList.toggle('show');
    },
    cameraListner: function (selection) {
        console.log("cameraButton Working");
        alert("Camera working");
        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);


        var srcType = Camera.PictureSourceType.CAMERA;
        var options = setOptions(srcType);
        var func = createNewFileEntry;

        navigator.camera.getPicture(function cameraSuccess(imageUri) {

            displayImage(imageUri);
            // You may choose to copy the picture, save it somewhere, or upload.
            func(imageUri);

        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");

        }, options);
    },
    locationListner: function () {
        navigator.geolocation.getCurrentPosition(geolocationSuccess,
            [geolocationError],
            [geolocationOptions]);
        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n');
        };


        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },
    deleteListListner: function (e) {
        alert("Here");
        var target = $(e.target);
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
    },

    addButton: function () {
        // hide list 
        $('#list_page').addClass("inactive_page");
        // display new task adding
        $('#add_task').removeClass("inactive_page");
    },

    newListListner: function () {

        var userList = $('#new_task').val();
        if (userList == "") {
            alert("Sorry! You cannot save empty list");
            return;
        }
        else {
            // var userList = $('#new_tasks').val();
            $('#new_task').val('');
            var newitem = '<table class="table" border="1" border-collapse="collapse"> <tr> <td><input id="cbo" type="checkbox"  name="checkbox-name"/> ' + userList +
                '<input type="button" value="Delete" disabled="true" id="delete" class="btn btn-info btn-md" style="float:right"/> </td></tr></table>';
            $('#list').append(newitem);

            var list = $("#list").html();
            localStorage.setItem('list', list);
            alert("Task Added!");
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
        alert("CBO start");

        $('#cbo').val($(this).is(':checked'));
        if (document.getElementById($('#cbo')).checked) {
            alert("CBO check");
            document.getElementById("delete").disabled = false;
            //   $(this).attr('checked', 'checked');
        } else {
            document.getElementById("delete").disabled = true;
            //   $(this).removeItem('checked');
        }
        // var list = $("#list").html();
        // localStorage.setItem("list", list);
    },
    devicereadyListener: function () {
        // alert(navigator.geolocation);

        // alert(navigator.camera);
        // navigator.camera;
        $('#list_page').removeClass("inactive_page");
        if (localStorage.getItem('list')) {
            $('#list').html(localStorage.getItem('list'));
        }
        $('#delete').click(function () {
            // var parent = $(this).parent();
            alert("Delete button clicked");
            // parent.remove();
            var parent = $(this).parent();
            parent.remove();

            var list = $("#list").html();
        localStorage.setItem("list", list);
        });

        $('#cbo').click(function (e) {
            var target = $(e.target);
            if (target.is(":checked")) {
                alert("check box button clicked");
                document.getElementById("delete").disabled = false;
                localStorage.setItem("cbo", 1);
            } else {
                document.getElementById("delete").disabled = true;
                localStorage.removeItem("cbo");
            }
        });

        $(document).on('change', "input[name='checkbox-name']", function (e) {
            if ($(this).prop('checked')) {
              $(this).attr('checked', 'checked');
            } else {
              $(this).removeAttr('checked');
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