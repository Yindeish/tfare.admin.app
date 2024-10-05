'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalInstance {
    content: ReactNode;
    id: number;
    showCloseButton: boolean;
}

interface ModalContextType {
    modals: ModalInstance[];
    showModal: (content: ReactNode, showCloseButton?: boolean) => void;
    hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalInstance[]>([]);
    let modalId = 0;

    const showModal = (content: ReactNode, showCloseButton = true) => {
        setModals((prev) => [
            ...prev,
            { content, id: modalId++, showCloseButton },
        ]);
    };

    const hideModal = () => {
        setModals((prev) => prev.slice(0, -1)); // Remove the last modal
    };

    return (
        <ModalContext.Provider value={{ modals, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
