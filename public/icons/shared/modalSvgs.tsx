interface ISVG {
    className: string,
    onClick?: () => void
}

const EditBtn = ({ className, onClick }: ISVG) => (
    <svg className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>

);

const CloseBtn = ({ className, onClick }: ISVG) => (
    <svg className={className} onClick={onClick} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.39844 6.3999L13.5984 13.5999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.5984 6.3999L6.39844 13.5999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Topup = ({ className, onClick }: ISVG) => (
    <svg className={className} onClick={onClick} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4993 6.6665V13.3332M13.8327 9.99984H7.16602" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.4993 18.3332C15.1017 18.3332 18.8327 14.6022 18.8327 9.99984C18.8327 5.39746 15.1017 1.6665 10.4993 1.6665C5.89698 1.6665 2.16602 5.39746 2.16602 9.99984C2.16602 14.6022 5.89698 18.3332 10.4993 18.3332Z" stroke="white" strokeWidth="1.5" />
    </svg>

);

const Deduct = ({ className, onClick }: ISVG) => (
    <svg className={className} onClick={onClick} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99609 10.0747H13.6661" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10.5013 18.3332C15.1037 18.3332 18.8346 14.6022 18.8346 9.99984C18.8346 5.39746 15.1037 1.6665 10.5013 1.6665C5.89893 1.6665 2.16797 5.39746 2.16797 9.99984C2.16797 14.6022 5.89893 18.3332 10.5013 18.3332Z" stroke="white" strokeWidth="1.5" />
    </svg>

);



export {
    EditBtn, CloseBtn,
    Topup, Deduct,
};