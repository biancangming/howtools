import { typeOf } from "../utils/type"
import { deepClone } from "./clone";
export interface TreeNodeProps {
    id: string;
    parentId: string;
    children: string;
}

export class TreeNode<T = any> {
    // 用户传入的data数据
    private _data = []
    data: Node[] = []
    props: TreeNodeProps
    constructor(data, props?: TreeNodeProps) {
        if (!data) return
        this._data = data
        this.props = props || { id: "id", parentId: "parentId", children: "children" } as unknown as TreeNodeProps
    }

    // 初始化treeNode节点
    private treeEach(data: any, fn, level = 0) {
        if (typeOf(data) == 'Array') {
            for (const [index, item] of data.entries()) {
                fn(item, data, index, level)
                if (item[this.props.children]) {
                    this.treeEach(item[this.props.children], fn, ++level)
                }
            }
        } else if (typeOf(data) == 'Object') {
            fn(data, null, 0, level)

            if (data[this.props.children]) {
                this.treeEach(data[this.props.children], fn, ++level)
            }
        }
    }

    remove(id) {
        let removeFlag = false
        this.treeEach(this._data, (item, data, index, level) => {
            if (data == null && level != 0) {
                return
            }
            if (item[this.props.id] == id) {
                data.splice(index, 1)
                removeFlag = true
            }
        })
        return removeFlag
    }

    add(parentId, insertData) {
        let insertFlag = false
        this.treeEach(this._data, (item, data, index, level) => {
            if (item[this.props.id] == parentId) {
                if(!item[this.props.children]) {
                    item[this.props.children] = []
                }

                if(!insertData[this.props.children]){
                    insertData[this.props.children] = []
                }

                item[this.props.children].push(insertData)
                insertFlag = true
            }
        })
        return insertFlag
    }

    /**
     * 移动节点
     * @param id 需要移动的节点id
     * @param parentId 目标父节点id
     * @returns 移动成功返回true，失败返回false
    */
    move(id, parentId) {
        let moveFlag = false
        let moveData = undefined
        this.treeEach(this._data, (item, data, index, level) => {
            if (data == null && level != 0) {
                moveFlag = false
                return
            }

            moveData = deepClone(item)
            if (item[this.props.id] == id) {
                data.splice(index, 1)
            }
        })

        if(moveData && this.add(parentId, moveData)) {
            moveFlag = true
        }
        return moveFlag
    }
}