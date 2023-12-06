const dailyHubCompletedTasksBtn = document.getElementById('dailyHubCompletedTasksBtn');
dailyHubCompletedTasksBtn.addEventListener('click', (event) => {
    fetchCompletedTasksClient();
});


function fetchCompletedTasksClient() {
    let ajax = new GlobalAjax();
    let action = "completed_tasks";
    ajax.performRequest(action, null)
        .then(data => {
            $('#completedTasks_Table').DataTable({
                data: data,
                columns: [
                  { title: "Task Name", data: "task_name" },
                  { title: "Due Date", data: "due_date" },
                  { title: "Description", data: "description" },
                ]
              });
        })
        .catch(error => {
            console.error('Error fetching completed tasks:', error);
        })
}