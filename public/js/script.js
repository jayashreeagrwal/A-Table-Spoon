let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let addIngredientsList = document.querySelector('.ingredientList');
let ingredientDivs = document.querySelectorAll('.ingerdientDiv');

addIngredientsBtn.addEventListener('click', function(){
    let newIngredients = ingredientDivs[0].cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    addIngredientsList.appendChild(newIngredients);
});



//themeSwitcher 
// const input = document.querySelector('.theme-switcher input');

// input.addEventListener('change', (e)=>{
//     if(e.target.checked){
//         document.body.setAttribute('data-theme','dark');
//     }else{
//         document.body.setAttribute('data-theme','light');
//     }
// })






//uploadButton 
// let uploadButton = document.querySelector('button[type="upload"]');

// uploadButton.addEventListener('click', function() {
//   let inputs = document.querySelectorAll('.input');
//   let textareas = document.querySelectorAll('.textarea');
  
//   let formValid = true;

//   inputs.forEach(function(input) {
//     if (!input.value) {
//       formValid = false;
//     }
//   });

//   textareas.forEach(function(textarea) {
//     if (!textarea.value) {
//       formValid = false;
//     }
//   });

//   if (formValid) {
//     document.querySelector('form').submit();
//   } else {
//     alert('Please fill out all required fields');
//   }
// });
