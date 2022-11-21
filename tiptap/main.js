import './style.css'

import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/core'
import BubbleMenu from '@tiptap/extension-bubble-menu'

document.querySelector('#app').innerHTML = `
  <div class="menu">
    <button onclick="alert('bold')">bold</button>
    <button onclick="alert('italic')">italic</button>
    <button onclick="alert('strike')">strike</button>
  </div>
  <div id="editor"></div>
`
new Editor({
  element: document.querySelector('#editor'),
  extensions: [
    BubbleMenu.configure({
      element: document.querySelector('.menu'),
    }),
    StarterKit,
  ],
  content: `Select some text!!`
})