'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NewContentPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('draft')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ title, content, status })
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6 border border-[#FDDF23]">
        <div>
          <Label htmlFor="title" className="text-black">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-white border-[#FDDF23] text-black"
          />
        </div>
        <div>
          <Label htmlFor="content" className="text-black">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="bg-white border-[#FDDF23] text-black"
          />
        </div>
        <div>
          <Label htmlFor="status" className="text-black">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-white border-[#FDDF23] text-black">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="bg-[#FDDF23] text-black hover:bg-[#FDDF23]/80">
          Create Content
        </Button>
      </form>
    </Layout>
  )
}

