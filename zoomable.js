document.addEventListener('DOMContentLoaded', () => {

  const zoomableElement = document.querySelector('.zoomable');
  const containerElement = document.querySelector('.scrollable');

  let scale = 1;

  let mouseHasMoved = true;
  let mousePositionRelative;
  let elementUnderMouse;

  zoomableElement.addEventListener('mousemove', () => {
    mouseHasMoved = true
  });

  zoomableElement.addEventListener('wheel', (wheelEvent) => {
    if (isVerticalScrolling(wheelEvent)) {
      wheelEvent.preventDefault();

      scale = computeScale(scale, wheelEvent.deltaY);
      zoomableElement.style.width = scale * 100 + '%';

      if (mouseHasMoved) {
        elementUnderMouse = findElementUnderMouse(wheelEvent.clientX);
        mousePositionRelative = (wheelEvent.clientX - getLeft(elementUnderMouse)) / getWidth(elementUnderMouse);
        mouseHasMoved = false;
      }

      const mousePosition = wheelEvent.clientX;
      const elementUnderMouseLeft = getLeft(elementUnderMouse);
      const zoomableLeft = getLeft(zoomableElement);
      const containerLeft = getLeft(containerElement);
      const moveAfterZoom = getWidth(elementUnderMouse) * mousePositionRelative;

      containerElement.scrollLeft = Math.round(elementUnderMouseLeft - zoomableLeft - mousePosition + containerLeft + moveAfterZoom);
    }
  });

  const isVerticalScrolling = (wheelEvent) => {
    const deltaX = Math.abs(wheelEvent.deltaX)
    const deltaY = Math.abs(wheelEvent.deltaY)
    return deltaY > deltaX;
  }

  const computeScale = (currentScale, wheelDelta) => {
    const newScale = currentScale - wheelDelta * 0.005;
    return Math.max(1, newScale);
  }

  const findElementUnderMouse = (mousePosition) => {
    const children = zoomableElement.children;

    for (const childElement of children) {
      const childRect = childElement.getBoundingClientRect();

      if (childRect.left <= mousePosition && childRect.right >= mousePosition) {
        return childElement;
      }
    }

    return zoomableElement;
  }

  const getLeft = (element) => element.getBoundingClientRect().left;
  const getWidth = (element) => element.getBoundingClientRect().width;
});
