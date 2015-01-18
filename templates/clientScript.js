document.addEventListener("DOMContentLoaded", function() {
    var content = {
        name: "<%= name %>",
        login: "<%= login %>",
        fields:[<%= _.map(fields, function(field){return JSON.stringify(field);}) %>]
    };

    for (var i = 0; i < content.fields.length; i++) {
        var fieldName = content.fields[i].name;
        var fieldBody = content.fields[i].body;
        var selectedFields = document.querySelectorAll('[data-ezedit-field="' + fieldName + '"]');
        for (var j = 0; j < selectedFields.length; j++) {
            selectedFields[j].innerHTML = fieldBody;
        }
    }
});