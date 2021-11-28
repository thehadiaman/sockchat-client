import React from "react";
import "./loadPage.scss";

export default function LoadePage() {
    document.title = "Loading...";
    return (
        <div className="wrapper">
            <div className="loader-outer">
                <div className="loader-inner">
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
            </div>
            <div className={'loading-text'}><span>LOADING</span></div>
        </div>
    );
};