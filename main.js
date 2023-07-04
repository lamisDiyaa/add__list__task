;let addBtn = document.querySelector('input[type="submit"]');
let textInput = document.querySelector('input[type="text"]');
let tbody = document.getElementById("tbody");
let tasks = [];
let globalId;

// console.log(tasks);

if (localStorage.getItem("inputValue") === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem("inputValue"));
  display();
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let obj={
    id:Date.now(),
    task: textInput.value 
  }
  if (globalId == undefined) {
    tasks.push(obj);

    localStorage.setItem("inputValue", JSON.stringify(tasks));
    display();
  } else {
    let index = tasks.findIndex(function (editedItem) {
      return editedItem.id == globalId;
    });
    tasks[index].task = textInput.value;

    addBtn.value = "ADD";

    console.log(index);
    globalId = undefined;
    localStorage.setItem("inputValue", JSON.stringify(tasks));
    display();
  }
});
function display() {
  let list = "";

  tasks.forEach(function (ele) {
    list += `
    <tr>
    <td>1</td>
    <td>${ele.task} </td>
    <td>
        <button class="btn btn-success btn-edit" data-id="${ele.id}">edit</button>
    </td>
    <td>
        <button class="btn btn-danger btn-delete"data-id="${ele.id}">delete</button>
    </td>
</tr> 
    
        `;
  });
  tbody.innerHTML = list;
  localStorage.setItem("inputValue", JSON.stringify(tasks));
}
display();
let deletedBtns = document.querySelectorAll(".btn-delete");
let editedBtns = document.querySelectorAll(".btn-edit");

// deletedBtns.forEach(function (ele) {
//   ele.addEventListener("click", function () {
//     let selected = ele.dataset.id;
//     // console.log(selected)
//     let newList = tasks.filter(function (item) {
//       return item.id != selected;
//     });
//     // console.log(newList)
//     tasks = newList;
//     ele.parentElement.parentElement.remove();
//     localStorage.setItem("inputValue", JSON.stringify(tasks));

    
//   });
// });
// editedBtns.forEach(function (ele) {
//   ele.addEventListener("click", function () {
//     let ediedId = ele.dataset.id;
//     let selesctedItem = tasks.find(function (item) {
//       return item.id == ediedId;
//     });

//     textInput.value = selesctedItem.task;
//     addBtn.value = "update";
//     globalId = ediedId;
//     console.log(selesctedItem.id);
//   });
// });



tbody.addEventListener("click",function(e){
e.preventDefault()
if(e.target.classList.contains("btn-edit")){
  let ediedId = e.target.dataset.id;
  let selesctedItem = tasks.find(function (item) {
    return item.id == ediedId;
  });

  textInput.value = selesctedItem.task;
  addBtn.value = "update";
  globalId = ediedId;
  console.log(selesctedItem.id);
}else if(e.target.classList.contains("btn-delete")){
  let selected = e.target.dataset.id;
  // console.log(selected)
  let newList = tasks.filter(function (item) {
    return item.id != selected;
  });
  // console.log(newList)
  tasks = newList;
  e.target.parentElement.parentElement.remove();
  localStorage.setItem("inputValue", JSON.stringify(tasks));

}
})
