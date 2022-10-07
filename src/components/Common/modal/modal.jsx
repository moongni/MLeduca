import React from "react";
import ReactModal from "react-modal";

export const Modal = ({children, style, ...props}) => {

    return (
        <ReactModal
            isOpen={props.isShow}
            contentLabel={props.label}
            style={{
                ...style,
                overlay: {
                },
                content: {
                    position: "fixed",
                    top:"50%",
                    left:"50%",
                    minWidth:"500px",
                    minHeight:"430px",
                    overflow:"auto",
                    transform:'translate(-50%, -50%)',
                    color: 'black'
                }
            }}>
            {children}
        </ReactModal>
    )
}
