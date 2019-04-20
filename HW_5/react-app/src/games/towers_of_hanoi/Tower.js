import React, { Component } from 'react'
import { DragSource } from "react-dnd";

const itemSource = {
    beginDrag(props) {
        return props.item;
    },
    endDrag(props, monitor, component) {
        /*if(!monitor.didDrop()) {
            return;
        }
        return props.handleDrop(props.item.item);*/
    }
}

class Tower extends Component {

    render() {
        const {isDragging, connectDragSource, item } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            <div className="tower" style={{opacity}}>
                {item.item.rings}
            </div>
        )
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

// export default Tower;
export default DragSource('item', itemSource, collect)(Tower)