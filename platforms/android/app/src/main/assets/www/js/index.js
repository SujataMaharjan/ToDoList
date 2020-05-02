/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.devicereadyListener.bind(this), false);
        document.addEventListener('pause', this.pauseListner.bind(this), false);
        document.addEventListener('resume', this.resumeListner.bind(this), false);

        $("#menubar").click(this.menuBar);
        $("#add_button").click(this.addButton);
        $("#go_back").click(this.backListner);

        var someDiv = document.getElementById('someId');
someDiv.appendChild(checkbox);
    },

    // When the user clicks on the menu button
    menuBar: function () {
        document.getElementById($("#myDropdown")).classList.toggle('show');
    },

    addButton: function () {

        // hide list 
        $('#list_page').addClass("inactive_page");
        // display new task adding
        $('#add_task').removeClass("inactive_page");
    },

    devicereadyListener: function () {
        $('#list_page').removeClass("inactive_page");
    },

    backListner: function () {
        // hide new task window 
        $('#add_task').addClass("inactive_page");
        // display list
        $('#list_page').removeClass("inactive_page");
    },

    pauseListner: function () {
        this.receivedEvent('pause');
    },

    resumeListner: function () {
        this.receivedEvent('resume');
    }
};

app.initialize();