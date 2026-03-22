<template>
    <div class="wysiwyg-editor">
        <!-- Toolbar -->
        <div v-if="editor" class="toolbar">
            <!-- Text Style -->
            <div class="toolbar-group">
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ active: editor.isActive('heading', { level: 2 }) }" title="Heading 2">
                    H2
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ active: editor.isActive('heading', { level: 3 }) }" title="Heading 3">
                    H3
                </button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()"
                    :class="{ active: editor.isActive('paragraph') }" title="Paragraph">
                    P
                </button>
            </div>

            <div class="toolbar-divider"></div>

            <!-- Format -->
            <div class="toolbar-group">
                <button type="button" @click="editor.chain().focus().toggleBold().run()"
                    :class="{ active: editor.isActive('bold') }" title="Bold">
                    <strong>B</strong>
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ active: editor.isActive('italic') }" title="Italic">
                    <em>I</em>
                </button>
                <button type="button" @click="editor.chain().focus().toggleUnderline().run()"
                    :class="{ active: editor.isActive('underline') }" title="Underline">
                    <span style="text-decoration: underline">U</span>
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ active: editor.isActive('strike') }" title="Strikethrough">
                    <span style="text-decoration: line-through">S</span>
                </button>
            </div>

            <div class="toolbar-divider"></div>

            <!-- Lists -->
            <div class="toolbar-group">
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ active: editor.isActive('bulletList') }" title="Bullet List">
                    •
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                    :class="{ active: editor.isActive('orderedList') }" title="Ordered List">
                    1.
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ active: editor.isActive('blockquote') }" title="Blockquote">
                    "
                </button>
                <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class="{ active: editor.isActive('codeBlock') }" title="Code Block">
                    &lt;/&gt;
                </button>
            </div>

            <div class="toolbar-divider"></div>

            <!-- Align -->
            <div class="toolbar-group">
                <button type="button" @click="editor.chain().focus().setTextAlign('left').run()"
                    :class="{ active: editor.isActive({ textAlign: 'left' }) }" title="Align Left">
                    ≡
                </button>
                <button type="button" @click="editor.chain().focus().setTextAlign('center').run()"
                    :class="{ active: editor.isActive({ textAlign: 'center' }) }" title="Align Center">
                    ≡
                </button>
                <button type="button" @click="editor.chain().focus().setTextAlign('right').run()"
                    :class="{ active: editor.isActive({ textAlign: 'right' }) }" title="Align Right">
                    ≡
                </button>
            </div>

            <div class="toolbar-divider"></div>

            <!-- Insert -->
            <div class="toolbar-group">
                <button type="button" @click="addLink" title="Insert Link">
                    🔗
                </button>
                <button type="button" @click="triggerImageUpload" title="Insert Image">
                    🖼️
                </button>
            </div>

            <div class="toolbar-divider"></div>

            <!-- Undo/Redo -->
            <div class="toolbar-group">
                <button type="button" @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().undo()" title="Undo">
                    ↩
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().redo()" title="Redo">
                    ↪
                </button>
            </div>
        </div>

        <!-- Editor Content -->
        <editor-content :editor="editor" class="editor-content" />

        <!-- Hidden file input for image uploads -->
        <input type="file" ref="imageInput" class="hidden" accept="image/*" @change="handleImageUpload" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import api from '../services/api'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const imageInput = ref<HTMLInputElement | null>(null)

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit.configure({
            heading: { levels: [2, 3, 4] },
        }),
        Image.configure({
            HTMLAttributes: {
                class: 'editor-image',
            },
        }),
        Link.configure({
            openOnClick: false,
            HTMLAttributes: {
                class: 'editor-link',
            },
        }),
        Placeholder.configure({
            placeholder: 'Start writing your blog post...',
        }),
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

// Watch for external content changes (e.g. when loading a blog post for editing)
watch(() => props.modelValue, (newVal) => {
    if (editor.value && editor.value.getHTML() !== newVal) {
        editor.value.commands.setContent(newVal)
    }
})

const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url && editor.value) {
        editor.value.chain().focus().setLink({ href: url }).run()
    }
}

const triggerImageUpload = () => {
    imageInput.value?.click()
}

const handleImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files?.length || !editor.value) return

    const file = target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    try {
        const res = await api.post('/media/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        let imageUrl = res.data.fileUrl
        if (!imageUrl.startsWith('http')) {
            let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
            baseUrl = baseUrl.replace(/\/+$/, '')
            const safePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
            imageUrl = `${baseUrl}${safePath}`
        }

        editor.value.chain().focus().setImage({ src: imageUrl }).run()
    } catch (error) {
        console.error('Image upload failed:', error)
        alert('Failed to upload image')
    }

    // Reset input
    target.value = ''
}

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>

<style scoped>
.wysiwyg-editor {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    overflow: hidden;
    background: #0B0D10;
}

/* Toolbar */
.toolbar {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 8px 12px;
    background: #11141A;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap;
}

.toolbar-group {
    display: flex;
    align-items: center;
    gap: 2px;
}

.toolbar-divider {
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 6px;
}

.toolbar button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #9AA0AA;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;
}

.toolbar button:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #EDEDED;
}

.toolbar button.active {
    background: rgba(106, 227, 255, 0.15);
    color: #6AE3FF;
}

.toolbar button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

/* Editor Content */
.editor-content {
    min-height: 350px;
    max-height: 600px;
    overflow-y: auto;
}

.editor-content :deep(.tiptap) {
    padding: 16px 20px;
    min-height: 350px;
    color: #EDEDED;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    outline: none;
}

.editor-content :deep(.tiptap p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: rgba(255, 255, 255, 0.2);
    pointer-events: none;
    height: 0;
}

/* Headings */
.editor-content :deep(.tiptap h2) {
    font-family: 'Sora', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #EDEDED;
    margin: 1.5rem 0 0.75rem;
    line-height: 1.3;
}

.editor-content :deep(.tiptap h3) {
    font-family: 'Sora', sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    color: #EDEDED;
    margin: 1.25rem 0 0.5rem;
    line-height: 1.4;
}

/* Paragraphs */
.editor-content :deep(.tiptap p) {
    margin: 0.75rem 0;
}

/* Links */
.editor-content :deep(.tiptap a),
.editor-content :deep(.editor-link) {
    color: #6AE3FF;
    text-decoration: underline;
    cursor: pointer;
}

/* Images */
.editor-content :deep(.editor-image) {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Lists */
.editor-content :deep(.tiptap ul) {
    list-style: disc;
    padding-left: 1.5rem;
    margin: 0.75rem 0;
}

.editor-content :deep(.tiptap ol) {
    list-style: decimal;
    padding-left: 1.5rem;
    margin: 0.75rem 0;
}

.editor-content :deep(.tiptap li) {
    margin: 0.25rem 0;
}

/* Blockquote */
.editor-content :deep(.tiptap blockquote) {
    border-left: 3px solid #6AE3FF;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #9AA0AA;
    font-style: italic;
}

/* Code Block */
.editor-content :deep(.tiptap pre) {
    background: #11141A;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
}

.editor-content :deep(.tiptap pre code) {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px;
    color: #6AE3FF;
    background: none;
}

/* Inline Code */
.editor-content :deep(.tiptap code) {
    background: rgba(106, 227, 255, 0.1);
    color: #6AE3FF;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
}

/* Horizontal Rule */
.editor-content :deep(.tiptap hr) {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin: 1.5rem 0;
}

/* Scrollbar */
.editor-content::-webkit-scrollbar {
    width: 6px;
}

.editor-content::-webkit-scrollbar-track {
    background: transparent;
}

.editor-content::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
}
</style>
