import './style.css'
import 'remixicon/fonts/remixicon.css'

import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/core'
import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu'

// MenuBarのボタンで利用しているアイコンの定義
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

// https://tiptap.dev/examples/collaborative-editingのMenuBarの部分から
const itemsdef = (editor) => [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => editor.chain().focus().toggleStrike().run(),
    isActive: () => editor.isActive('strike'),
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => editor.chain().focus().toggleCode().run(),
    isActive: () => editor.isActive('code'),
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => editor.chain().focus().toggleHighlight().run(),
    isActive: () => editor.isActive('highlight'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.isActive('heading', { level: 1 }),
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.isActive('heading', { level: 2 }),
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => editor.chain().focus().setParagraph().run(),
    isActive: () => editor.isActive('paragraph'),
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: () => editor.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.isActive('orderedList'),
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => editor.chain().focus().toggleTaskList().run(),
    isActive: () => editor.isActive('taskList'),
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.isActive('codeBlock'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => editor.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => editor.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => editor.chain().focus().clearNodes().unsetAllMarks()
      .run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => editor.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => editor.chain().focus().redo().run(),
  },
]

document.querySelector('#app').innerHTML = `
  <div id="editor"></div>
`

const element = document.querySelector('#editor');

const editor = new Editor({
  element,
  extensions: [
    StarterKit,
  ],
  content: `Select some text!!`
})

const items = itemsdef(editor)

// メニューボタン用テンプレート適用
const staticMenuMarkup = items.map(({
  icon, title, action, isActive = null
}) => `
<button
class="menu-item${isActive && isActive() ? ' is-active' : ''}"
title=${title}
>
<svg class="remix">
  <use xlink:href="${remixiconUrl}#ri-${icon}" />
</svg>
</button>
`).join('')

element.insertAdjacentHTML('beforebegin', staticMenuMarkup);

// event listener
[...document.querySelectorAll(".menu-item")].forEach(
  (btn, index) => {
    items[index].action && btn.addEventListener("click", items[index].action);
  });

// bubble menuのpluginを追加する場合
const bubbleMenuMarkup = `
<div class="bubble-menu">
    <button onclick="alert('bold')">bold</button>
    <button onclick="alert('italic')">italic</button>
    <button onclick="alert('strike')">strike</button>
</div>
`
element.insertAdjacentHTML('afterend', bubbleMenuMarkup);
const bubbleMenuElement = document.querySelector('.bubble-menu');
const plugin = BubbleMenuPlugin({element: bubbleMenuElement, editor});
editor.registerPlugin(plugin);