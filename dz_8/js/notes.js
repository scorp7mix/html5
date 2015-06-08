var ls = localStorage;
var notes = $('#notes');
var noNotesMsg = $('<div>Записей нет</div>');
var notesArr, noteId, noteText, newNote, maxId;

function refreshNotes() {
    notes.empty();
    if(ls.length == 0) {
        notes.append(noNotesMsg);
    } else {
        notesArr = [];
        for(var i = 1, l = ls.length; i < l + 1; i++) {
            notesArr.push([Number(ls.key(i - 1)), ls.getItem(ls.key(i - 1))]);
        }
        notesArr.sort(function(a,b){return b[0]-a[0]});
        maxId = 0;

        for(i = 0, l = notesArr.length; i < l; i++) {
            noteId = notesArr[i][0];
            maxId = noteId > maxId ? noteId : maxId;
            noteText = notesArr[i][1];
            newNote = $('<div class="row note"></div>');
            newNote.append($('<div class="note-id" hidden>' + noteId + '</div>'));
            newNote.append($('<div class="col-xs-11 note-text">' + noteText + '</div>'));
            newNote.append($('<div class="col-xs-1"><button type="button" class="close note-del">&times;</button></div>'));
            //if(i != l) newNote.append($('<div class="col-xs-12"><hr></div>'));
            notes.append(newNote);
        }
        noteId = false;
    }
    $('.note-del').on('click', function() {
        ls.removeItem($(this).parent().parent().find('.note-id').text());
        refreshNotes();
    });
}

$(document).ready(function() {

    refreshNotes();

    $('#note-btn-save').on('click', function() {
        if(!noteId) {
            noteId = maxId + 1;
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

});