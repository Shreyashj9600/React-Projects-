import React, { useState } from "react";
import data from "./data";
import "./style.css";

function Accordion() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelecton, setEnableMultiSelecton] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handelSingelSelecton = (getCurrentId) => {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    };

    const handelMultiSelecton = (getCurrentId) => {
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

        if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
        else cpyMultiple.splice(findIndexOfCurrentId, 1);

        setMultiple(cpyMultiple);
    };

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelecton(!enableMultiSelecton)}>
                Enable multi selection
            </button>
            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item" key={dataItem.id}>
                            <div
                                onClick={
                                    enableMultiSelecton
                                        ? () => handelMultiSelecton(dataItem.id)
                                        : () => handelSingelSelecton(dataItem.id)
                                }
                                className="title"
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {enableMultiSelecton
                                ? multiple.indexOf(dataItem.id) !== -1 && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                                : selected === dataItem.id && (
                                    <div className="content">{dataItem.answer}</div>
                                )}
                        </div>
                    ))
                ) : (
                    <div>data not found</div>
                )}
            </div>
        </div>
    );
}

export default Accordion;
