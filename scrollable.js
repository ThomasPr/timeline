document.addEventListener('DOMContentLoaded', () => {

  let mouseDown = false;

  let initialGrabPosition = 0;
  let initialScrollPosition = 0;

  const scrollableElement = document.querySelector('.scrollable');

  scrollableElement.addEventListener('mousedown', (mouseEvent) => {
    mouseDown = true;
    scrollableElement.style.cursor = 'grabbing';
    initialGrabPosition = mouseEvent.clientX;
    initialScrollPosition = scrollableElement.scrollLeft;
  });

  scrollableElement.addEventListener('mouseup', () => {
    mouseDown = false;
    scrollableElement.style.cursor = 'grab';
  });

  scrollableElement.addEventListener('mousemove', (mouseEvent) => {
    if (mouseDown) {
      const mouseMovementDistance = mouseEvent.clientX - initialGrabPosition;
      scrollableElement.scrollLeft = initialScrollPosition - mouseMovementDistance;
    }
  });
});
