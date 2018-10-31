export interface INode {
    id: number;
    name: string;
    ip_adress: string;
    web_port: number;
    type_id: number;
    children: Array<INode>;
    count_child: number;
    node_id: number | null;
    node_type: INodeType;
    description: string;
}

export interface INodeType {
    id: number;
    name: string;
    is_endpoint: boolean;
}