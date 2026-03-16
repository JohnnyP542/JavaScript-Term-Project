// jQuery Document
$(document).ready(function ($) {

  function updateCount() { // Create function to update counter
    var items = $('li').length; // Number of items in list
    $('#counter').text(items); // Added into counter circle
  }
	
  updateCount();
	
  $('#directions').hide();
	
  $('form').submit(function () {
    if ($('.input').val() !== '') {
      $('#directions').show();
      var newTask = $('.input').val();
      var newLi = $('<li>' + newTask + '</li>');
      newLi.on('click', function () {
        $(this).remove(); // Attach the event handler *before* adding the element
        updateCount();  // Update the counter because an item was removed
      });
      $('ul').prepend(newLi); // To put the new task at the top of the list
      updateCount();  // Update the counter because an item was added
      $('.input').val('');
      return false; // So the change persists
    }
  });
  $('ul').sortable(); // Allow movement of items in the list
});
