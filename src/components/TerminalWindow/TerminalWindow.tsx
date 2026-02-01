import { useState, useRef, useEffect } from 'react';
import styles from './TerminalWindow.module.scss';
import Terminal from '../../pages/Terminal/Terminal';
import { Close, Minimize, CropFree, FilterNone } from '@mui/icons-material';
import basePath from '../../utils/basePath';

export interface TerminalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

function TerminalWindow({ isOpen, onClose }: TerminalWindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      } else if (isResizing) {
        const newWidth = Math.max(400, e.clientX - position.x);
        const newHeight = Math.max(300, e.clientY - position.y);
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, position]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    // Don't drag if clicking on buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    
    if (titleBarRef.current?.contains(target)) {
      setIsDragging(true);
      if (windowRef.current) {
        setDragStart({
          x: e.clientX - windowRef.current.offsetLeft,
          y: e.clientY - windowRef.current.offsetTop,
        });
      }
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      setSize({ width: 800, height: 500 });
      setPosition({ x: 100, y: 100 });
    } else {
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
  };

  const handleMinimize = () => {
    // For now, just close. Could implement minimize to taskbar later
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={styles.terminalWindow}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <div
        ref={titleBarRef}
        className={styles.titleBar}
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className={styles.titleBarLeft}>
          <img src={`${basePath}/icons/terminal.png`} alt="Terminal" className={styles.titleIcon} />
          <span className={styles.title}>Terminal</span>
        </div>
        <div className={styles.titleBarButtons}>
          <button className={styles.titleBarButton} onClick={handleMinimize} title="Minimize">
            <Minimize fontSize="small" />
          </button>
          <button className={styles.titleBarButton} onClick={handleMaximize} title={isMaximized ? "Restore" : "Maximize"}>
            {isMaximized ? <FilterNone fontSize="small" /> : <CropFree fontSize="small" />}
          </button>
          <button className={styles.titleBarButton} onClick={onClose} title="Close">
            <Close fontSize="small" />
          </button>
        </div>
      </div>
      <div className={styles.windowContent}>
        <Terminal />
      </div>
      {!isMaximized && (
        <div
          className={styles.resizeHandle}
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

export default TerminalWindow;
