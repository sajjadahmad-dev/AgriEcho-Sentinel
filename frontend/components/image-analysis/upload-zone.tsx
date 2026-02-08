'use client'

import React from "react"

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  selectedFile?: File | null
}

export function UploadZone({ onFileSelect, selectedFile }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file)
    }
  }

  const handleFileSelect = (file: File) => {
    onFileSelect(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  if (preview) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative bg-muted rounded-lg overflow-hidden">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {selectedFile?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile?.size || 0) / 1024 / 1024 < 1
                  ? `${((selectedFile?.size || 0) / 1024).toFixed(2)} KB`
                  : `${((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPreview(null)
                  onFileSelect(null as any)
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-border/50 hover:border-primary/50'
          }`}
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Drag and drop your image here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click the button below to browse
          </p>
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />
            <Button variant="default" size="sm" asChild className="cursor-pointer">
              <span>Select File</span>
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-4">
            PNG, JPG, WebP up to 10MB
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
