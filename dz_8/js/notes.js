$(document).ready(function() {
    var ls = localStorage;
    console.log(ls);
    var notes = $('#notes');
    var noNotesMsg = $('<div>Записей нет</div>');
    var noteId, noteText, newNote;

    function refreshNotes() {
        notes.empty();
        if(ls.length == 0) {
            notes.append(noNotesMsg);
        } else {
            for(var i = 1, l = ls.length; i < l + 1; i++) {
                noteId = i;
                noteText = ls.getItem(noteId);
                newNote = $('<div class="row note"></div>');
                newNote.append($('<div class="col-xs-1 note-id">' + noteId + '</div>'));
                newNote.append($('<div class="col-xs-10 note-text">' + noteText + '</div>'));
                newNote.append($('<div class="col-xs-1"><button type="button" class="close note-del">&times;</button></div>'));
                if(i != l) newNote.append($('<hr/><hr/>'));
                notes.append(newNote);
            }
            noteId = false;
        }
    }

    $('#note-btn-save').on('click', function() {
        if(!noteId) {
            noteId = ls.length + 1;
        }
        ls.setItem(noteId, $('#note-edit-text').val());
        $('#note-edit-text').val('').prop('disabled','disabled');
        $('#note-btn-save').prop('disabled','disabled');
        noteId = false;
        refreshNotes();
    });

    $('#note-btn-new').on('click', function() {
        $('#note-edit-text').val('').prop('disabled','');
    });

    $('#note-edit-text').on('input', function() {
        if($('#note-edit-text').val().trim() == '') {
            $('#note-btn-save').prop('disabled','disabled');
        } else {
            $('#note-btn-save').prop('disabled','');
        }
    });

    refreshNotes();
});