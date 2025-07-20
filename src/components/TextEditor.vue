<template>
  <div v-if="editor" class="tiptap">
    <div class="flex flex-wrap gap-2">
      <n-button
        size="small"
        :type="editor.isActive('bold') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleBold().run()"
      >
        Bold
      </n-button>
      <n-button
        size="small"
        :type="editor.isActive('italic') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        Italic
      </n-button>
      <n-button
        size="small"
        :type="editor.isActive('strike') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        Strike
      </n-button>
      <n-button
        size="small"
        :type="editor.isActive('code') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleCode().run()"
      >
        Code
      </n-button>
      <n-button size="small" @click="editor.chain().focus().unsetAllMarks().run()">
        Clear Marks
      </n-button>
      <n-button size="small" @click="editor.chain().focus().clearNodes().run()">
        Clear Nodes
      </n-button>
      <n-button size="small" @click="editor.chain().focus().setParagraph().run()">
        Paragraph
      </n-button>
      <n-button
        v-for="level in headingLevels"
        :key="level"
        @click="editor.chain().focus().toggleHeading({ level }).run()"
        :type="editor.isActive('heading', { level }) ? 'primary' : 'default'"
      >
        H{{ level }}
      </n-button>

      <n-button
        size="small"
        :type="editor.isActive('bulletList') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        Bullet List
      </n-button>

      <n-button
        size="small"
        :type="editor.isActive('orderedList') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        Ordered List
      </n-button>

      <n-button
        size="small"
        :type="editor.isActive('codeBlock') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        Code Block
      </n-button>

      <n-button
        size="small"
        :type="editor.isActive('blockquote') ? 'primary' : 'default'"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        Blockquote
      </n-button>

      <n-button
        size="small"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        Horizontal Rule
      </n-button>

      <n-button
        size="small"
        @click="editor.chain().focus().setHardBreak().run()"
      >
        Hard Break
      </n-button>

      <n-button
        size="small"
        :disabled="!editor.can().chain().focus().undo().run()"
        @click="editor.chain().focus().undo().run()"
      >
        Undo
      </n-button>

      <n-button
        size="small"
        :disabled="!editor.can().chain().focus().redo().run()"
        @click="editor.chain().focus().redo().run()"
      >
        Redo
      </n-button>

      <n-button
        size="small"
        :type="editor.isActive('textStyle', { color: '#958DF1' }) ? 'primary' : 'default'"
        @click="editor.chain().focus().setColor('#958DF1').run()"
      >
        Purple
      </n-button>
    </div>

    <EditorContent
      :editor="editor"
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import { watch } from 'vue'

// Accept v-model binding
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const headingLevels = [1, 2, 3, 4, 5, 6] as const

// Initialize the editor
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    TextStyle.configure({ types: [ListItem.name] }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
  ],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
})

// Watch for changes to modelValue and update the editor content
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue, false)
    }
  }
)
</script>


<style>
.tiptap {
  margin-top: 1rem;
}

div[contenteditable="true"] {
  min-height: 500px;
  width: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #d1d5db; /* Tailwind gray-300 */
  border-radius: 0.375rem;
  background: white;
}


.tiptap ul,
.tiptap ol {
  padding-left: 1.25rem;
}

.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.tiptap pre {
  background: #333;
  color: #fff;
  border-radius: 0.4rem;
  padding: 0.75rem 1rem;
  overflow-x: auto;
}

.tiptap code {
  background: #eee;
  border-radius: 0.25rem;
  padding: 0.2em 0.4em;
}
</style>
