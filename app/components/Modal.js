import { useEffect } from "react";
import InputField from "./ui/InputField";

const Modal = (props) => {
    const { isOpen, onClose, title, width, height, className, children, borderRadius } = props;
    
    const handleClose = () => {
        console.log('close')
        onClose(false);
    };

    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={className ? `modal ${className}` : 'modal'}>
            <div className="modal-overlay" onClick={handleClose}></div>
            <div className="modal-content" style={{ width: width ? width : 600, height: height ? height : 400, borderRadius: borderRadius ? borderRadius : 12}}>
                <button
                    type="button"
                    onClick={handleClose}
                    className="
                        modal-close
                        absolute
                        right-6
                        top-5
                        h-8
                        w-8
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[18px]
                        shadow
                        hover:bg-white
                        z-10
                    "
                >
                    ✕
                </button>
                {title && <div className="modal-title">{title}</div> }
                { children }
            </div>
        </div>
    );
};
export default Modal;
