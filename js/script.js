/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задания на урок 2:

6) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

7) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

8) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

10) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]'),
          btn = document.querySelector('button');

    addForm.addEventListener('submit', (event) => { // submit отследит отправку формы

        event.preventDefault();

        let newFilm = addInput.value; // в value будет содержаться то, что ввел пользователь
        const favorite = checkbox.checked; // checked позволит получить true или false при нажатии на голочку

        if (newFilm) { // проверка на то, что не пустая строка

            if (newFilm.length > 21) {

                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    const movieDB = {

        movies: [

            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const deleteAdv = (arr) => {

        arr.forEach(img => {

            img.remove();
        });
    };

    deleteAdv(adv);

    const makeChanges = () => {

        genre.innerHTML = "ДРАМА";

        poster.style.background = "url('img/bg.jpg') center top/cover no-repeat";
    };

    makeChanges();

    const sortArr = (arr) => {

        arr.sort();
    }

    function createMovieList(films, parent) {

        parent.innerHTML = "";
        sortArr(films);

        films.forEach((film, i) => {

            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {

            btn.addEventListener('click', () => {

                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList(films, parent);
            });
        });
    }

    createMovieList(movieDB.movies, movieList);
});