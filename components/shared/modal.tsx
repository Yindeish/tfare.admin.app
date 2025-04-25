import { useModal } from '@/context.state/shared/modal';
import { HTMLAttributes, ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ containerClassName, closeBtnClassName, closeBtn, style = {}, containerStyle = {} }:
    { containerClassName?: string, closeBtnClassName?: string, closeBtn?: ReactNode, style?: HTMLAttributes<HTMLDivElement>['style'], containerStyle?: HTMLAttributes<HTMLDivElement>['style'] }) => {
    const { modals, hideModal, } = useModal();

    return (
        <>
            {modals.map((modal, index) => (
                <div
                    key={modal.id}
                    onClick={hideModal}
                    className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 cursor-pointer`}
                    style={{ zIndex: 50 + index, ...style }}
                >
                    <div onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                    }} className={`bg-white shadow-lg w-[90%] p-3 relative ${containerClassName ? containerClassName : ''}`} style={containerStyle}>
                        {modal.showCloseButton && (
                            <button
                                className={`absolute top-2 right-2 text-gray-500 hover:text-gray-800 ${closeBtnClassName ? closeBtnClassName : ''}`}
                                onClick={hideModal}
                            >
                                {closeBtn ? closeBtn : <FaTimes className='w-full h-full' />}
                            </button>
                        )}
                        {modal.content}
                    </div>
                </div>
            ))}
        </>
    );
};

export default Modal;
