var ls = localStorage;
var notes = $('#notes');
var notesArr,       // массив заметок из localStorage
    noteId,         // id текущей заметки
    noteText,       // текст текущей заметки
    newNote,        // объект новой заметки
    maxId;          // максимальный id

// обновление списка заметок
function refreshNotes() {
    notes.empty();
    if(ls.length == 0) {
        notes.append($('<div>Записей нет</div>'));
    } else {
        // сначала заметки выгружаются в массив, для сортировки
        notesArr = [];
        for(var i = 1, l = ls.length; i < l + 1; i++) {
            notesArr.push([Number(ls.key(i - 1)), ls.getItem(ls.key(i - 1))]);
        }
        notesArr.sort(function(a,b){return b[0]-a[0]});
        maxId = 0;

        // потом выводятся в подготовленный div
        for(i = 0, l = notesArr.length; i < l; i++) {
            noteId = notesArr[i][0];
            maxId = noteId > maxId ? noteId : maxId;
            noteText = notesArr[i][1];
            newNote = $('<div class="row note"></div>');
            newNote.append($('<div class="note-id" hidden>' + noteId + '</div>'));
            newNote.append($('<div class="col-xs-11 note-text">' + noteText + '</div>'));
            newNote.append($('<div class="col-xs-1"><button type="button" class="close note-del">&times;</button></div>'));
            notes.append(newNote);
        }
        noteId = false;
    }
    // просмотр выбранной заметки
    $('.note').on('click', function() {
        noteId = $(this).find('.note-id').text();
        $('#note-edit-text').val(ls.getItem(String(noteId))).prop('disabled','');
    });
    // удаление заметки
    $('.note-del').on('click', function() {
        ls.removeItem($(this).parent().parent().find('.note-id').text());
        refreshNotes();
    });
}

$(document).ready(function() {

    refreshNotes();

    // сохранение редактированной заметки
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

    // создание новой заметки
    $('#note-btn-new').on('click', function() {
        $('#note-edit-text').val('').prop('disabled','');
    });

    // разблокирование кнопки "сохранить" если текст не пустой
    $('#note-edit-text').on('input', function() {
        if($('#note-edit-text').val().trim() == '') {
            $('#note-btn-save').prop('disabled','disabled');
        } else {
            $('#note-btn-save').prop('disabled','');
        }
    });

});