import React, {useEffect, useRef, useState} from "react"
import {Draggable, Droppable} from "react-beautiful-dnd"
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ClearIcon from "@material-ui/icons/Clear";
import * as client from "../client";
import "../styles/Column.css"
import Card from "./Card"

function Column(props) {
    const [show, setShow] = useState(true);
    const [cardTitle, setCardTitle] = useState("")
    const textInput = useRef(null);

    const addCard = async () => {
        if(cardTitle === "") return
        client.createCard(cardTitle, props.column.id).then(props.setCardSubmitting)
        setCardTitle("")
    }

    useEffect(() => {
        textInput.current?.focus()
    })

    return (
        <Draggable draggableId={props.column?.id} index={props.index}>
            {(provided) => (
                <div className="column-container" ref={provided.innerRef} {...provided.draggableProps}>
                    <div className="card-contents">
                        <div {...provided.dragHandleProps} className="cardTitle">
                            <div className="title">{props.column?.title}</div>
                            <MoreHorizIcon fontSize="small"/>
                        </div>
                        <Droppable droppableId={props.column?.id} type="card">
                            {(provided, snapshot) => (
                                <div className="cardList"
                                     ref={provided.innerRef}
                                     {...provided.droppableProps}
                                >
                                    {props.cards?.map((card, index) => <Card
                                        key={card?.id} card={card} index={index}
                                        setDeleting={props.setDeleting}
                                        setEditSubmitting={props.setEditSubmitting}
                                        setMarkAsDone={props.setMarkAsDone}
                                        fetchCards={props.fetchCards}
                                        fetchColumns={props.fetchColumns}
                                        columnId={props.column.id}/>)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {show ?
                            <div className="button-frame" onClick={() => setShow(false)}>
                                <AddOutlinedIcon/>
                                <p>Add a card</p>
                            </div>
                            :
                            <div className="text-area-container">
                                <textarea
                                    autoFocus
                                    dir="auto"
                                    value={cardTitle}
                                    ref={textInput}
                                    onChange={event => setCardTitle(event.target.value)}
                                    className="list-card-composer-textarea js-card-title"
                                    placeholder="Enter a title for this card…">
                                </textarea>
                                <div className="addCardSection">
                                    <button onClick={addCard}>Add card</button>
                                    <ClearIcon
                                        onClick={()=> {
                                            setShow(true)
                                            setCardTitle("")
                                        }}
                                        className="clear-icon"
                                        fontSize="large"/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Column