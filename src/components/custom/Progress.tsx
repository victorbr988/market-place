"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"


interface IProgressBar {
  currentProgress: number,
  maxProgress: number,
  className?: string
}
export function ProgressBar({ currentProgress, maxProgress, className }: IProgressBar) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(currentProgress)
  }, [currentProgress])

  return <Progress value={progress} className={cn("h-1", [className])} />
}
