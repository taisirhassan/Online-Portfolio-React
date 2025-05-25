// Accessibility utilities for keyboard navigation and screen readers

export const handleKeyboardNavigation = (event, callback) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

export const announceToScreenReader = (message) => {
  let announcement = null;
  let timeoutId = null;

  try {
    // Create and configure the announcement element
    announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    // Add a unique identifier for tracking
    announcement.setAttribute('data-announcement-id', Date.now().toString());
    
    // Safely append to DOM
    if (document.body) {
      document.body.appendChild(announcement);
    } else {
      console.warn('Document body not available for screen reader announcement');
      return;
    }

    // Cleanup function with error handling
    const cleanup = () => {
      try {
        // Check if element still exists and has a parent
        if (announcement && announcement.parentNode) {
          announcement.parentNode.removeChild(announcement);
        }
      } catch (error) {
        console.error('Failed to remove screen reader announcement element:', error);
      } finally {
        // Clear references to prevent memory leaks
        announcement = null;
        timeoutId = null;
      }
    };

    // Set timeout with increased duration for better screen reader support
    timeoutId = setTimeout(cleanup, 2000);

  } catch (error) {
    console.error('Failed to create screen reader announcement:', error);
    
    // Cleanup in case of error
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (announcement && announcement.parentNode) {
      try {
        announcement.parentNode.removeChild(announcement);
      } catch (cleanupError) {
        console.error('Failed to cleanup announcement element after error:', cleanupError);
      }
    }
  }
};

export const trapFocus = (element) => {
  // Validate element parameter
  if (!element || !(element instanceof Element)) {
    console.error('trapFocus: Invalid element provided. Expected a DOM element.');
    return () => {}; // Return a no-op cleanup function
  }

  // Comprehensive focusable elements selector following focus-trap standards
  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
    '[contenteditable=""]',
    'summary',
    'details[open] summary',
    'audio[controls]',
    'video[controls]',
    'object',
    'embed',
    'area[href]',
    'iframe'
  ].join(', ');

  // Function to get currently focusable elements (dynamic detection)
  const getFocusableElements = () => {
    try {
      const elements = element.querySelectorAll(focusableSelector);
      // Filter out elements that are not actually focusable
      return Array.from(elements).filter(el => {
        // Check if element is visible and not hidden
        if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) {
          return false;
        }
        
        // Check computed styles for visibility
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }
        
        // Check if element is actually focusable
        const tabIndex = el.getAttribute('tabindex');
        if (tabIndex && parseInt(tabIndex) < 0) {
          return false;
        }
        
        return true;
      });
    } catch (error) {
      console.error('Error getting focusable elements:', error);
      return [];
    }
  };

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    try {
      // Get current focusable elements dynamically
      const focusableElements = getFocusableElements();
      
      if (focusableElements.length === 0) {
        // No focusable elements, prevent tabbing
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      // Check if the currently focused element is within our trap
      const isWithinTrap = element.contains(activeElement);
      
      if (!isWithinTrap) {
        // Focus escaped the trap, bring it back
        e.preventDefault();
        firstElement.focus();
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab (backwards)
        if (activeElement === firstElement || !focusableElements.includes(activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (forwards)
        if (activeElement === lastElement || !focusableElements.includes(activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    } catch (error) {
      console.error('Error in focus trap tab handler:', error);
      e.preventDefault(); // Prevent default to maintain trap even if there's an error
    }
  };

  try {
    element.addEventListener('keydown', handleTabKey);
    
    // Set initial focus if no element within the trap is focused
    const initialFocusableElements = getFocusableElements();
    if (initialFocusableElements.length > 0 && !element.contains(document.activeElement)) {
      initialFocusableElements[0].focus();
    }
  } catch (error) {
    console.error('Error setting up focus trap:', error);
  }
  
  // Return cleanup function with error handling
  return () => {
    try {
      element.removeEventListener('keydown', handleTabKey);
    } catch (error) {
      console.error('Error cleaning up focus trap:', error);
    }
  };
};

// Reduce motion for users who prefer it
export const respectsReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}; 