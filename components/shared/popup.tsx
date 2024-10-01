import React, { FC, useEffect, useRef } from 'react';

type PopupProps = {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    baseContainerClassName?: string;
    innerContainerClassName?: string;
};

const Popup: FC<PopupProps> = ({ isVisible, onClose, children, baseContainerClassName, innerContainerClassName }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    return (
        <div className="relative">
            {isVisible && (
                <div
                    ref={popupRef}
                    className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        } ${baseContainerClassName ? baseContainerClassName : ''}`}
                >
                    <div
                        className={`p-4 ${innerContainerClassName ? innerContainerClassName : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;
