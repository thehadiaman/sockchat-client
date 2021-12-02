import React from "react";
import { Overlay, Popover } from 'react-bootstrap';

export default function Pop({title, open, target, closeDropDownMenu}) {
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
            <Popover id="popover-contained" >
                <Popover.Header as="h3" style={{backgroundColor: '#dddddd'}}>{title}</Popover.Header>
                <Popover.Body>
                    <li>ONE</li>
                    <li>TWO</li>
                    <li>THREE</li>
                    <li>FOUR</li>
                    <li>FIVE</li>
                </Popover.Body>
            </Popover>
        </Overlay>
    );
}