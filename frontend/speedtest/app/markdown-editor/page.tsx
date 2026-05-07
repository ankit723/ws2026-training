'use client'

import { useEffect, useState } from "react"

export default function Page() {
  const [markdown, setMarkdown] = useState("")

  const parseMarkdown = (md: string) => {
    if (!md) return ""

    // 1. Escape HTML
    md = md.replace(/</g, "&lt;").replace(/>/g, "&gt;")

    // 2. Headings
    md = md.replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // 3. Horizontal rule
    md = md.replace(/^---$/gim, "<hr/>")

    // 4. Bold
    md = md.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")

    // 5. Images
    md = md.replace(/!\[(.*?)\]\((.*?)\)/gim, `<img alt="$1" src="$2" />`)

    // 6. Links
    md = md.replace(/\[(.*?)\]\((.*?)\)/gim, `<a href="$2" target="_blank">$1</a>`)

    // 7. Lists
    md = md.replace(/(?:^- .*(\n|$))+?/gim, (match) => {
      const items = match
        .trim()
        .split("\n")
        .map(item => `<li>${item.replace(/^- /, "")}</li>`)
        .join("")
      return `<ul>${items}</ul>`
    })

    // 8. Paragraphs
    md = md.replace(/\n{2,}/g, "</p><p>")
    md = `<p>${md}</p>`

    return md
  }

  return (
    <div className="flex h-screen">

      {/* LEFT: EDITOR */}
      <textarea
        className="w-1/2 p-4 border-r outline-none resize-none"
        placeholder="Type Markdown..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      {/* RIGHT: PREVIEW */}
      <div
        className="w-1/2 p-4 overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
      />

    </div>
  )
}