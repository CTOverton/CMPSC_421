import React from 'react'
import { DragSource, DragPreviewImage } from 'react-dnd'
import ItemTypes from './ItemTypes'
const knightStyle = {
    fontSize: 40,
    fontWeight: 'bold',
    cursor: 'move',
}
const Knight = ({ connectDragSource, connectDragPreview, isDragging }) => {
    return (
        <>
            <DragPreviewImage connect={connectDragPreview} src="https://cdn3.iconfinder.com/data/icons/business-vol-15/100/Artboard_19-512.png" />
            <div
                ref={connectDragSource}
                style={Object.assign({}, knightStyle, {
                    opacity: isDragging ? 0.5 : 1,
                })}
            >
                ♘
            </div>
        </>
    )
}
export default DragSource(
    ItemTypes.KNIGHT,
    {
        beginDrag: () => ({}),
    },
    (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }),
)(Knight)
