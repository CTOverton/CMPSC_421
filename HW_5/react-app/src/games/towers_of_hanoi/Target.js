import React, { Component } from 'react'
import { DropTarget } from "react-dnd";

class Target extends Component {
    render(props) {
        const { connectDropTarget, hovered, item } = this.props;
        const background = hovered ? 'lightgreen' : 'white'

        return connectDropTarget(
            <div className="target" style={{background}}>
                {this.props.children}
            </div>
        )
    }
}

const spec = {
    drop(props, monitor, component) {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return
        }

        // Obtain the dragged item
        const item = monitor.getItem();

        return props.handleDrop(item.item.id, parseInt(props.children.key))
    }

}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}

export default DropTarget('item', spec, collect)(Target)