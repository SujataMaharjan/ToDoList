var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.devicereadyListener.bind(this), false);

        var localStorage = window.localStorage;

        $("#menubar").click(this.menuBar);
        $("#add_button").click(this.addButton);
        $("#go_back").click(this.backListner);
        $("#save_btn").click(this.newListListner);
        $("#refresh").click(this.refreshListner);
        $("#camera_button").click(this.cameraListner);
        $("#location_button").click(this.locationListner);
    },

    // When the user clicks on the menu button
    menuBar: function () {
        document.getElementById($("#myDropdown")).classList.toggle('show');
    },

    //camera plugin function
    cameraListner: function (selection) {
        console.log("cameraButton Working");
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    },

    // geolocation plugin function
    locationListner: function (selection) {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 3600000
        }
        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n');
        };

        function onError(error) {
            alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
        }

    },

    addButton: function () {
        // hide list 
        $('#list_page').addClass("inactive_page");
        // display new task adding
        $('#add_task').removeClass("inactive_page");
    },

    newListListner: function () {

        var userList = $('#new_task').val();
        //if task field empty
        if (userList == "") {
            alert("Sorry! You cannot save empty list");
            return;
        }
        else {
            //clear text field
            $('#new_task').val('');
            //create table to keep tasks
            var newitem = '<table class="table" border="1" border-collapse="collapse"> <tr> <td><input id="cbo" type="checkbox"  name="chkbox"/> ' + userList +
                '<input type="button" value="Delete" id="delete" class="btn btn-info btn-md" style="float:right"/> </td></tr></table>';
            //storing the tasks
            $('#task_list').append(newitem);

            var task_list = $("#task_list").html();
            localStorage.setItem('task_list', task_list);
            alert("Task Added!");
            // hide new task window 
            $('#add_task').addClass("inactive_page");
            // display list
            $('#list_page').removeClass("inactive_page");
        }
    },

    devicereadyListener: function () {
        $('#list_page').removeClass("inactive_page");

        //loading data from localStorage
        if (localStorage.getItem('task_list')) {
            $('#task_list').html(localStorage.getItem('task_list'));
        };

        // $('#delete').click( function () {
        //deleting tasks with delete id
        $(document).on('click', '#delete', function () {
            alert("You are deleting a completed task");
            // selecting current task to delete
            var parent = $(this).parent();
            parent.remove();

            //storing only the remaining tasks
            var task_list = $("#task_list").html();
            localStorage.setItem("task_list", task_list);
        });

        //checkbox on change function and crossing out tasks
        $(document).on('change', "input[name='chkbox']", function (e) {
            //checking if checkbox is checked or not
            if ($(this).prop('checked')) {
                //alert("You are checking a completed task");
                $(this).attr('checked', 'checked');
                // document.getElementById("delete").disabled = false;

                //crossing tasks when checkbox checked
                $(this).parent().toggleClass('stroked');
                // localStorage.setItem("cbo");
            } else {
                // document.getElementById("delete").disabled = true;
                $(this).removeAttr('checked');
                // localStorage.removeItem("cbo");
            }
            var task_list = $("#task_list").html();
            localStorage.setItem("task_list", task_list);
        });

    },

    refreshListner: function () {
        console.log("Refresh");
        document.location.reload(true);
    },

    backListner: function (event) {
        event.preventDefault();
        // hide new task window 
        $('#add_task').addClass("inactive_page");
        // display list
        $('#list_page').removeClass("inactive_page");
    },
};

app.initialize();