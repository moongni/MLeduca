import React from "react";
import ReactModal from "react-modal";

export const Modal = ({children, style, ...props}) => {

    return (
        <ReactModal
            isOpen={props.isShow}
            contentLabel={props.label}
            style={{
                overlay: {
                },
                content: {
                    position: "fixed",
                    left:"50%",
                    top:"50%",
                    transform:'translateX(-50%) translateY(-50%)',
                    color: 'black'
                }
            }}>
            {children}
        </ReactModal>
    )
}
