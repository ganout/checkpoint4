//Start for Materialize
$(document).ready(function(){
    $('select').formSelect();
    $('.modal').modal();
});
//End fot Materialize

/*fetch('/admin-menu/new')
    .then(function (response) {
        return response.text()
    }).then(function (content) {
    let parser = new DOMParser();
    let html = parser.parseFromString(content, 'text/html');
    let sectionDish = document.getElementById("templateDish");
    let newResult = html.getElementById("dishSelected");
    sectionDish.innerHTML = newResult.innerHTML;
});*/

//Start to collect the selected company
let dish = document.getElementById("dish-choice");
let dishSelected = dish.addEventListener('change', function() {

    let valueDish = dish.options[dish.selectedIndex].value;
    fetch('/admin-menu/' + valueDish)
        .then(function (response) {
            return response.text()
        }).then(function (content) {
        let parser = new DOMParser();
        let html = parser.parseFromString(content, 'text/html');
        let sectionDish = document.getElementById("templateDish");
        let newResult = html.getElementById("dishSelected");
        sectionDish.innerHTML = newResult.innerHTML;
    });
});
//End