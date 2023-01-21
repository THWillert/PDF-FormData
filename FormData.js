// :autoIndent=full:collapseFolds=0:deepIndent=false:folding=indent:indentSize=4:maxLineLen=80:mode=javascript:noTabs=false:noWordSep=_:tabSize=4:wordBreakChars=,+-\=<>/?^&*:wrap=none:// :autoIndent=full:collapseFolds=0:deepIndent=false:folding=indent:indentSize=4:maxLineLen=80:mode=javascript:noTabs=false:noWordSep=_:tabSize=4:wordBreakChars=,+-\=<>/?^&*:wrap=none:
// windows-1252
/*
 Form_Data

 V2.0.0, 06/06/2022
 + Option to save empty fields
 + Clears console before output
 + Reset form

 V1.0.0, 04/06/2022
 - First version

 Installation:
 Acrobat Reader DC (Windows): %appdata%\Roaming\Adobe\Acrobat\Privileged\DC\JavaScripts

 JavaScript for Acrobat API Reference:
 https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/pdfs/acrobatsdk_jsapiref.pdf
*/

// Menue =======================================================================
// cName   = Interner Name des Untermenüs
// cUser   = Sichtbare Beschriftung
// cParent = Übergeordnetes Menü
// nPos    = Position im Menü
app.addSubMenu({
    cName: 'FormData',
    cUser: 'Form-Data',
    cParent: 'File',
    nPos: 21
})

app.addMenuItem({
    cName: 'Export as XFDF ...',
    cParent: 'FormData',
    cExec: 'exportXFDF(true)'
})
app.addMenuItem({
    cName: 'Export as XFDF (no empty fields) ...',
    cParent: 'FormData',
    cExec: 'exportXFDF(false)'
})
app.addMenuItem({
    cName: 'Export as FDF ...',
    cParent: 'FormData',
    cExec: 'exportFDF(true)'
})
app.addMenuItem({
    cName: 'Export as FDF (no empty fields) ...',
    cParent: 'FormData',
    cExec: 'exportFDF(false)'
})
app.addMenuItem({
    cName: '_______________________________________________________',
    cParent: 'FormData',
    cExec: '{}'
})
app.addMenuItem({
    cName: 'Import XFDF ...',
    cParent: 'FormData',
    cExec: 'importXFDF()'
})
app.addMenuItem({
    cName: 'Import FDF ...',
    cParent: 'FormData',
    cExec: 'importFDF()'
})
app.addMenuItem({
    cName: '_______________________________________________________',
    cParent: 'FormData',
    cExec: '{}'
})
app.addMenuItem({
    cName: 'Reset Form',
    cParent: 'FormData',
    cExec: 'this.resetForm()'
})

function exportFDF(empty) {
	try {
		consoleOut( this.exportAsFDFStr(empty, true, null, true) );
	} catch (e) {};
}

function exportXFDF(empty) {
	try {
		consoleOut( this.exportAsXFDFStr(empty, true, null, true) );
	} catch (e) {};
}

function importXFDF() {
	this.importAnXFDF();
}
function importFDF() {
	this.importAnFDF();
}

function consoleOut(s) {
	console.show();
	console.clear();
	console.println(s);
}
