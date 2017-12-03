$(document).ready(function() {
    var table = $('#example').DataTable({
        "ajax": {
            "url": "http://localhost:8080/api/admin/all-user",
            "type": "get"
        },
        "columns": [
            { "data": "username" },
            { "data": "exp" },
            { "data": "current_level" },
            { "data": null, "defaultContent": "<button>View</button>" }
        ],
    });
});