const dailyHubViewTasksbtn = document.getElementById('dailyHubViewTasksBtn');
dailyHubViewTasksbtn.addEventListener('click', (event) => {
    fetch_tasks_main();
});

const colors = ['rgba(236, 190, 180, 0.6)', 'rgba(255, 255, 255, 0.6)', 'rgba(148, 163, 249, 0.6)', 'rgba(9, 188, 138, 0.6)'];

function fetch_tasks_main() {
    const allActiveTaskParentDiv = document.getElementById('activeTasksParent');
    const isAllTasksPresent = allActiveTaskParentDiv.getAttribute('data-attribute');
    if (isAllTasksPresent == "noTasks") {
        allActiveTaskParentDiv.innerHTML = "";
        let action = "fetch_all_active_tasks"
        let ajax = new GlobalAjax();
        ajax.performRequest(action, null)
            .then(data => {
                for (const task of data) {
                    let taskChild = document.createElement('div');
                    taskChild.classList.add('allActiveTasksChild');

                    let selectedColor = getRandomColorIndex();
                    taskChild.style.backgroundColor = colors[selectedColor];

                    let taskName = document.createElement('div');
                    taskName.classList.add('allActiveTasksName');
                    taskName.textContent = `Task: ${task.task_name}`;
                    taskName.setAttribute('task-id', task.task_id);
                    taskChild.appendChild(taskName);

                    let taskDueDate = document.createElement('div');
                    taskDueDate.classList.add('allActiveTasksDue');
                    taskDueDate.textContent = `Due: ${task.due_date ? task.due_date : "set due"}`;
                    taskChild.appendChild(taskDueDate);

                    let taskDesc = document.createElement('div');
                    taskDesc.classList.add('allActiveTasksDesc');
                    taskDesc.textContent = `Description: ${task.description ? task.description : "no description"}`;
                    taskChild.appendChild(taskDesc);

                    allActiveTaskParentDiv.appendChild(taskChild);

                    allActiveTaskParentDiv.setAttribute('data-attribute', 'tasksPresent');
                }
            })
            .catch(error => {
                console.error('Error fetching active tasks:', error);
            })
    }
    else allActiveTaskParentDiv.setAttribute('data-attribute', 'tasksPresent');
};

function getRandomColorIndex() {
    return Math.floor(Math.random() * 4);
}

// Edit Task Modal
const parent = document.getElementById('activeTasksParent');
const task_edit_modal = document.getElementById('task_edit_modal');
parent.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('allActiveTasksChild')) {
        let targetted_task = clickedElement.children[0];
        let task_name = targetted_task.textContent;
        let task_id = targetted_task.getAttribute('task-id');
        const task_name_div = document.getElementById('task_name');
        task_edit_modal.style.display = 'flex';
        task_name_div.textContent = task_name;
        task_name_div.setAttribute('task_id', task_id);
    }
});
const task_edit_close_btn = document.getElementById('close_task_edit_modal_btn');
task_edit_close_btn.onclick = () => {
    task_edit_modal.style.display = 'none';
};

// Submit task update
const task_edit_submit_btn = document.getElementById('submit_task_edit_modal_btn');
task_edit_submit_btn.onclick = () => {
    const task_name = document.querySelector('#task_name').textContent;
    const task_id = document.querySelector('#task_name').getAttribute('task_id');
    const task_desc = document.getElementById('task_desc').value;
    const task_due_date = document.getElementById('task_due').value;
    if (task_desc == "" || task_due_date == "") {
        return task_edit_modal.style.display = 'none';
    }
    let data = { task_name, task_desc, task_due_date, task_id };
    let action = "update_tasks"
    let ajax = new GlobalAjax();
    ajax.performRequest(action, data)
        .then(response => {
            const allActiveTaskParentDiv = document.getElementById('activeTasksParent');
            allActiveTaskParentDiv.setAttribute('data-attribute', 'noTasks');
            task_edit_modal.style.display = 'none';
            fetch_tasks_main();
        })
        .catch(error => {
            console.error('Error updating task:', error);
        })
};

const delete_task_btn = document.getElementById('task_edit_modal_del_btn');
delete_task_btn.onclick=()=>{
    const task_id = document.querySelector('#task_name').getAttribute('task_id');
    let action = "delete_task";
    let ajax = new GlobalAjax();
    ajax.performRequest(action, task_id)
        .then(response => {
            const allActiveTaskParentDiv = document.getElementById('activeTasksParent');
            allActiveTaskParentDiv.setAttribute('data-attribute', 'noTasks');
            task_edit_modal.style.display = 'none';
            fetch_tasks_main();
        })
        .catch(error => {
            console.error('Error updating task:', error);
        })
};
