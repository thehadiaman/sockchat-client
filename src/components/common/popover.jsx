import React from "react";
import { Overlay, Popover } from 'react-bootstrap';

export default function Pop({title, open, target, closeDropDownMenu, content, width}) {
    return (
        <Overlay
            show={open}
            target={target}
            placement="bottom"
            containerPadding={20}
            rootClose={true}
            onHide={closeDropDownMenu}
            rootCloseEvent={'click'}
            arrowProps={{style: {backgroundColor: '#000000'}}}
        >
            <Popover style={{borderRadius: '0', width: width||"100%"}}>
                {title&&<Popover.Header as={"h6"} className={"popover-title"}>{title}</Popover.Header>}
                {content}
            </Popover>
        </Overlay>
    );
}