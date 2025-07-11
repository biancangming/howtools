import { TreeNode } from "./treeNode"
import { deepClone } from "../data/clone"
const treeData = {
  "id": 1,
  "parentId": 0,
  "name": "Root Node",
  "children": [
    {
      "id": 2,
      "parentId": 1,
      "name": "System Management",
      "children": [
        {
          "id": 4,
          "parentId": 2,
          "name": "User Settings",
          "children": []
        },
        {
          "id": 5,
          "parentId": 2,
          "name": "Permission Control",
          "children": [
            {
              "id": 8,
              "parentId": 5,
              "name": "Role Assignment",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "parentId": 1,
      "name": "Product Management",
      "children": [
        {
          "id": 6,
          "parentId": 3,
          "name": "Category Setup",
          "children": []
        },
        {
          "id": 7,
          "parentId": 3,
          "name": "Inventory Tracking",
          "children": []
        }
      ]
    }
  ]
}




// --------删除测试-------------
// 删除id为7的选项
const dcData = deepClone(treeData)
const tn = new TreeNode<{id: string}>(dcData)
tn.remove(2)
console.log(JSON.stringify(dcData))
const item = { id: 12345, parentId: 2, name: '12345' }

console.log(tn.add(7, item), JSON.stringify(dcData))
