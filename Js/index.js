
import { tBody,
selects,
sortId,
sortName,
sortSurname,
sortSalary,
inputSearch,
sortPositions,
minSalary,
maxSalary,
salaryFilterBtn,
salaryResetBtn,
filterSelect,
addBtn,
closeBtn,
popUp,
yesBtn,
noBtn} from "./variables.js";

let userLocal = []
let users = [];
let index = 0;


if ( JSON.parse(localStorage.getItem("array")) !==null){
  userLocal =JSON.parse(localStorage.getItem("array"))
  if(userLocal.length>0){
    users = userLocal
    console.log(userLocal)
    users.sort(function (a, b) {
      return a.Id - b.Id;
    });
    index = userLocal[userLocal.length-1].Id 
    userLocal.forEach(function(user){
      addTable(user)
      editData()
    })
  }
}

 let indexId ;
function deleteFunc(id) {
popUp.classList.remove("d-none")

 id = Number(id);
 indexId = users.findIndex(function (user) {
   return user.Id === id;
 });

}

addPerson()

function addPerson(){
  let selectedCheck = "";
selects.addEventListener("click", function () {
  let selectedOption = selects.options[selects.selectedIndex];
  let selectedValue = selectedOption.value;
  selectedCheck = selectedValue;
});

  addBtn.addEventListener("click", function () {
    const user = {
      Id: 0,
      Name: "",
      Surname: "",
      Salary: 0,
      Position: "",
    };
    let userName = document.querySelector(".user-name").value;
    let userSurname = document.querySelector(".user-surname").value;
    let userSalary = document.querySelector(".user-salary").value;
    userSalary = Number(userSalary);
   
    user.Name = userName;
    user.Surname = userSurname;
    user.Salary = userSalary;
    user.Position = selectedCheck;
    if (
      userName == "" ||
      userSurname == "" ||
      userSalary == "" ||
      user.Position == ""
    ) {
      alert("Butun melumatlari doldurun");
    } else {
   

    if(userLocal.length>0){

        user.Id =  index + 1 
       index++;
       users = userLocal
       users.push(user);
       localStorage.setItem("array",JSON.stringify(users))
       userLocal = JSON.parse(localStorage.getItem("array"))
       console.log(userLocal)
         addTable(user);
         editData();

  
      
       }
       else if(userLocal.length===0){
        user.Id = index ;
        console.log("else")
        users.push(user);
        userLocal=users
        localStorage.setItem("array",JSON.stringify(users))
        addTable(user);
        editData();
       }
    }
  });
}


function addTable(item) {
  tBody.innerHTML +=
    '<tr id="' +
    item.Id +
    '"><td class = "id">' +
    item.Id +
    '</td><td class = "name">' +
    item.Name +
    '</td><td class ="surname">' +
    item.Surname +
    '</td><td class = "salary">' +
    item.Salary +
    "</td><td>" +
    item.Position +
    '<button class="deleteBtn" type="button" id ="' +
    item.Id +
    '" style="padding:10px;background-color:red;float:right;">Delete</button></td></tr>';

    document.querySelectorAll(".deleteBtn").forEach((item) => {
      item.onclick = ()=>{
        console.log(item.id)
        deleteFunc(item.id)
      }
    })
}


idSorting();
function idSorting() {
  sortId.addEventListener("click", function () {
    sortId.classList.toggle("test");

    if (!sortId.classList.contains("test")) {
      users.sort(function (a, b) {
        return b.Id - a.Id;
      });

      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      users.sort(function (a, b) {
        return a.Id - b.Id;
      });

      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

salarySorting();

function salarySorting() {
  sortSalary.addEventListener("click", function () {
    sortSalary.classList.toggle("test");

    if (!sortSalary.classList.contains("test")) {
      users.sort(function (a, b) {
        console.log(typeof a.Salary);
        return b.Salary - a.Salary;
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      users.sort(function (a, b) {
        return a.Salary - b.Salary;
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

nameSorting();

function nameSorting() {
  sortName.addEventListener("click", function () {
    sortName.classList.toggle("test");

    if (!sortName.classList.contains("test")) {
      users.sort(function (a, b) {
        if (b.Name > a.Name) {
          return -1;
        }
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      tBody.innerHTML = "";
      users.reverse();
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

surnameSorting();

function surnameSorting() {
  sortSurname.addEventListener("click", function () {
    sortSurname.classList.toggle("test");

    if (!sortSurname.classList.contains("test")) {
      users.sort(function (a, b) {
        if (b.Surname > a.Surname) {
          return -1;
        }
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      tBody.innerHTML = "";
      users.reverse();
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

sortPosition();
function sortPosition() {
  sortPositions.addEventListener("click", function () {
    sortPositions.classList.toggle("test");

    if (!sortPositions.classList.contains("test")) {
      users.sort(function (a, b) {
        if (b.Position > a.Position) {
          return -1;
        }
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      tBody.innerHTML = "";
      users.reverse();
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}


closeBtn.addEventListener("click",function(){
  popUp.classList.add("d-none")
})


noBtn.addEventListener("click",function(){
  popUp.classList.add("d-none")
})

yesBtn.addEventListener("click",function(){
  users.splice(indexId, 1);
  localStorage.setItem("array",JSON.stringify(users))
  tBody.innerHTML = "";
  users.forEach(function (user) {
    addTable(user);

  });
  popUp.classList.add("d-none")
})


searchFunc();

function searchFunc() {
  inputSearch.addEventListener("keyup", function () {
    let rows = document.querySelectorAll("tr");
    rows.forEach(function (row) {
      let text = row.textContent.toLowerCase();
      if (text.includes(inputSearch.value.toLowerCase())) {
        row.classList.remove("d-none");
      } else {
        row.classList.add("d-none");
      }
    });
  });
}

salaryFilterBtn.addEventListener("click", function () {
  salaryFilter();
});

resetSalaryFilter();

function resetSalaryFilter() {
  salaryResetBtn.addEventListener("click", function () {
    tBody.innerHTML = "";
    users.forEach(function (item) {
      addTable(item);
    });
  });
}
function resetFilter() {
  tBody.innerHTML = "";
  users.forEach(function (user) {
    addTable(user);
  });
}

function salaryFilter() {
  let minValue = Number(minSalary.value);
  let maxValue = Number(maxSalary.value);

  if (minValue !== 0 && maxValue == 0) {
    let filterArr = users.filter(function (user) {
      if (minValue <= user.Salary) {
        return user;
      }
    });
    tBody.innerHTML = "";
    filterArr.forEach(function (item) {
      addTable(item);
      editData();
    });
    filterArr.splice(0, filterArr.length);
  } else if (maxValue !== 0 && minValue == 0) {
    let filterArr = users.filter(function (user) {
      if (maxValue >= user.Salary) {
        return user;
      }
    });
    tBody.innerHTML = "";
    filterArr.forEach(function (item) {
      addTable(item);
      editData();
    });
    filterArr.splice(0, filterArr.length);
  } else if (maxValue !== 0 && minValue !== 0) {
    let filterArr = users.filter(function (user) {
      if (maxValue >= user.Salary && minValue <= user.Salary) {
        return user;
      }
    });
    tBody.innerHTML = "";
    filterArr.forEach(function (item) {
      addTable(item);
      editData();
    });
    filterArr.splice(0, filterArr.length);
  } else {
    resetSalaryFilter();
  }
}

positionFilter();

function positionFilter() {


  filterSelect.addEventListener("change", function () {
    let filterOptions = filterSelect.options[filterSelect.selectedIndex];
    let optionValue = filterOptions.value;
    positionCheck = optionValue;

    if (optionValue === "Tester") {
      let testerArr = users.filter(function (user) {
        return user.Position == "Tester";
      });
      tBody.innerHTML = "";
      testerArr.forEach(function (user) {
        addTable(user);
      });

    
    } else if (optionValue === "Content Manager") {
      let contentArr = users.filter(function (user) {
        return user.Position == "Content Manager";
      });
      tBody.innerHTML = "";
      contentArr.forEach(function (user) {
        addTable(user);
      });

    } else if (optionValue === "Full-stack developer") {
      let developerArr = users.filter(function (user) {
        return user.Position == "Full-stack developer";
      });
      tBody.innerHTML = "";
      developerArr.forEach(function (user) {
        addTable(user);
      });
    } else if (optionValue === "Ofisiant") {
      let ofisiantArr = users.filter(function (user) {
        return user.Position == "Ofisiant";
      });
      tBody.innerHTML = "";
      ofisiantArr.forEach(function (user) {
        addTable(user);
      });
    } else {
      resetFilter();
    }
  });
}


function editData() {
  users = userLocal
  let allTd = document.querySelectorAll("td");
  allTd.forEach(function (data) {
    data.addEventListener("dblclick", function () {
      if (data.classList.contains("name")) {
        let parent = Number(data.parentNode.id);
        data.innerHTML =
          '<input type = "text" placeholder = "Write Name" value="'+data.textContent+'" class = input-name>   <button class = "edit-name">Edit</button>';
        let inputName = document.querySelector(".input-name");
        let editName = document.querySelector(".edit-name");
        editName.addEventListener("click", function () {
          data.innerText = inputName.value;

          let indexName = users.findIndex(function (user) {
            return user.Id === parent;
          });
          users[indexName].Name = inputName.value;
          localStorage.setItem("array",JSON.stringify(users))
        });
        
      }
      if (data.classList.contains("surname")) {
        let parent = Number(data.parentNode.id);
        data.innerHTML =
          '<input type = "text" placeholder = "Write SurName" value="'+data.textContent+'" class = input-surname>  <button class = "edit-surname">Edit</button>';
        let inputSurname = document.querySelector(".input-surname");
        let editSurname = document.querySelector(".edit-surname");
        editSurname.addEventListener("click", function () {
          data.innerText = inputSurname.value;

          let indexSurname = users.findIndex(function (user) {
            return user.Id === parent;
          });
          users[indexSurname].Surname = inputSurname.value;
          localStorage.setItem("array",JSON.stringify(users))

        });
      }
      if (data.classList.contains("salary")) {
        let parent = Number(data.parentNode.id);
        data.innerHTML =
          '<input type = "number" placeholder = "Write Salary" value="'+data.textContent+'" class = input-salary>  <button class = "edit-salary">Edit</button>';
        let inputSalary = document.querySelector(".input-salary");
        let editSalary = document.querySelector(".edit-salary");
        editSalary.addEventListener("click", function () {
          data.innerText = inputSalary.value;

          let indexSalary = users.findIndex(function (user) {
            return user.Id === parent;
          });
          users[indexSalary].Salary = inputSalary.value;
          localStorage.setItem("array",JSON.stringify(users))
        });
      }
    });
  });
}