/***************************************************
 *   BY: Al
 *   ON: 07-MAY-2019
 * FILE: main.js
 * NOTE: Core scripts & helpers...
 ***************************************************/

/***************************************
 * Setup the environment...
 ***************************************/
 const LF = "\n";
 var createTask;

/**************************************
 * Check if document is 'ready'...
 **************************************/
$(document).ready(function(){
  console.log('Application ready...');
});

/**************************************
 * Create a task...
 **************************************/
$(document).ready(function(){
  createTask = function(strData='', intDays=0)
  {
    if (strData != '' && intDays > 0)
    {
      var alertClass;
      if (intDays < 3)
      {
        alertClass = 'danger'; // Red
      } else if (intDays < 7) {
        alertClass = 'warning'; // Orange <or> yellow
      } else {
        alertClass = 'secondary'; // Grey
      }

      var new_task_markup = '<div class="alert alert-'+ alertClass +' alert-dismissible fade show" role="alert">'+LF;
      new_task_markup += strData + '<br /> ' + intDays + ' day(s).'+LF;
      new_task_markup += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+LF;
      new_task_markup += '<span aria-hidden="true">&times;</span>'+LF;
      new_task_markup += '</button>'+LF;
      new_task_markup += '</div>'+LF;
      $('#tasks').append(new_task_markup);
      $('#task_name').val('');
      $('#task_days').val('');
    }
    return;
  };
});

/**************************************
 * jQuery Validation - Add New Task...
 **************************************/
$(document).ready(function(){
  $('#frmToDo').validate({
    rules: {
      task_name: 'required',
      task_days: {
        required: true,
        min: 1
      }
    },
    messages: {
      task_name: "The task name cannot be blank.",
      task_days: {
        required: "Please enter a number.",
        min: "Enter a value greater than zero."
      }
    }
  });
});

/**************************************
 * EVENT: Add New Task...
 **************************************/
$(document).ready(function(){
  $('#btnAddTask').on('click', function(){
    if ($('#frmToDo').valid())
    {
      var strTaskName = $('#task_name').val();
      var intTaskDays = $('#task_days').val();
      createTask(strTaskName, intTaskDays);
    }
  });
});

/**************************************
 * Initialze helper functions...
 **************************************/
$(document).ready(function(){
  
  // Smooth scrolling...
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(){
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname)
    {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length)
      {
        $('html, body').animate({
          scrollTop: (target.offset().top - 56)
        }, 1000, 'easeInOutExpo');
        return false;
      }
    }
  });

  // Close responsive menu...
  $('.js-scroll-trigger').click(function(){
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy...
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });
});