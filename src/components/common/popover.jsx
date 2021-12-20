import React from "react";
import { Overlay, Popover } from 'react-bootstrap';

export default function Pop({title, open, target, closeDropDownMenu, content, width, height, css}) {
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
            <Popover style={{borderRadius: '0', width: width||"max-content"}}>
                {title&&<Popover.Header as={"h6"} className={"popover-title"}>{title}</Popover.Header>}
                <div onClick={closeDropDownMenu} style={{overflow: 'scroll', overflowX: 'hidden', height: height||'100%'}} className={css||''}>
                    {content}
                </div>
            </Popover>
        </Overlay>
    );
}