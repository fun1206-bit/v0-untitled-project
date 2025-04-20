// 菜谱类型定义
interface Recipe {
  id: number
  name: string
  type: "meat" | "vegetable" | "soup"
  ingredients: string[]
  steps: string[]
}
