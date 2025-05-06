
let btn = document.querySelector(".mybtn")
let input = document.querySelector(".myinput")
let span = document.querySelector(".myspan")
let mytasks = document.querySelector(".mytasks")
let loadsp = document.querySelector(".loader-container")



 let Task = []
 if(localStorage.getItem("Tasks") !== null){
    Task = JSON.parse(localStorage.getItem("Tasks"))
 }
 displayTask();


 btn.addEventListener("click", (e) => {
    e.preventDefault(); 

    let value = { ip: input.value
        ,
        completed:false
    }

    if(value.ip !== ""){
        Task.push(value);
        input.value = ""
        span.classList.add("d-none")
        localStorage.setItem("Tasks" , JSON.stringify(Task));
        loadsp.classList.remove("d-none")
        setTimeout(() => {
            loadsp.classList.add("d-none");
        }, 500);
        toastr.success('To Do List', 'a Task has been added succesfully')
            
        displayTask()
      


    }
    else{
        console.log('please enter')
        toastr.error(' Enter a task !', 'Error!')
    }


})
 function displayTask(){
    let cartona = ""
    for(let i = 0 ; i < Task.length ; i++){
        cartona += `
      <li class="d-flex align-items-center justify-content-between border-bottom border-1 border-black mb-3 pb-2">
      ${Task[i].completed ? `  <span class="title position-relative completed" > ${Task[i].ip} </span>` :
      `  <span class="title position-relative " onclick="complete(${i})" > ${Task[i].ip} </span>`}
  
    <div class="icons">
        ${Task[i].completed ? 
            `<i class="fa-solid fa-check me-3 check"></i>` : 
            ``
        }
        <i class="fa-solid fa-trash trash" onclick="deletes(${i})"></i>
    </div>
</li>`
    }
    mytasks.innerHTML = cartona
    changeprogress();


}


function complete(i){
    Task[i].completed = true ;
    loadsp.classList.remove("d-none")
    setTimeout(() => {
        loadsp.classList.add("d-none");
    }, 500);
   toastr.success('To Do List', 'A Task has been completed')       

        
    displayTask();

}


function deletes(i){
   Task.splice(i , 1)
   localStorage.setItem("Tasks" , JSON.stringify(Task));
   loadsp.classList.remove("d-none")
   setTimeout(() => {
       loadsp.classList.add("d-none");
   }, 500);
   toastr.success('To Do List', 'A Task has been deleted')       
   displayTask()


}
function changeprogress(){
    let completeTask = Task.filter(task => task.completed);
    let totalTask = Task.length;

    let percentage = (completeTask.length / totalTask) * 100;
let number = document.querySelectorAll(".number span");
number[0].innerHTML = completeTask.length
number[1].innerHTML =totalTask



    document.getElementById("progress").style.width = `${percentage}%`;
}

