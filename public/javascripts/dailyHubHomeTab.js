// This script contains add task btn code, checks task input hover state 
// and submit task functionality 

//Task hover state and add task button
const add_task_div = document.getElementById('app-mainTab__addTask');
const add_task_btn = document.getElementById('app-mainTab__addTask_btnn');
const task_input_div = document.getElementById('addTask_input');
const submit_task_btn = document.getElementById('submit_task_btn');

add_task_div.addEventListener('mouseleave', () => {
    task_input_div.style.display = 'none';
    add_task_btn.style.display = 'flex';
});
add_task_btn.onclick = () => {
    add_task_btn.style.display = 'none';
    task_input_div.style.display = 'flex';
};

submit_task_btn.onclick = (event) => {
    event.preventDefault();
    const task_name = document.getElementById('input_task_name').value;
    const task_name_field = document.getElementById('input_task_name');

    if (task_name) {
        submit_task_btn.textContent = 'Loading...';
        let action = 'submit_task';
        let data_to_send = { task_name };

        //create ajax object
        let ajax = new GlobalAjax();
        ajax.performRequest(action, data_to_send)
            .then(response => {
                task_name_field.value = "";
                submit_task_btn.textContent = '✔ Task Added';
                setTimeout(() => {
                    submit_task_btn.textContent = 'Add Task';
                }, 2000);
                const allActiveTaskParentDiv = document.getElementById('activeTasksParent');
                allActiveTaskParentDiv.setAttribute('data-attribute','noTasks');
            })
            .catch(error => {
                console.error('Error submiting the task:', error);
            })
    }
    else {
        task_name_field.style.borderBottom = "2px solid red";
    };
}