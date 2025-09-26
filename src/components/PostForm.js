import React, { useState } from 'react';
import { Form, Button, Input, TextArea, Select } from 'semantic-ui-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

// New imports for CodeMirror + Markdown
import { Controlled as ControlledEditor } from "react-codemirror2";
import ReactMarkdown from "react-markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"; // add more modes if needed

const postOptions = [
  { key: 'question', text: 'Question', value: 'Question' },
  { key: 'article', text: 'Article', value: 'Article' },
];

const PostForm = () => {
  const [postType, setPostType] = useState('Question');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  // NEW fields
  const [markdown, setMarkdown] = useState("# Write your post here...");
  const [code, setCode] = useState("// Write your code here");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }
    await addDoc(collection(db, 'posts'), {
      postType,
      title,
      abstract,
      article,
      markdown,   // save markdown content
      code,       // save code editor content
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl,
      date: new Date(),
    });
    // Clear form
    setTitle(''); 
    setAbstract(''); 
    setArticle(''); 
    setTags(''); 
    setImage(null);
    setMarkdown("# Write your post here...");
    setCode("// Write your code here");
    alert('Post saved!');
  };

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <Form.Field>
        <label>Select Post Type</label>
        <Select options={postOptions} value={postType} onChange={(e, { value }) => setPostType(value)} />
      </Form.Field>
      <Form.Field>
        <label>Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Add an Image</label>
        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </Form.Field>
      <Form.Field>
        <label>Abstract</label>
        <TextArea value={abstract} onChange={(e) => setAbstract(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Article Text</label>
        <TextArea value={article} onChange={(e) => setArticle(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Tags (comma-separated)</label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} />
      </Form.Field>

      {/* NEW: Code editor */}
      <Form.Field>
        <label>Code Editor (CodeMirror)</label>
        <ControlledEditor
          value={code}
          options={{ lineNumbers: true, mode: "javascript", theme: "material" }}
          onBeforeChange={(editor, data, value) => setCode(value)}
        />
      </Form.Field>

      {/* NEW: Markdown editor */}
      <Form.Field>
        <label>Markdown Editor</label>
        <TextArea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          style={{ minHeight: 120 }}
        />
      </Form.Field>

      {/* Live preview */}
      <Form.Field>
        <label>Markdown Preview</label>
        <div style={{ border: "1px solid #ddd", padding: 10, borderRadius: 6 }}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </Form.Field>

      <Button type="submit">Post</Button>
    </Form>
  );
};

export default PostForm;
