"use client";
import { useState } from "react";
import { colors } from "../../../components/style/theme";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

// Custom CSS for Tiptap editor
const editorStyles = `
  .tiptap.ProseMirror {
    background-color: #374151;
    color: #fff;
    padding: 0.5rem;
    border: 1px solid #4b5563;
    border-radius: 0.5rem;
    min-height: 150px;
    outline: none;
  }
  .tiptap.ProseMirror:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.5);
  }
  .tiptap p.is-empty::before {
    content: attr(data-placeholder);
    color: #9ca3af;
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

export default function AddPoetryModal({ isOpen, onClose, onSubmit, user }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    content: "",
  });

  const poetryTypes = [
    "Love",
    "Nature",
    "Sadness",
    "Inspiration",
    "Humor",
    "Spirituality",
    "Friendship",
    "Life",
    "Romance",
    "Fantasy",
  ];

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit, // Basic formatting: bold, italic, paragraphs, etc.
      Placeholder.configure({
        placeholder: "Write your poetry here...",
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    editable: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      poster: user?.name || "Anonymous",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  z-50 ">
      <div className="absolute z-10 inset-0 w-full h-full  bg-black opacity-[0.6]">

      </div>
      <div className="absolute z-20  inset-0 w-full h-full flex items-center justify-center p-4">

      <div className="bg-gray-800 rounded-xl max-w-2xl w-full  overflow-y-auto scollbar-hidden text-gray-300">
        <style>{editorStyles}</style>
        <div
          className="p-1"
         
        ></div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Share Your Poetry</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Poetry Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Title of your poetry"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Poetry Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a type</option>
                {poetryTypes?.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Poetry
              </label>
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`px-2 py-1 mr-2 text-sm rounded ${
                    editor?.isActive("bold")
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  Bold
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`px-2 py-1 mr-2 text-sm rounded ${
                    editor?.isActive("italic")
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  Italic
                </button>
                <button
                  type="button"
                  onClick={() =>
                    editor?.chain().focus().setTextAlign("center").run()
                  }
                  className={`px-2 py-1 text-sm rounded ${
                    editor?.isActive("textAlign", { align: "center" })
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  Center
                </button>
              </div>
              <EditorContent editor={editor} />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white rounded-lg"
                style={{
                  background: `linear-gradient(to right, ${colors.darkPurple}, ${colors.darkPink})`,
                }}
              >
                Post Poetry
              </button>
            </div>
          </form>
        </div>
      </div>
      
      </div>
    </div>
  );
}
