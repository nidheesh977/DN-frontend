import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function TextEditor() {
    CKEditor.editorConfig = function( config ) {
        // Define changes to default configuration here.
        // For complete reference see:
        // http://docs.ckeditor.com/#!/api/CKEDITOR.config
   
        // The toolbar groups arrangement, optimized for two toolbar rows.
        config.toolbarGroups = [
            { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
            // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
            { name: 'editing',     groups: [ 'find', 'selection' ] },
            { name: 'links' },
            { name: 'insert' },
            { name: 'forms' },
            { name: 'tools' },
            { name: 'document',       groups: [ 'mode', 'document', 'doctools' ] },
            { name: 'others' },
            '/',
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
            { name: 'styles' },
            { name: 'colors' }
            // { name: 'about' }
        ];
   
        // Remove some buttons provided by the standard plugins, which are
        // not needed in the Standard(s) toolbar.
        config.removeButtons = 'Underline,Subscript,Superscript';
   
        // Set the most common block elements.
        config.format_tags = 'p;h1;h2;h3;pre';
   
        // Simplify the dialog windows.
        config.removeDialogTabs = 'image:advanced;link:advanced';
    };
  return (
     <div className="App">
         
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                 
                />
            </div>
  )
}

export default TextEditor