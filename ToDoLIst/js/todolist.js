import { Todo } from '../js/Todo.js';

let todolist = [];

$(() => {

    stampaTodo();

    $('#inserisci').on('click', function () {
        let titolo = $('#titolo').val();
        let testo = $('#testo').val();
        let todo = new Todo(titolo, testo);
        todolist.push(todo);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
        $('#titolo').val('');
        $('#testo').val('');
    });

    function stampaTodo() {
        let lista = $('.lista ul');
        lista.html('');
        let localLista = localStorage.getItem('listaTodo');
        if (localLista !== null) {
            todolist = JSON.parse(localLista);
        }


        $.each(todolist, function (index, item) {
            $(lista).append(`<li class="list-group-item">${item.titolo} - ${item.testo} <span id='rimuovi' class='btn btn-sm btn-danger float-end'>X</span></li>`);
        });

    }

        $('#listaTodo').on('click', '#rimuovi', function () {
            let indice  = $(this.parentElement).index();
            todolist.splice(indice, 1);
            localStorage.setItem('listaTodo', JSON.stringify(todolist))
            stampaTodo();
    });

});

document.addEventListener('DOMContentLoaded', function () {
    stampaTodo();
    let button = document.querySelector('.todo button');
    button.addEventListener('click', function () {
        let titolo = document.querySelector('#titolo');
        let testo = document.querySelector('#testo');
        let todo = new Todo(titolo.value, testo.value);
        todolist.push(todo);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
    });
});


// Versione vanilla

// let stampaTodo = () => {
//     let lista = document.querySelector('.lista ul');
//     lista.innerHTML = '';

//     let localLista = localStorage.getItem('listaTodo');
//     if (localLista !== null) {
//         todolist = JSON.parse(localLista);
//     }

//     todolist.forEach((todo) => {
//         let li = document.createElement('li');
//         let i = 0;
//         li.className = 'list-group-item';
//         li.innerHTML = todo.titolo + ' - ' + todo.testo;
//         li.innerHTML += '<span id="rimuovi" class="btn btn-sm btn-danger float-end">X</span>';
//         lista.appendChild(li);
//         let rimuovi = $('#rimuovi');
//         rimuovi.on('click', function () {
//             todolist.splice(todolist.indexOf(todo), 1);
//             localStorage.setItem('listaTodo', JSON.stringify(todolist));
//             stampaTodo();
//         })
//     });
// }