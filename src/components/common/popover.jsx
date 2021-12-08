import React from "react";
import { Overlay, Popover } from 'react-bootstrap';

export default function Pop({title, open, target, closeDropDownMenu, content, width, height, scroll}) {
    return (
        <Overlay
            show={open}
            target={target}
            placement="bottom"
            containerPadding={20}
            rootClose={true}
            onHide={closeDropDownMenu}
            rootCloseEvent={'mousedown'}
            arrowProps={{style: {backgroundColor: '#000000'}}}
        >
            <Popover style={{borderRadius: '0'}}>
                {title&&<Popover.Header as={"h6"} className={"popover-title"}>{title}</Popover.Header>}
                <div onClick={closeDropDownMenu} style={{overflow: scroll||'hidden', height: height||"max-contend", width: width||"max-contend", overflowX: 'hidden'}}>
                    {content}
                </div>
            </Popover>
        </Overlay>
    );
}