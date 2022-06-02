var submitButton=document.getElementById('btn');
submitButton.addEventListener('click',addExpense);
function addExpense(e){
    e.preventDefault();
    
    let expenses=document.getElementById('expense').value;
    let description=document.getElementById('description').value;
    let category=document.getElementById('category').value;
    
    //let test=JSON.parse(localStorage.getItem(`${document.getElementById('email').value}`));
    //console.log('test',test)
    let expeneseDetails={
        "id":Math.floor(Math.random() * 100),
        "expense":expenses,
        "description":description,
        "category":category
    }
    localStorage.setItem(`${expeneseDetails.id}`,JSON.stringify(expeneseDetails));
    
    showOnScreen(expeneseDetails);

    //clear input field..
    document.getElementById('expense').value='';
    document.getElementById('description').value='';
    //document.getElementById('category').value='';
    
}
function showOnScreen(expense){
    var expenseList=document.getElementById('expenses');

    let li=document.createElement('li');
    li.id=`${expense.id}`
    li.appendChild(document.createTextNode(`${expense.expense} ${expense.description} ${expense.category}`));

    let dltBtn=document.createElement('button');
    dltBtn.appendChild(document.createTextNode('X'));
    li.appendChild(dltBtn);

    let editBtn=document.createElement('button');
    editBtn.appendChild(document.createTextNode('edit'))
    li.appendChild(editBtn);

    expenseList.appendChild(li);
    

}

window.addEventListener('DOMContentLoaded',()=>{
    let localStorageObj=localStorage;
    let localStorageObjKeys=Object.keys(localStorageObj)
    console.log(typeof localStorageObjKeys);
    for(i=0;i<localStorageObjKeys.length;i++){
        let key=localStorageObjKeys[i];
        let userDetails=JSON.parse(localStorage.getItem(key));
        showOnScreen(userDetails);


    }
});
    
let expneseDetails=document.getElementById('expenses');
//console.log("expenseDeetails",expneseDetails);
expneseDetails.addEventListener('click',deleteEdit);

function deleteEdit(e){
    e.preventDefault();
    if(e.target.tagName==='BUTTON'){
        let button=e.target;
        let li=button.parentNode;
        if(button.textContent==="X"){
            li.remove();
            let key=li.id;
            localStorage.removeItem(key)
            
        }else if(button.textContent==="edit"){
            //console.log(li.textContent);
            //let expense=li.textContent.split(" ")
            //console.log(expense);
            //document.getElementById('expense').value=expense[0];
            //document.getElementById('description').value=expense[1];
            //document.getElementById('category').value=expense[2];
            console.log(li.id)
            let expense=JSON.parse(localStorage.getItem(li.id))
            document.getElementById('expense').value=expense.expense;
            document.getElementById('description').value=expense.description;
            document.getElementById('category').value=expense.category;
            
            if(localStorage.getItem(li.id)){
                removeFromScreen(li.id);
                localStorage.removeItem(li.id);
                
            }
        }
        
    }
    
    
}

function removeFromScreen(key){
    //let ul=document.getElementById('users');

    let nodeToBeDelted=document.getElementById(key);
    console.log("nodeToBeDelted",nodeToBeDelted);
    if(nodeToBeDelted){
        //ul.removeChild(nodeToBeDelted);
        nodeToBeDelted.remove();
    }
}
