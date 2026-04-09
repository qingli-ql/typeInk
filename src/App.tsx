import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')

  const handleClear = () => {
    setText('')
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([text], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'typeink-document.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">typeInk</h1>
        <p className="app-tagline">Your thoughts, beautifully written</p>
      </header>

      <main className="app-main">
        <div className="editor-container">
          <div className="editor-header">
            <span className="word-count">Words: {text.split(/\s+/).filter(word => word.length > 0).length}</span>
            <span className="char-count">Characters: {text.length}</span>
          </div>
          <textarea
            className="editor-textarea"
            placeholder="Start typing your thoughts here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck="true"
          />
          <div className="editor-actions">
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 typeInk. Write with purpose.</p>
      </footer>
    </div>
  )
}

export default App
