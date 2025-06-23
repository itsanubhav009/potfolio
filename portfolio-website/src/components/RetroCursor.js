import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const cursorAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const clickAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const CursorDot = styled.div`
  position: fixed;
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.colors.teal};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
  animation: ${cursorAnimation} 2s infinite;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.teal};

  &.hover {
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.pink};
    mix-blend-mode: difference;
  }
`;

const CursorRing = styled.div`
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid ${({ theme }) => theme.colors.purple};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: all 0.15s ease-out;
  box-shadow: 0 0 10px rgba(223, 66, 249, 0.4);

  &.hover {
    width: 36px;
    height: 36px;
    border-color: ${({ theme }) => theme.colors.teal};
  }

  &.click {
    animation: ${clickAnimation} 0.5s forwards;
  }
`;

const RetroCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.body.addEventListener('mouseleave', onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input, [role="button"], [class*="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    const setupObserver = () => {
      // Set up a mutation observer to track DOM changes
      // This ensures our cursor works with dynamically added elements
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.addedNodes.length) {
            handleLinkHoverEvents();
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return observer;
    };

    const observer = setupObserver();

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <CursorDot
        className={linkHovered ? 'hover' : ''}
        style={{ 
          left: position.x, 
          top: position.y,
          opacity: hidden ? 0 : 1
        }}
      />
      <CursorRing
        className={`${linkHovered ? 'hover' : ''} ${clicked ? 'click' : ''}`}
        style={{ 
          left: position.x, 
          top: position.y,
          opacity: hidden ? 0 : 1
        }}
      />
    </>
  );
};

export default RetroCursor;
