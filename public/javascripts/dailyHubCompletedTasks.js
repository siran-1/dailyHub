let completedtaskstable;
const dailyHubCompletedTasksBtn = document.getElementById('dailyHubCompletedTasksBtn');
dailyHubCompletedTasksBtn.addEventListener('click', (event) => {
    let checkfortasks =  $("#completedTasks_Table").attr('isDataTablesPresent');
    if(checkfortasks =="No"){
        fetchCompletedTasksClient();
    }
});

function fetchCompletedTasksClient() {
    completedtaskstable = $('#completedTasks_Table').DataTable({
        ajax: {
            url: '/dailyHub',
            type: 'POST',
            data:{action:'completed_tasks'},
            dataSrc: '',
            error: function (error) {
                console.error('Error fetching completed tasks:', error);
            }
        },
        columns: [
            { title: "Task Name", data: "task_name" },
            { title: "Due Date", data: "due_date" },
            { title: "Description", data: "description" }
        ],
        initComplete: function () {
            $("#completedTasks_Table").attr('isDataTablesPresent', "Yes");
        }
    });
}
