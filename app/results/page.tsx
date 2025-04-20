"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronRight, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// 定义菜品类型
interface Recipe {
  id: number
  name: string
  type: string
  ingredients: string[]
  steps: string[]
}

export default function FoodResults() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const searchParams = useSearchParams()

  // 获取URL参数
  const diners = searchParams.get("diners") || "1"
  const mealType = searchParams.get("mealType") || "lunch"

  // 模拟推荐的菜品数据
  const [recommendedDishes, setRecommendedDishes] = useState<Recipe[]>([
    {
      id: 1,
      name: "红烧排骨",
      type: "meat",
      ingredients: ["排骨500g", "生姜", "大蒜", "酱油", "料酒", "白糖", "八角", "桂皮"],
      steps: [
        "排骨洗净，焯水去血水",
        "锅中放油，爆香姜蒜",
        "放入排骨翻炒至变色",
        "加入调料和适量清水",
        "大火烧开后转小火慢炖40分钟",
        "收汁即可出锅",
      ],
    },
    {
      id: 2,
      name: "清炒西兰花",
      type: "vegetable",
      ingredients: ["西兰花300g", "大蒜", "盐", "食用油"],
      steps: [
        "西兰花洗净，切小朵",
        "锅中水烧开，加少许盐和油",
        "西兰花焯水30秒后捞出",
        "锅中热油，爆香蒜末",
        "放入西兰花翻炒均匀",
        "加盐调味即可出锅",
      ],
    },
    {
      id: 3,
      name: "番茄蛋花汤",
      type: "soup",
      ingredients: ["番茄2个", "鸡蛋2个", "葱花", "盐", "白胡椒粉", "香油"],
      steps: [
        "番茄洗净，切块",
        "锅中放油，爆香番茄",
        "加入适量清水煮开",
        "打散鸡蛋，倒入锅中搅拌成蛋花",
        "加入调味料",
        "撒上葱花，滴几滴香油即可",
      ],
    },
    {
      id: 4,
      name: "糖醋里脊",
      type: "meat",
      ingredients: ["里脊肉300g", "鸡蛋1个", "淀粉", "番茄酱", "白糖", "醋", "盐"],
      steps: [
        "里脊肉切条，用蛋液和淀粉腌制10分钟",
        "锅中油烧至七成热，放入肉条炸至金黄",
        "另起锅，放少许油，倒入番茄酱炒出红油",
        "加入白糖、醋和少量水调成糖醋汁",
        "汁微微浓稠时，倒入炸好的里脊肉",
        "快速翻炒均匀即可出锅",
      ],
    },
    {
      id: 5,
      name: "蒜蓉空心菜",
      type: "vegetable",
      ingredients: ["空心菜300g", "大蒜", "红辣椒", "盐", "食用油"],
      steps: [
        "空心菜洗净，切段",
        "大蒜切末，红辣椒切圈",
        "锅中热油，爆香蒜末和辣椒",
        "放入空心菜快速翻炒",
        "加盐调味，炒至空心菜变软",
        "出锅前大火收汁",
      ],
    },
    {
      id: 6,
      name: "紫菜蛋汤",
      type: "soup",
      ingredients: ["紫菜10g", "鸡蛋2个", "葱花", "盐", "鸡精", "香油"],
      steps: [
        "紫菜泡水备用",
        "锅中水烧开",
        "打散鸡蛋，倒入锅中搅拌成蛋花",
        "放入泡好的紫菜",
        "加入调味料",
        "撒上葱花，滴几滴香油即可",
      ],
    },
  ])

  // 根据用餐类型筛选菜品
  useEffect(() => {
    // 在实际应用中，这里可以根据mealType和diners调用API获取推荐
    // 这里简单模拟一下，根据用餐类型筛选显示的菜品数量
    let filteredDishes = [...recommendedDishes]

    // 根据用餐人数调整显示的菜品数量
    const dishCount = Number.parseInt(diners) + 2
    filteredDishes = filteredDishes.slice(0, Math.min(dishCount, filteredDishes.length))

    // 根据用餐类型调整菜品顺序
    if (mealType === "breakfast") {
      filteredDishes.sort((a, b) => (a.type === "soup" ? -1 : 1))
    } else if (mealType === "lunch") {
      filteredDishes.sort((a, b) => (a.type === "meat" ? -1 : 1))
    } else if (mealType === "dinner") {
      // 晚餐保持均衡
      filteredDishes = filteredDishes.sort(() => Math.random() - 0.5)
    }

    setRecommendedDishes(filteredDishes)
  }, [diners, mealType])

  // 换一批菜品
  const refreshDishes = () => {
    // 在实际应用中，这里可以调用API获取新的推荐
    // 这里简单模拟一下，将现有菜品顺序打乱
    setRecommendedDishes([...recommendedDishes].sort(() => Math.random() - 0.5))
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-amber-50 px-4 py-6 relative overflow-hidden">
      {/* Background Decorations - 与主页保持一致的背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-200 opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-orange-200 opacity-40"></div>
        <div className="absolute top-1/3 right-5 w-12 h-12 rounded-full bg-red-200 opacity-30"></div>
        <div className="absolute bottom-40 left-5 w-20 h-20 rounded-full bg-yellow-100 opacity-50"></div>
      </div>

      {/* 返回按钮 */}
      <div className="self-start mb-4 relative z-10">
        <Link href="/">
          <Button variant="ghost" className="rounded-full p-2 hover:bg-orange-100 text-orange-700">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      {/* 页面标题 */}
      <div className="mb-6 flex flex-col items-center relative z-10">
        <div className="relative">
          <h1
            className="text-center font-bold text-3xl text-orange-700 drop-shadow-md"
            style={{
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              textShadow: "2px 2px 0px rgba(255, 166, 0, 0.3)",
            }}
          >
            推荐菜品
          </h1>
          <div className="absolute -right-10 -top-6 rotate-12">
            <CartoonFoodIcon type="noodles" className="h-10 w-10 text-orange-500" />
          </div>
          <div className="absolute -left-10 -top-4 -rotate-12">
            <CartoonFoodIcon type="burger" className="h-9 w-9 text-orange-600" />
          </div>
        </div>
        <p
          className="mt-1 text-center text-sm text-orange-600"
          style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
        >
          为您精心挑选的美食
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
          <span className="text-xs text-orange-700">
            {Number.parseInt(diners)}人用餐 ·
            {mealType === "breakfast" ? "早餐" : mealType === "lunch" ? "午餐" : "晚餐"}
          </span>
        </div>
      </div>

      {/* 菜品卡片区域 */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 mb-8 relative z-10">
        {recommendedDishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl border-3 border-orange-300 p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
            style={{
              borderWidth: "3px",
              borderStyle: "solid",
              boxShadow: "3px 5px 0px rgba(234, 88, 12, 0.2)",
            }}
          >
            <div className="mb-2">
              <FoodTypeIcon type={dish.type} className="h-20 w-20" />
            </div>
            <h3
              className="text-center font-bold text-orange-700 mb-2"
              style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
            >
              {dish.name}
            </h3>
            <Button
              variant="outline"
              className="mt-auto w-full rounded-xl border-2 border-orange-300 text-orange-600 hover:bg-orange-100 hover:text-orange-700 flex items-center justify-center gap-1"
              onClick={() => setSelectedRecipe(dish)}
            >
              <span>查看做法</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* 换一批按钮 */}
      <div className="relative z-10">
        <Button
          className="relative rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl transform rotate-1"
          style={{
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            boxShadow: "3px 6px 0px rgba(194, 65, 12, 0.4)",
          }}
          onClick={refreshDishes}
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          <span className="relative z-10">换一批</span>
        </Button>
      </div>

      {/* 装饰元素 */}
      <div className="absolute bottom-4 left-4 rotate-12 opacity-60">
        <CartoonFoodIcon type="pot" className="h-16 w-16 text-orange-400" />
      </div>
      <div className="absolute right-6 top-20 -rotate-12 opacity-60">
        <CartoonFoodIcon type="plate" className="h-14 w-14 text-orange-400" />
      </div>
      <div className="absolute left-10 top-1/2 rotate-6 opacity-40">
        <CartoonFoodIcon type="carrot" className="h-10 w-10 text-orange-500" />
      </div>
      <div className="absolute right-8 bottom-20 -rotate-6 opacity-40">
        <CartoonFoodIcon type="tomato" className="h-12 w-12 text-red-500" />
      </div>

      {/* 菜谱详情弹窗 */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-3xl border-4 border-orange-300 p-5 max-w-md w-full max-h-[80vh] overflow-y-auto relative"
            style={{
              borderStyle: "solid",
              boxShadow: "4px 8px 0px rgba(234, 88, 12, 0.2)",
            }}
          >
            <Button
              variant="ghost"
              className="absolute right-2 top-2 text-orange-700 hover:bg-orange-100 rounded-full p-1"
              onClick={() => setSelectedRecipe(null)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex items-center mb-4">
              <FoodTypeIcon type={selectedRecipe.type} className="h-16 w-16 mr-3" />
              <h2
                className="text-xl font-bold text-orange-700"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                {selectedRecipe.name}
              </h2>
            </div>

            <div className="mb-4">
              <h3
                className="text-lg font-bold text-orange-600 mb-2"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                所需食材
              </h3>
              <ul className="bg-orange-50 rounded-xl p-3 border-2 border-orange-200">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="mb-1 last:mb-0 flex items-center">
                    <span className="h-2 w-2 rounded-full bg-orange-400 mr-2"></span>
                    <span className="text-orange-800">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-lg font-bold text-orange-600 mb-2"
                style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
              >
                制作步骤
              </h3>
              <ol className="bg-orange-50 rounded-xl p-3 border-2 border-orange-200">
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index} className="mb-2 last:mb-0 pl-7 relative">
                    <span className="absolute left-0 top-0 flex items-center justify-center h-5 w-5 rounded-full bg-orange-400 text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-orange-800">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 修改FoodTypeIcon函数，调整SVG viewBox和图标元素的位置和大小，使图标在卡片中显得更大
function FoodTypeIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "meat":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* 肉类图标 - 放大内部元素 */}
          <circle cx="50" cy="50" r="45" fill="#FFCCBC" stroke="#E64A19" strokeWidth="3" />
          <path
            d="M25,35 C32,28 68,28 75,35 C82,42 82,58 75,65 C68,72 32,72 25,65 C18,58 18,42 25,35 Z"
            fill="#FF8A65"
            stroke="#E64A19"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M35,40 C42,48 58,48 65,40" fill="none" stroke="#E64A19" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M35,50 C42,58 58,58 65,50" fill="none" stroke="#E64A19" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M35,60 C42,68 58,68 65,60" fill="none" stroke="#E64A19" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    case "vegetable":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* 蔬菜图标 - 放大内部元素 */}
          <circle cx="50" cy="50" r="45" fill="#C8E6C9" stroke="#388E3C" strokeWidth="3" />
          <path
            d="M50,15 C65,15 80,30 80,45 C80,60 65,65 50,65 C35,65 20,60 20,45 C20,30 35,15 50,15 Z"
            fill="#81C784"
            stroke="#388E3C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50,65 C42,75 35,82 50,85 C65,82 58,75 50,65 Z"
            fill="#81C784"
            stroke="#388E3C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M35,35 C42,42 58,42 65,35" fill="none" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M35,50 C42,57 58,57 65,50" fill="none" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    case "soup":
      return (
        <svg viewBox="0 0 100 100" className={className}>
          {/* 汤类图标 - 放大内部元素 */}
          <circle cx="50" cy="50" r="45" fill="#BBDEFB" stroke="#1565C0" strokeWidth="3" />
          <path
            d="M20,40 C20,32 35,25 50,25 C65,25 80,32 80,40 L80,65 C80,73 65,80 50,80 C35,80 20,73 20,65 Z"
            fill="#90CAF9"
            stroke="#1565C0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="50" cy="40" rx="30" ry="8" fill="#64B5F6" />
          <path
            d="M30,55 C37,62 43,55 50,62 C57,55 63,62 70,55"
            fill="none"
            stroke="#1565C0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M30,25 C30,20 25,15 30,10 C35,15 30,20 30,25"
            fill="none"
            stroke="#90CAF9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50,20 C50,15 45,10 50,5 C55,10 50,15 50,20"
            fill="none"
            stroke="#90CAF9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70,25 C70,20 65,15 70,10 C75,15 70,20 70,25"
            fill="none"
            stroke="#90CAF9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return null
  }
}

// 从主页复用的卡通食物图标组件
function CartoonFoodIcon({
  type,
  className,
  style,
}: {
  type: "breakfast" | "lunch" | "dinner" | "burger" | "noodles" | "chef" | "pot" | "plate" | "carrot" | "tomato"
  className?: string
  style?: React.CSSProperties
}) {
  switch (type) {
    case "breakfast":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Background plate */}
          <ellipse
            cx="50"
            cy="70"
            rx="40"
            ry="15"
            fill="#F5F5F5"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: "1, 0.2" }}
          />

          {/* Sunny side up egg */}
          <ellipse
            cx="50"
            cy="55"
            rx="25"
            ry="20"
            fill="#FFFDE7"
            stroke="#FFA000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="55" r="10" fill="#FFC107" stroke="#FF9800" strokeWidth="1.5" />

          {/* Toast */}
          <rect
            x="15"
            y="40"
            width="20"
            height="25"
            rx="3"
            fill="#FFECB3"
            stroke="#FFA000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="20" y1="50" x2="30" y2="50" stroke="#FFA000" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="55" x2="30" y2="55" stroke="#FFA000" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bacon */}
          <path
            d="M75,45 C80,43 85,45 85,50 C85,55 80,57 75,55 C70,57 65,55 65,50 C65,45 70,43 75,45Z"
            fill="#FF5252"
            stroke="#D32F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: "1, 0.2" }}
          />
          <path
            d="M75,50 C80,48 85,50 85,55 C85,60 80,62 75,60 C70,62 65,60 65,55 C65,50 70,48 75,50Z"
            fill="#FF8A80"
            stroke="#D32F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ strokeDasharray: "1, 0.2" }}
          />

          {/* Coffee cup */}
          <path
            d="M20,80 L30,80 L28,95 L22,95 Z"
            fill="#BBDEFB"
            stroke="#0D47A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30,80 L32,75 C32,75 35,75 35,78 C35,80 33,80 33,80"
            fill="none"
            stroke="#0D47A1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22,75 C22,75 20,70 25,70 C30,70 28,75 28,75"
            fill="none"
            stroke="#90CAF9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "lunch":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Bento box */}
          <rect
            x="15"
            y="25"
            width="70"
            height="50"
            rx="5"
            fill="#FFECB3"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dividers */}
          <line
            x1="15"
            y1="50"
            x2="85"
            y2="50"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="75"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rice */}
          <ellipse
            cx="32.5"
            cy="37.5"
            rx="12.5"
            ry="7.5"
            fill="#FFFFFF"
            stroke="#BDBDBD"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="35" r="1" fill="#BDBDBD" />
          <circle cx="35" cy="37" r="1" fill="#BDBDBD" />
          <circle cx="32" cy="40" r="1" fill="#BDBDBD" />

          {/* Meat */}
          <path
            d="M60,35 C60,30 75,30 75,35 C75,40 60,40 60,35Z"
            fill="#EF5350"
            stroke="#D32F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M65,35 C65,32 70,32 70,35"
            fill="none"
            stroke="#D32F2F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vegetables */}
          <ellipse
            cx="32.5"
            cy="62.5"
            rx="12.5"
            ry="7.5"
            fill="#66BB6A"
            stroke="#388E3C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25,60 C30,65 35,60 40,65"
            fill="none"
            stroke="#388E3C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fruit/Dessert */}
          <ellipse
            cx="67.5"
            cy="62.5"
            rx="12.5"
            ry="7.5"
            fill="#FFEE58"
            stroke="#FDD835"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M60,62.5 C65,57.5 70,67.5 75,62.5"
            fill="none"
            stroke="#FDD835"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Chopsticks */}
          <line x1="90" y1="20" x2="75" y2="35" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
          <line x1="95" y1="25" x2="80" y2="40" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case "dinner":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Hot pot */}
          <ellipse
            cx="50"
            cy="75"
            rx="35"
            ry="10"
            fill="#FFECB3"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15,50 C15,40 25,30 50,30 C75,30 85,40 85,50 L85,75 C85,75 70,85 50,85 C30,85 15,75 15,75 Z"
            fill="#FFECB3"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pot handles */}
          <path
            d="M15,50 C10,50 5,45 5,40 C5,35 10,30 15,30"
            fill="none"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M85,50 C90,50 95,45 95,40 C95,35 90,30 85,30"
            fill="none"
            stroke="#FF9800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Soup */}
          <ellipse
            cx="50"
            cy="50"
            rx="30"
            ry="15"
            fill="#FFF9C4"
            stroke="#EF6C00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Food items */}
          <circle cx="35" cy="45" r="7" fill="#EF5350" stroke="#D32F2F" strokeWidth="2" />
          <circle cx="50" cy="55" r="7" fill="#66BB6A" stroke="#388E3C" strokeWidth="2" />
          <circle cx="65" cy="45" r="7" fill="#FFEE58" stroke="#FDD835" strokeWidth="2" />
          <path
            d="M30,60 C35,55 40,60 45,55 C50,60 55,55 60,60 C65,55 70,60 75,55 C80,60 85,55 85,60"
            fill="none"
            stroke="#D32F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Steam */}
          <path
            d="M30,25 C30,20 25,15 30,10 C35,15 30,20 30,25"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50,20 C50,15 45,10 50,5 C55,10 50,15 50,20"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70,25 C70,20 65,15 70,10 C75,15 70,20 70,25"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "burger":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Burger bun top */}
          <path
            d="M20,40 C20,25 35,20 50,20 C65,20 80,25 80,40 L80,45 L20,45 Z"
            fill="#FFCC80"
            stroke="#EF6C00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Burger patty */}
          <rect
            x="20"
            y="45"
            width="60"
            height="15"
            rx="5"
            fill="#795548"
            stroke="#5D4037"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cheese */}
          <rect
            x="15"
            y="60"
            width="70"
            height="8"
            rx="2"
            fill="#FFC107"
            stroke="#FFA000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lettuce */}
          <path
            d="M15,68 C20,65 25,70 30,65 C35,70 40,65 45,70 C50,65 55,70 60,65 C65,70 70,65 75,70 C80,65 85,70 85,68 L85,72 L15,72 Z"
            fill="#66BB6A"
            stroke="#388E3C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tomato */}
          <rect
            x="20"
            y="72"
            width="60"
            height="8"
            rx="2"
            fill="#EF5350"
            stroke="#D32F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Burger bun bottom */}
          <path
            d="M20,80 L80,80 L80,85 C80,90 65,95 50,95 C35,95 20,90 20,85 Z"
            fill="#FFCC80"
            stroke="#EF6C00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sesame seeds */}
          <circle cx="35" cy="30" r="2" fill="#FFFFFF" stroke="#EF6C00" strokeWidth="1" />
          <circle cx="50" cy="25" r="2" fill="#FFFFFF" stroke="#EF6C00" strokeWidth="1" />
          <circle cx="65" cy="30" r="2" fill="#FFFFFF" stroke="#EF6C00" strokeWidth="1" />
        </svg>
      )
    case "noodles":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Bowl */}
          <ellipse
            cx="50"
            cy="75"
            rx="35"
            ry="10"
            fill="#EEEEEE"
            stroke="#BDBDBD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15,50 C15,40 25,30 50,30 C75,30 85,40 85,50 L85,75 C85,75 70,85 50,85 C30,85 15,75 15,75 Z"
            fill="#EEEEEE"
            stroke="#BDBDBD"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Noodles */}
          <path
            d="M20,45 C25,55 30,45 35,55 C40,45 45,55 50,45"
            fill="none"
            stroke="#FFF9C4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30,40 C35,50 40,40 45,50 C50,40 55,50 60,40"
            fill="none"
            stroke="#FFF9C4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40,45 C45,55 50,45 55,55 C60,45 65,55 70,45"
            fill="none"
            stroke="#FFF9C4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50,40 C55,50 60,40 65,50 C70,40 75,50 80,40"
            fill="none"
            stroke="#FFF9C4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Toppings */}
          <circle cx="35" cy="40" r="5" fill="#EF5350" stroke="#D32F2F" strokeWidth="2" />
          <circle cx="65" cy="40" r="5" fill="#66BB6A" stroke="#388E3C" strokeWidth="2" />
          <ellipse
            cx="50"
            cy="60"
            rx="10"
            ry="5"
            fill="#795548"
            stroke="#5D4037"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Chopsticks */}
          <line x1="80" y1="15" x2="65" y2="40" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
          <line x1="90" y1="15" x2="75" y2="40" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />

          {/* Steam */}
          <path
            d="M30,25 C30,20 25,15 30,10 C35,15 30,20 30,25"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50,20 C50,15 45,10 50,5 C55,10 50,15 50,20"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70,25 C70,20 65,15 70,10 C75,15 70,20 70,25"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "chef":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Chef hat */}
          <path
            d="M25,40 C25,20 40,10 50,10 C60,10 75,20 75,40 L75,50 L25,50 Z"
            fill="#FFFFFF"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25,40 C25,35 30,30 35,30 C40,30 45,35 45,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55,40 C55,35 60,30 65,30 C70,30 75,35 75,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Chef body */}
          <rect
            x="35"
            y="50"
            width="30"
            height="40"
            rx="5"
            fill="#FFFFFF"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Chef face */}
          <circle cx="42" cy="65" r="3" fill="black" />
          <circle cx="58" cy="65" r="3" fill="black" />
          <path d="M45,75 C48,80 52,80 55,75" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />

          {/* Chef buttons */}
          <circle cx="50" cy="60" r="2" fill="black" />
          <circle cx="50" cy="70" r="2" fill="black" />
          <circle cx="50" cy="80" r="2" fill="black" />
        </svg>
      )
    case "pot":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Pot body */}
          <path
            d="M20,40 L80,40 L80,80 C80,85 70,90 50,90 C30,90 20,85 20,80 Z"
            fill="#EEEEEE"
            stroke="#757575"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pot rim */}
          <path
            d="M15,40 C15,30 25,25 50,25 C75,25 85,30 85,40"
            fill="none"
            stroke="#757575"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pot handles */}
          <path
            d="M15,50 C5,50 0,40 5,30 C10,20 20,25 20,30"
            fill="none"
            stroke="#757575"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M85,50 C95,50 100,40 95,30 C90,20 80,25 80,30"
            fill="none"
            stroke="#757575"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pot contents */}
          <path
            d="M25,60 C30,55 35,60 40,55 C45,60 50,55 55,60 C60,55 65,60 70,55 C75,60 80,55 85,60"
            fill="none"
            stroke="#EF6C00"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Steam */}
          <path
            d="M30,25 C30,20 25,15 30,10 C35,15 30,20 30,25"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50,20 C50,15 45,10 50,5 C55,10 50,15 50,20"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M70,25 C70,20 65,15 70,10 C75,15 70,20 70,25"
            fill="none"
            stroke="#BDBDBD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "plate":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Plate */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="#FFFFFF"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Food on plate */}
          <path
            d="M30,40 C35,50 45,50 50,40 C55,50 65,50 70,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="45" r="5" fill="#EF5350" />
          <circle cx="60" cy="45" r="5" fill="#66BB6A" />
        </svg>
      )
    case "carrot":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Carrot body */}
          <path
            d="M50,90 C40,90 30,70 30,50 C30,30 40,10 50,10 C60,10 70,30 70,50 C70,70 60,90 50,90 Z"
            fill="#FF9800"
            stroke="#E65100"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Carrot lines */}
          <path
            d="M40,30 C45,35 55,35 60,30"
            fill="none"
            stroke="#E65100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40,50 C45,55 55,55 60,50"
            fill="none"
            stroke="#E65100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40,70 C45,75 55,75 60,70"
            fill="none"
            stroke="#E65100"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Carrot top */}
          <path
            d="M30,10 C35,0 45,0 50,10 C55,0 65,0 70,10"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35,5 C40,0 45,5 45,10"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55,10 C55,5 60,0 65,5"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "tomato":
      return (
        <svg viewBox="0 0 100 100" className={className} style={style}>
          {/* Tomato body */}
          <circle
            cx="50"
            cy="60"
            r="30"
            fill="#F44336"
            stroke="#B71C1C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tomato stem */}
          <path
            d="M50,30 C45,20 50,10 60,15 C70,20 65,30 60,30"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tomato highlights */}
          <path
            d="M35,50 C40,55 45,55 50,50 C55,55 60,55 65,50"
            fill="none"
            stroke="#B71C1C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="40" cy="60" r="3" fill="#FFCDD2" />
          <circle cx="60" cy="60" r="3" fill="#FFCDD2" />
        </svg>
      )
    default:
      return null
  }
}
