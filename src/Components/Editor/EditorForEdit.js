import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.css'; 
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';

export default function ArticleEditor({setArticle_body,article_body}) {

  const token=Cookies.get("token")

  const [content, setContent] = useState(article_body)
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (content) => {
    setContent(content);
    setArticle_body(content)
  };

  const handleImageUpload = (blobInfo, success, failure) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());
    api.post('/uploadTempImage', formData,{
      headers: {
          Authorization: `Bearer ${token}`,
      }
  })
      .then(response => {
        setLoading(false);
        success(response.data.data);
      })
      .catch(() => {
        setLoading(false);
        failure('Image upload failed');
      });
  };

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <Editor
        apiKey='48w8wog8uwleo8euhujpdg4xx4cc03mskhs2ssf876m3jl2t'
        value={content}
        onEditorChange={handleEditorChange}

        init={{
          directionality: 'rtl', 
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar: 'undo redo | blocks fontfamily fontsize forecolor backcolor | bold italic underline strikethrough | link image media table | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === 'image') {
              document.getElementById('uploadImageInput').click();
            }
          },
          setup: (editor) => {
            editor.on('change', () => {
              const content = editor.getContent();
              setContent(content);
            });

            editor.on('drop', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                const file = files[0];
                const blobInfo = {
                  blob: () => file,
                  filename: () => file.name
                };
                handleImageUpload(blobInfo, (url) => {
                  editor.insertContent(`<img src="${url}" alt="article-image" />`);
                }, (message) => {
                  console.error(message);
                });
              }
            });

            editor.on('dragover', (e) => {
              e.preventDefault();
              e.stopPropagation();
            });
          },
        }}

        
        initialValue={article_body}
      />

      <input
        type="file"
        id="uploadImageInput"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const blobInfo = {
              blob: () => file,
              filename: () => file.name
            };
            handleImageUpload(blobInfo, (url) => {
              window.tinyMCE.activeEditor.insertContent(`<img src="${url}" alt="article-image" />`);
            }, (message) => {
              console.error(message);
            });
          }
        }}
      />

      <div className="rtl">
        <h2>شكل المدونة:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
