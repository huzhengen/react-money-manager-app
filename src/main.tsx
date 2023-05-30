import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

const div = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(div)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  const hasAlerted = localStorage.getItem('hasAlerted')
  if (hasAlerted !== 'yes') {
    window.alert('建议使用手机浏览本应用')
    localStorage.setItem('hasAlerted', 'yes')
  }
}

export { div as rootDiv }
