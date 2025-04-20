"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 在文件顶部的import部分添加Link组件
import Link from "next/link"

export default function FoodRecommender() {
  const [diners, setDiners] = useState(1)
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner">("lunch")

  return (
    <div className="flex min-h-screen flex-col items-center bg-amber-50 px-4 py-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-200 opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-orange-200 opacity-40"></div>
        <div className="absolute top-1/3 right-5 w-12 h-12 rounded-full bg-red-200 opacity-30"></div>
        <div className="absolute bottom-40 left-5 w-20 h-20 rounded-full bg-yellow-100 opacity-50"></div>
      </div>

      {/* App Header */}
      <div className="mb-6 flex flex-col items-center relative z-10">
        <div className="relative">
          <h1
            className="text-center font-bold text-3xl text-orange-700 drop-shadow-md"
            style={{
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              textShadow: "2px 2px 0px rgba(255, 166, 0, 0.3)",
            }}
          >
            今天吃什么
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
          美食推荐小助手
        </p>
      </div>

      {/* Main Content */}
      <div
        className="w-full max-w-sm rounded-3xl border-4 border-orange-300 bg-white p-5 shadow-lg relative z-10"
        style={{
          borderStyle: "solid",
          borderRadius: "24px",
          boxShadow: "4px 8px 0px rgba(234, 88, 12, 0.2)",
        }}
      >
        {/* Diners Selection */}
        <div className="mb-6">
          <h2
            className="mb-3 text-center text-lg font-bold text-orange-700"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            用餐人数
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                variant="outline"
                className={cn(
                  "flex flex-col items-center justify-between h-20 rounded-xl border-2 p-1 relative hover:scale-105 transition-transform",
                  diners === num
                    ? "bg-orange-100 text-orange-700 border-orange-400"
                    : "bg-white text-orange-500 border-orange-300 hover:bg-orange-50",
                )}
                style={{
                  boxShadow:
                    diners === num ? "2px 4px 0px rgba(234, 88, 12, 0.2)" : "1px 2px 0px rgba(234, 88, 12, 0.1)",
                }}
                onClick={() => setDiners(num)}
              >
                <div className="flex items-center justify-center w-full h-14 mt-0 p-0">
                  <DinerIcon number={num} />
                </div>
                <span className="text-sm font-medium">{num}人</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Meal Type Selection */}
        <div className="mb-6">
          <h2
            className="mb-3 text-center text-lg font-bold text-orange-700"
            style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
          >
            用餐时间
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: "breakfast", label: "早餐" },
              { type: "lunch", label: "午餐" },
              { type: "dinner", label: "晚餐" },
            ].map((meal) => (
              <Button
                key={meal.type}
                variant="outline"
                className={cn(
                  "flex flex-col items-center justify-between h-28 rounded-2xl border-2 p-1 relative hover:scale-105 transition-transform",
                  mealType === meal.type
                    ? "bg-orange-100 text-orange-700 border-orange-400"
                    : "bg-white text-orange-500 border-orange-300 hover:bg-orange-50",
                )}
                style={{
                  boxShadow:
                    mealType === meal.type
                      ? "3px 6px 0px rgba(234, 88, 12, 0.2)"
                      : "2px 3px 0px rgba(234, 88, 12, 0.1)",
                }}
                onClick={() => setMealType(meal.type as "breakfast" | "lunch" | "dinner")}
              >
                <div className="flex items-center justify-center w-full h-[90px] p-0">
                  <CartoonFoodIcon type={meal.type as "breakfast" | "lunch" | "dinner"} className="h-full w-full" />
                </div>
                <span className="text-sm font-medium">{meal.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="relative mt-4">
          <Link href={`/results?diners=${diners}&mealType=${mealType}`} className="w-full">
            <Button
              className="relative w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl transform -rotate-2"
              style={{
                fontFamily: "'Comic Sans MS', cursive, sans-serif",
                boxShadow: "3px 6px 0px rgba(194, 65, 12, 0.4)",
              }}
            >
              <span className="relative z-10">开始烹饪</span>
            </Button>
          </Link>
          <div className="absolute -right-2 -top-3 rotate-12 z-20">
            <CartoonFoodIcon type="chef" className="h-10 w-10 text-yellow-200" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
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
    </div>
  )
}

// Diner Icon Component - Shows different icons based on number of diners
function DinerIcon({ number }: { number: number }) {
  switch (number) {
    case 1:
      return (
        <svg viewBox="0 0 50 40" className="h-full w-full">
          <g transform="translate(10, 0) scale(1.2)">
            {/* Single person - centered */}
            <circle cx="12" cy="10" r="8" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="9" cy="8" r="1.5" fill="#5D4037" />
            <circle cx="15" cy="8" r="1.5" fill="#5D4037" />
            <path d="M9,12 C10,14 14,14 15,12" fill="none" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />

            {/* Body */}
            <path
              d="M2,25 C2,18 6,16 12,16 C18,16 22,18 22,25 L22,35 C22,38 20,40 12,40 C4,40 2,38 2,35 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Arms */}
            <path
              d="M2,25 C0,23 0,20 2,18"
              fill="none"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M22,25 C24,23 24,20 22,18"
              fill="none"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Details */}
            <path
              d="M8,24 L16,24"
              fill="none"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M8,28 L16,28"
              fill="none"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )
    case 2:
      return (
        <svg viewBox="0 0 50 40" className="h-full w-full">
          <g transform="translate(0, 0) scale(1.2)">
            {/* First person */}
            <circle cx="12" cy="10" r="6" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="10" cy="8" r="1" fill="#5D4037" />
            <circle cx="14" cy="8" r="1" fill="#5D4037" />
            <path
              d="M10,11 C10.5,12 13.5,12 14,11"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* First body */}
            <path
              d="M6,22 C6,17 8,16 12,16 C16,16 18,17 18,22 L18,30 C18,32 17,33 12,33 C7,33 6,32 6,30 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Second person */}
            <circle cx="38" cy="10" r="6" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="36" cy="8" r="1" fill="#5D4037" />
            <circle cx="40" cy="8" r="1" fill="#5D4037" />
            <path
              d="M36,11 C36.5,12 39.5,12 40,11"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Second body */}
            <path
              d="M32,22 C32,17 34,16 38,16 C42,16 44,17 44,22 L44,30 C44,32 43,33 38,33 C33,33 32,32 32,30 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )
    case 3:
      return (
        <svg viewBox="0 0 50 40" className="h-full w-full">
          <g transform="translate(0, 0) scale(1.2)">
            {/* First person */}
            <circle cx="10" cy="10" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="8" cy="8" r="1" fill="#5D4037" />
            <circle cx="12" cy="8" r="1" fill="#5D4037" />
            <path d="M8,11 C8.5,12 11.5,12 12,11" fill="none" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />

            {/* First body */}
            <path
              d="M5,22 C5,17 7,16 10,16 C13,16 15,17 15,22 L15,28 C15,30 14,31 10,31 C6,31 5,30 5,28 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Second person */}
            <circle cx="25" cy="10" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="23" cy="8" r="1" fill="#5D4037" />
            <circle cx="27" cy="8" r="1" fill="#5D4037" />
            <path
              d="M23,11 C23.5,12 26.5,12 27,11"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Second body */}
            <path
              d="M20,22 C20,17 22,16 25,16 C28,16 30,17 30,22 L30,28 C30,30 29,31 25,31 C21,31 20,30 20,28 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Third person */}
            <circle cx="40" cy="10" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="38" cy="8" r="1" fill="#5D4037" />
            <circle cx="42" cy="8" r="1" fill="#5D4037" />
            <path
              d="M38,11 C38.5,12 41.5,12 42,11"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Third body */}
            <path
              d="M35,22 C35,17 37,16 40,16 C43,16 45,17 45,22 L45,28 C45,30 44,31 40,31 C36,31 35,30 35,28 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )
    case 4:
      return (
        <svg viewBox="0 0 50 40" className="h-full w-full">
          <g transform="translate(0, 0) scale(1.2)">
            {/* First row - two people */}
            {/* Person 1 */}
            <circle cx="12" cy="8" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="10" cy="6" r="1" fill="#5D4037" />
            <circle cx="14" cy="6" r="1" fill="#5D4037" />
            <path d="M10,9 C10.5,10 13.5,10 14,9" fill="none" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />

            <path
              d="M7,20 C7,15 9,14 12,14 C15,14 17,15 17,20 L17,26 C17,28 16,29 12,29 C8,29 7,28 7,26 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Person 2 */}
            <circle cx="38" cy="8" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="36" cy="6" r="1" fill="#5D4037" />
            <circle cx="40" cy="6" r="1" fill="#5D4037" />
            <path d="M36,9 C36.5,10 39.5,10 40,9" fill="none" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />

            <path
              d="M33,20 C33,15 35,14 38,14 C41,14 43,15 43,20 L43,26 C43,28 42,29 38,29 C34,29 33,28 33,26 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Second row - two people */}
            {/* Person 3 */}
            <circle cx="12" cy="33" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="10" cy="31" r="1" fill="#5D4037" />
            <circle cx="14" cy="31" r="1" fill="#5D4037" />
            <path
              d="M10,34 C10.5,35 13.5,35 14,34"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
              strokeLinecap="round"
            />

            <path
              d="M7,45 C7,40 9,39 12,39 C15,39 17,40 17,45 L17,51 C17,53 16,54 12,54 C8,54 7,53 7,51 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Person 4 */}
            <circle cx="38" cy="33" r="5" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="36" cy="31" r="1" fill="#5D4037" />
            <circle cx="40" cy="31" r="1" fill="#5D4037" />
            <path
              d="M36,34 C36.5,35 39.5,35 40,34"
              fill="none"
              stroke="#5D4037"
              strokeWidth="1"
              strokeLinecap="round"
            />

            <path
              d="M33,45 C33,40 35,39 38,39 C41,39 43,40 43,45 L43,51 C43,53 42,54 38,54 C34,54 33,53 33,51 Z"
              fill="#FF9800"
              stroke="#E65100"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )
    default:
      return null
  }
}

// Cartoon Food Icons Components
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
            d="M30,60 C35,55 40,60 45,55"
            fill="none"
            stroke="#D32F2F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M55,60 C60,55 65,60 70,55"
            fill="none"
            stroke="#388E3C"
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
