// Get all the move icons
var moveIcons = document.querySelectorAll('.move-icon');

// Variables to store the dragged card, the placeholder card and the initial mouse position
var draggedCard = null;
var placeholderCard = null;
var initialMousePos = { x: 0, y: 0 };

// Add event listeners for each move icon
for (var i = 0; i < moveIcons.length; i++) {
  var moveIcon = moveIcons[i];

  // When the mouse button is pressed, store the dragged card and the initial mouse position
  moveIcon.addEventListener('mousedown', function(e) {
    draggedCard = this.parentNode.parentNode; // The card is the grandparent of the move icon
    initialMousePos = { x: e.clientX - draggedCard.offsetLeft, y: e.clientY - draggedCard.offsetTop };

    // Create a placeholder card and set its size to match the dragged card
    placeholderCard = document.createElement('div');
    placeholderCard.style.width = `${draggedCard.offsetWidth}px`;
    placeholderCard.style.height = `${draggedCard.offsetHeight}px`;
    placeholderCard.style.visibility = 'hidden'; // Make the placeholder card invisible

    // Replace the dragged card with the placeholder card
    draggedCard.parentNode.insertBefore(placeholderCard, draggedCard);

    draggedCard.style.position = 'absolute';
    draggedCard.style.zIndex = '1000';
  });
}

// When the mouse button is released, reset the dragged card
document.addEventListener('mouseup', function(e) {
  if (draggedCard) {
    draggedCard.style.zIndex = '';
    draggedCard = null;
    // Do not remove the placeholder card
    placeholderCard = null;
  }
});

// Update the position of the dragged card to follow the cursor
document.addEventListener('mousemove', function(e) {
  if (draggedCard) {
    draggedCard.style.left = e.clientX - initialMousePos.x + 'px';
    draggedCard.style.top = e.clientY - initialMousePos.y + 'px';
  }
});