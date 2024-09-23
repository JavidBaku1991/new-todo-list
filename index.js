$(document).ready(function(){
  var currentFilter = 'all'; 

  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1314',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();
        response.tasks.forEach(function (task) {
          if (currentFilter === 'all' || 
              (currentFilter === 'active' && !task.completed) || 
              (currentFilter === 'complete' && task.completed)) {
            $('#todo-list').append('<div class="row task "><p class="col-xs-8 task-content">' + task.content + '</p><div class="right"><button class="delete MuiButton-root MuiButton-contained" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '> </div></div>');
          }
        });
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  };
  
  $('#show-all').on('click', function() {
    currentFilter = 'all';
    getAndDisplayAllTasks();
  });
  
  $('#show-active').on('click', function() {
    currentFilter = 'active';
    getAndDisplayAllTasks();
  });
  
  $('#show-complete').on('click', function() {
    currentFilter = 'complete';
    getAndDisplayAllTasks();
  });
  
  
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1314',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }
  
  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  var deleteTask = function (id) {
    $.ajax({
   type: 'DELETE',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1314',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  $.ajax({
    type: 'PUT',
     url: 'https://fewd-todolist-api.onrender.com/tasks/4/mark_complete?api_key=1314',
     dataType: 'json',
     success: function (response, textStatus) {
       console.log(response);
     },
     error: function (request, textStatus, errorMessage) {
       console.log(errorMessage);
     }
   });

   var markTaskComplete = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1314',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1314',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
       markTaskComplete($(this).data('id'));
     }
   });
   $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
       markTaskComplete($(this).data('id'));
     } else {
       markTaskActive($(this).data('id'));
     }
   });

  
  getAndDisplayAllTasks();

  
  
});