// -----------------hidden children-------------------------------------
export function updateStateAfterHiddenChildren(nodes, id) {
    let newNodes = nodes.map((node) => {
        if ((node.id === id) && (node.children && node.children.length > 0)) {
            return updateTreeStateAfterHidden(node);
        }
        else if(node.children && node.children.length > 0) {
            let children = updateStateAfterHiddenChildren(node.children, id);
            return updateTreeState(node, children);
        }
        return node;
    });
    return newNodes;
}

function updateTreeStateAfterHidden(node) {
    let target = {...node};
    delete target.children;
    return target; 
}
// -----------------show child-------------------------------------
export function updateState(oldNodes, data, id) {
    let newNodes = oldNodes.map((node) => {
        if (node.id === id) return updateTreeState(node, data);
        if(node.children && node.children.length > 0) {
            let children = updateState(node.children, data, id);
            return updateTreeState(node, children);
        }
        return node;
    });
    return newNodes;
}

function updateTreeState(node, data) {
    node = {...node, children: data, count_child: data.length};
    return node;
}
// -----------------insert-------------------------------------
export function updateStateAfterInsert(nodes, newNode) {
    let stop = false;
    let inner = (nodes, newNode) => {
        
        for (let node of nodes) {
            if(!newNode.node_id){
                nodes.push(newNode);
                return true;
            }
            else if (newNode.node_id === node.id) {
                if (node.count_child === 0)
                    node.children = [];
                node.children.push(newNode);
                node.count_child++;
                return true;       
            }
            else if (node.children && node.children.length > 0) {
                stop = inner(node.children, newNode);
            }
            
            if(stop) return stop;
        }
        
        return
    };
    inner(nodes, newNode);
}
// -----------------update-------------------------------------
export function updateStateAfterChange(nodes, newNode) {
    let stop = false;
    let inner = (nodes, newNode) => {
        
        for (let node of nodes) {
            if (newNode.id === node.id) {
                nodes.splice(nodes.indexOf(node), 1, newNode);
                return true;       
            }
            else if (node.children && node.children.length > 0) {
                stop = inner(node.children, newNode);
            }
            
            if(stop) return stop;
        }
        
        return
    };
    inner(nodes, newNode);
}
// -----------------delete-------------------------------------
export function updateStateAfterDelete(nodes, newNode) {
    let stop = {
        delete: false,
        lowChild: false
    }
    let inner = (nodes, newNode) => {
        
        for (let node of nodes) {
            if (newNode.id === node.id) {
                nodes.splice(nodes.indexOf(node), 1);
                stop.delete = true;
                return stop;       
            }
            else if (node.children && node.children.length > 0) {
                stop = inner(node.children, newNode);
                if (stop.delete && !stop.lowChild) {
                    node.count_child--;
                    stop.lowChild = true;
                    return stop;
                }
            }
            if(stop.delete && stop.lowChild) return stop;
        }
        
        return stop;
    };
    inner(nodes, newNode);
}
// -----------------target-------------------------------------
export function targetElem(menuNodes, id) { 
    for (let elem of menuNodes) {
        if ((elem.id === id) && (elem.children && elem.children.length > 0)) {
            return elem;    
        }
        if (elem.children && elem.children.length > 0) {
            let tmp = targetElem(elem.children, id);
            if(tmp)
            return tmp;
        }     
    }
}
